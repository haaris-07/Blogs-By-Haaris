import matter from "gray-matter";
import { marked } from "marked";
import config from "../config.js";

const BASE = "https://api.github.com";
const { githubUser: OWNER, githubRepo: REPO, githubToken: TOKEN } = config;

function headers() {
  const h = { Accept: "application/vnd.github+json" };
  if (TOKEN) h["Authorization"] = `Bearer ${TOKEN}`;
  return h;
}

// Get all posts
export async function getAllPosts() {
  const res = await fetch(
    `${BASE}/repos/${OWNER}/${REPO}/contents/posts`,
    { headers: headers(), next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

  const files = await res.json();
  const mdFiles = files.filter((f) => f.name.endsWith(".md"));

  const posts = await Promise.all(mdFiles.map(fetchAndParse));

  return posts.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date) - new Date(a.date);
  });
}

// Single post
export async function getPostBySlug(slug) {
  const res = await fetch(
    `${BASE}/repos/${OWNER}/${REPO}/contents/posts/${slug}.md`,
    { headers: headers(), next: { revalidate: 60 } }
  );

  if (!res.ok) return null;

  const file = await res.json();
  return parseMarkdown(file.content, file.name, true);
}

// Slugs
export async function getAllSlugs() {
  const res = await fetch(
    `${BASE}/repos/${OWNER}/${REPO}/contents/posts`,
    { headers: headers(), next: { revalidate: 60 } }
  );

  if (!res.ok) return [];

  const files = await res.json();

  return files
    .filter((f) => f.name.endsWith(".md"))
    .map((f) => f.name.replace(".md", ""));
}

// Fix: fetch raw content from download_url
async function fetchAndParse(file) {
  const rawRes = await fetch(file.download_url);
  const raw = await rawRes.text();

  return parseMarkdown(
    Buffer.from(raw).toString("base64"),
    file.name,
    false,
    raw
  );
}

function parseMarkdown(base64Content, fileName, renderHtml = false, rawText = null) {
  const raw =
    rawText || Buffer.from(base64Content, "base64").toString("utf-8");

  const { data, content } = matter(raw);
  const slug = fileName.replace(".md", "");

  return {
    slug,
    title: data.title || slug,
    date: data.date
      ? new Date(data.date).toISOString()
      : new Date(0).toISOString(),
    excerpt:
      data.excerpt ||
      content.slice(0, 160).replace(/\n/g, " ") + "…",
    featured: data.featured === true,
    ...(renderHtml && { html: marked(content) }),
  };
}
