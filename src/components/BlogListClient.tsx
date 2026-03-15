"use client";

import { useState } from "react";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";

const CATEGORY_COLORS: Record<string, string> = {
  "City Guide": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  "Weather Tips": "bg-blue-500/15 text-blue-400 border-blue-500/20",
  Seasonal: "bg-amber-500/15 text-amber-400 border-amber-500/20",
};

function CategoryBadge({ category }: { category: string }) {
  const colors = CATEGORY_COLORS[category] || "bg-white/10 text-white/60 border-white/10";
  return (
    <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${colors}`}>
      {category}
    </span>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogListClient({ posts }: { posts: BlogPostMeta[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = posts.filter((post) => {
    const matchesSearch =
      search.length === 0 ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === null || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ["City Guide", "Weather Tips", "Seasonal"];

  return (
    <div>
      {/* Search bar */}
      <div className="relative max-w-md mx-auto mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles..."
          className="w-full search-input rounded-xl px-4 py-3 pl-11 text-white placeholder-white/30 focus:outline-none text-sm font-medium"
        />
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Category filters */}
      <div className="flex justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeCategory === null
              ? "bg-white/12 text-white"
              : "bg-white/4 text-white/30 hover:text-white/50"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-white/12 text-white"
                : "bg-white/4 text-white/30 hover:text-white/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Post cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white/30 text-sm">No articles found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block card-interactive rounded-2xl overflow-hidden group"
            >
              <div className="aspect-[1200/630] overflow-hidden">
                <img
                  src={`/api/og/blog/${post.slug}`}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2">
                  <CategoryBadge category={post.category} />
                  <span className="text-[10px] text-white/25 font-semibold">
                    {post.readTime} min read
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-bold mb-1.5 leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs text-white/40 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <p className="text-[11px] text-white/20 mt-2 font-medium">
                  {formatDate(post.date)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
