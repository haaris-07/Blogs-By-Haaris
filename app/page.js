import Link from "next/link";
import Header from "../components/Header.js";
import { getAllPosts } from "../lib/github.js";
import config from "../config.js";

export const revalidate = 60; // re-fetch every 60 seconds (ISR)

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function HomePage() {
  let posts = [];
  let error = null;

  try {
    posts = await getAllPosts();
  } catch (e) {
    error = e.message;
  }

  const featured = posts.find((p) => p.featured) || posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <Header />

      <main>
        <div className="container">

          {/* Hero tagline */}
          <div className="page-hero">
            <h2>{config.blogTitle}</h2>
            <p>{config.blogTagline}</p>
          </div>

          {/* Error state */}
          {error && (
            <div className="empty-state">
              <h3>Couldn't load posts</h3>
              <p>{error}</p>
              <p style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
                Check your <code>config.js</code> settings.
              </p>
            </div>
          )}

          {/* Featured post */}
          {featured && (
            <section>
              <p className="section-label">Featured</p>
              <Link href={`/posts/${featured.slug}`} className="featured-card" style={{ display: "block" }}>
                <span className="featured-badge">★ Featured</span>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <div className="post-meta">
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                </div>
                <span className="read-link">Read post →</span>
              </Link>
            </section>
          )}

          {/* All other posts */}
          {rest.length > 0 && (
            <section>
              <p className="section-label">All posts</p>
              <div className="posts-list">
                {rest.map((post) => (
                  <Link key={post.slug} href={`/posts/${post.slug}`} className="post-card">
                    <div className="post-card-inner">
                      <div className="post-date-col">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                      </div>
                      <div className="post-content-col">
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                      </div>
                      <span className="post-arrow">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* No posts at all */}
          {!error && posts.length === 0 && (
            <div className="empty-state">
              <h3>No posts yet</h3>
              <p>Add <code>.md</code> files to your <code>posts/</code> folder on GitHub.</p>
            </div>
          )}

        </div>
      </main>

      <footer className="site-footer">
        <div className="container">
          © {new Date().getFullYear()} {config.blogTitle}
        </div>
      </footer>
    </>
  );
}
