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

// ── Fetch list of all posts ──────────────────────────────────────────────────
export async function getAllPosts() {
  const res = await fetch(
    `${BASE}/repos/${OWNER}/${REPO}/contents/posts`,
    { headers: headers(), next: { revalidate: 60 } }   // revalidate every 60s
  );

  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

  const files = await res.json();

  // Only process .md files
  const mdFiles = files.filter((f) => f.name.endsWith(".md"));

  const posts = await Promise.all(mdFiles.map(fetchAndParse));

  // Sort: featured first (if multiple), then by date descending
  return posts.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date) - new Date(a.date);
  });
}

// ── Fetch a single post by slug ──────────────────────────────────────────────
export async function getPostBySlug(slug) {
  const res = await fetch(
    `${BASE}/repos/${OWNER}/${REPO}/contents/posts/${slug}.md`,
    { headers: headers(), next: { revalidate: 60 } }
  );

  if (!res.ok) return null;

  const file = await res.json();
  return fetchAndParse(file, true);
}

// ── Fetch all slugs (for generateStaticParams) ───────────────────────────────
export async function getAllSlugs() {
  const res = await fetch(
    `${BASE}/repos/${OWNER}/${REPO}/contents/posts`,
    { headers: headers(), next: { revalidate: 60 } }
  );
  if (!res.ok) return [];
  const files = await res.json();
  return files
    .filter((f) => f.name.endsWith(".md"))
    .map((f) => f.name.replace(/\.md$/, ""));
}

// ── Internal: decode base64, parse frontmatter ───────────────────────────────
async function fetchAndParse(file, renderHtml = false) {
  const raw = Buffer.from(file.content, "base64").toString("utf-8");
  const { data, content } = matter(raw);

  const slug = file.name.replace(/\.md$/, "");

  return {
    slug,
    title: data.title || slug,
    date: data.date ? new Date(data.date).toISOString() : new Date(0).toISOString(),
    excerpt: data.excerpt || content.slice(0, 160).replace(/\n/g, " ") + "…",
    featured: data.featured === true,
    ...(renderHtml && { html: marked(content) }),
  };
}
