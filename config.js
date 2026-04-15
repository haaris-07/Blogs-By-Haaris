// ─────────────────────────────────────────────
//  EDIT THIS FILE ONCE — that's it.
// ─────────────────────────────────────────────

const config = {
  // Your GitHub username
  githubUser: "haaris-07",

  // The repo where your posts/ folder lives
  githubRepo: "Blogs By Haaris",

  // (Optional) A GitHub Personal Access Token.
  // Without it you get 60 API calls/hr.
  // With it: 5,000/hr. Add to .env.local as GITHUB_TOKEN.
  githubToken: process.env.GITHUB_TOKEN || "",

  // Your blog's display name & tagline
  blogTitle: "My Blog",
  blogTagline: "Thoughts, ideas, and more.",
};

export default config;
