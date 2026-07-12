"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import type { Blog } from "@/types/types";
import BlogCard from "@/components/blogs/BlogCard";
import { useTranslations, useLocale } from "next-intl";
import { getLocalized } from "@/lib/utils";
import { BLOG_CATEGORY_ORDER, getBlogCategoryLabel } from "@/lib/blogCategories";

type Props = {
  initialBlogs: Blog[];
};

export default function BlogsClient({ initialBlogs }: Props) {
  const t = useTranslations('blogs.client');
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const present = new Set(initialBlogs.map((b) => b.category));
    const sorted = BLOG_CATEGORY_ORDER.filter((cat) => present.has(cat));
    const remaining = Array.from(present).filter(
      (cat) => !BLOG_CATEGORY_ORDER.includes(cat as any)
    );
    return ["All", ...sorted, ...remaining];
  }, [initialBlogs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return initialBlogs
      .filter((b) => (activeCategory === "All" ? true : b.category === activeCategory))
      .filter((b) => {
        if (!q) return true;
        const title = getLocalized(b, 'title', locale).toLowerCase();
        const summary = (getLocalized(b, 'summary', locale) ?? "").toLowerCase();
        return title.includes(q) || summary.includes(q);
      });
  }, [query, activeCategory, initialBlogs, locale]);

  const featuredBlog = filtered.find((b) => b.is_featured);
  const regularBlogs = filtered.filter((b) => b !== featuredBlog);

  const getCatDisplayName = (cat: string): string => {
    if (cat === "All") return t('all');
    return getBlogCategoryLabel(cat, locale);
  };

  // Empty database state
  if (initialBlogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-muted text-lg font-semibold">{t('empty')}</p>
        <p className="mt-2 text-sm text-faint">{t('emptyNote')}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row md:items-start gap-4 mb-10">
        <div className="flex items-center gap-3 bg-card border border-border rounded-full px-4 py-2 shadow-sm w-full md:max-w-md">
          <Search className="w-5 h-5 text-muted shrink-0" />
          <input
            aria-label={t('searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="bg-transparent outline-none placeholder:text-muted text-sm w-full"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs px-3 py-1 rounded-md bg-card text-muted hover:bg-card/70 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {t('clear')}
            </button>
          )}
        </div>

        {/* Mobile: native select */}
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          className="md:hidden w-full bg-card border border-border rounded-xl px-4 text-sm text-muted min-h-[44px] focus:outline-none focus:border-primary/50 transition-all"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {getCatDisplayName(cat)}
            </option>
          ))}
        </select>

        {/* Desktop: filter pills */}
        <nav className="hidden md:flex gap-2 flex-wrap py-1" aria-label="Blog categories">
          {categories.map((cat) => {
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 min-h-[40px] rounded-full text-sm font-medium transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                  active ? "text-on-primary" : "text-muted border-border hover:border-primary/50"
                }`}
                style={active ? { backgroundColor: "var(--color-primary)", borderColor: "transparent" } : {}}
              >
                {getCatDisplayName(cat)}
              </button>
            );
          })}
        </nav>
      </div>

      {/* SR-only result announcement */}
      <p role="status" aria-live="polite" className="sr-only">
        {t('resultAnnouncement', { count: filtered.length })}
      </p>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-3xl p-12 text-center">
          <p className="text-muted text-lg font-semibold">{t('noResults')}</p>
          <p className="mt-2 text-sm text-muted">{t('tryAgain')}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Featured hero card — floats to top */}
          <AnimatePresence mode="popLayout">
            {featuredBlog && (
              <motion.div layout key={`featured-${featuredBlog.slug}`}>
                <BlogCard blog={featuredBlog} featured />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Regular cards */}
          <motion.div layout className="flex flex-col gap-5">
            <AnimatePresence mode="popLayout">
              {regularBlogs.map((blog) => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </div>
  );
}
