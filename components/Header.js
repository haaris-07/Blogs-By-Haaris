"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import config from "../config.js";

export default function Header() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Read initial theme from <html> attribute (set by the inline script in layout)
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="site-title">
            {config.blogTitle}
          </Link>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}
