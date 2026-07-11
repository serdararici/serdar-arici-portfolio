"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import type { Project } from "@/types/types";
import ProjectCard from "@/components/projects/ProjectCard";
import { useTranslations, useLocale } from "next-intl";
import { getLocalized } from "@/lib/utils";
import { CATEGORY_ORDER, getCategoryLabel } from "@/lib/categories";

type Props = {
  initialProjects: Project[];
};

export default function ProjectsClient({ initialProjects }: Props) {
  const t = useTranslations('projects.client');
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const present = new Set(initialProjects.map((p) => p.category));
    const sorted = CATEGORY_ORDER.filter((cat) => present.has(cat));
    const remaining = Array.from(present).filter((cat) => !CATEGORY_ORDER.includes(cat as any));
    return ["All", ...sorted, ...remaining];
  }, [initialProjects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return initialProjects
      .filter((p) => (activeCategory === "All" ? true : p.category === activeCategory))
      .filter((p) => {
        if (!q) return true;
        
        const title = getLocalized(p, 'title', locale).toLowerCase();
        const shortDesc = getLocalized(p, 'short_description', locale).toLowerCase();
        const tech = p.tech_stack.join(" ").toLowerCase();
        
        return title.includes(q) || shortDesc.includes(q) || tech.includes(q);
      })
      .sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
  }, [query, activeCategory, initialProjects, locale]);

  const getCatDisplayName = (cat: string): string => {
    if (cat === "All") return t('all');
    return getCategoryLabel(cat, locale);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-start gap-4 mb-8">
        <div className="flex items-center gap-3 bg-card border border-border rounded-full px-4 py-2 shadow-sm w-full md:max-w-md">
          <Search className="w-5 h-5 text-muted" />
          <input
            aria-label="Search projects"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="bg-transparent outline-none placeholder:text-muted text-sm w-full"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs px-3 py-1 rounded-md bg-card text-muted hover:bg-card/70 transition"
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

        {/* Desktop: wrapped filter buttons */}
        <nav className="hidden md:flex gap-2 flex-wrap py-1">
          {categories.map((cat) => {
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-3 min-h-[44px] rounded-full text-sm font-medium transition-all border ${
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

      {/* Screen-reader announcement when filter/search results change */}
      <p role="status" aria-live="polite" className="sr-only">
        {t('resultAnnouncement', { count: filtered.length })}
      </p>

      <section>
        {filtered.length === 0 ? (
          <div className="bg-card border border-border rounded-[2.5rem] p-12 text-center">
            <p className="text-muted text-lg font-semibold">{t('noResults')}</p>
            <p className="mt-2 text-sm text-muted">{t('tryAgain')}</p>
          </div>
        ) : (
          <motion.div layout className="flex flex-col gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </div>
  );
}