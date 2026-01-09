"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import type { Project } from "@/types/types";
import ProjectCard from "@/components/projects/ProjectCard";
import { useTranslations, useLocale } from "next-intl";
import { getLocalized } from "@/lib/utils";

type Props = {
  initialProjects: Project[];
};

export default function ProjectsClient({ initialProjects }: Props) {
  const t = useTranslations('projects.client');
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(initialProjects.map((p) => p.category)));
    return ["All", ...cats];
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

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <div className="flex items-center gap-3 bg-card border border-gray-800 rounded-full px-4 py-2 shadow-sm w-full md:w-1/2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            aria-label="Search projects"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="bg-transparent outline-none placeholder:text-gray-500 text-sm w-full"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
            >
              {t('clear')}
            </button>
          )}
        </div>

        <nav className="flex gap-3 overflow-x-auto py-1 px-1 no-scrollbar">
          {categories.map((cat) => {
            const active = cat === activeCategory;
            
            // Get the translated name for the category from the first project that matches this category
            const projectWithCat = initialProjects.find(p => p.category === cat);
            const displayCatName = cat === "All" 
              ? t('all') 
              : (projectWithCat ? getLocalized(projectWithCat, 'category', locale) : cat);

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  active ? "text-white" : "text-gray-300 border-gray-800 hover:border-primary/50"
                }`}
                style={active ? { backgroundColor: "var(--color-primary)", borderColor: "transparent" } : {}}
              >
                {displayCatName}
              </button>
            );
          })}
        </nav>
      </div>

      <section>
        {filtered.length === 0 ? (
          <div className="bg-card border border-gray-800 rounded-[2.5rem] p-12 text-center">
            <p className="text-gray-400 text-lg font-semibold">{t('noResults')}</p>
            <p className="mt-2 text-sm text-gray-500">{t('tryAgain')}</p>
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