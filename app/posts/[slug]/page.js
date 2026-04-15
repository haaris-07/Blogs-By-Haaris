import Link from "next/link";
import Header from "../../../components/Header.js";
import { getPostBySlug, getAllSlugs } from "../../../lib/github.js";
import { notFound } from "next/navigation";

export const revalidate = 60;

// Pre-generate known slugs at build time
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Dynamic metadata per post
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <Header />

      <main>
        <div className="container">
          <article className="post-page">

            <Link href="/" className="back-link">
              ← Back to all posts
            </Link>

            <header className="post-header">
              <h1>{post.title}</h1>
              <div className="post-meta">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
            </header>

            <hr className="post-divider" />

            {/* Render markdown HTML */}
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

          </article>
        </div>
      </main>

      <footer className="site-footer">
        <div className="container">
          <Link href="/" className="back-link" style={{ justifyContent: "center" }}>
            ← Back to all posts
          </Link>
        </div>
      </footer>
    </>
  );
}
