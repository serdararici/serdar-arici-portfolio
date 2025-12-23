"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { ArrowUpRight, ExternalLink, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Project } from "@/types/types";
import { projects as allProjects } from "@/data/projectsData";

const Projects = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(allProjects.map((p) => p.category)));
    return ["All", ...cats];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allProjects
      .filter((p) => (activeCategory === "All" ? true : p.category === activeCategory))
      .filter((p) => {
        if (!q) return true;
        const inTitle = p.title.toLowerCase().includes(q);
        const inTech = p.techStack.join(" ").toLowerCase().includes(q);
        return inTitle || inTech;
      })
      .sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [query, activeCategory]);

  const goToProject = (slug: string) => router.push(`/projects/${slug}`);

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            My Projects{" "}
            <span style={{ color: "var(--color-primary)" }} className="hidden md:inline">
              — Engineering Focused
            </span>
          </h1>
          <p className="text-gray-300 max-w-2xl">
            A curated showcase of engineering-first projects spanning backend, frontend,
            mobile, and full-stack solutions. Filter or search to find projects that demonstrate
            different skills and domains.
          </p>
        </header>

        {/* Controls: Search + Tabs */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          {/* Search */}
          <div className="flex items-center gap-3 bg-card border border-gray-800 rounded-full px-4 py-2 shadow-sm w-full md:w-1/2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              aria-label="Search projects"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or tech (e.g. React, Golang)"
              className="bg-transparent outline-none placeholder:text-gray-500 text-sm w-full"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-xs px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <nav className="flex gap-3 overflow-x-auto py-1 px-1">
            {categories.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    active ? "text-white" : "text-gray-300 border-gray-800 hover:border-primary/50"
                  }`}
                  style={
                    active
                      ? { backgroundColor: "var(--color-primary)", borderColor: "transparent" }
                      : {}
                  }
                >
                  {cat}
                </button>
              );
            })}
          </nav>
        </div>

        {/* List (one card per row) */}
        <section>
          {filtered.length === 0 ? (
            <div className="bg-[var(--color-card)] border border-gray-800 rounded-[2.5rem] p-8 text-center">
              <p className="text-gray-400 text-lg">No projects found.</p>
              <p className="mt-2 text-sm text-gray-500">Try adjusting your search or category filters.</p>
            </div>
          ) : (
            <motion.div layout className="flex flex-col gap-8">
              <AnimatePresence>
                {filtered.map((project: Project) => {
                  // Format date to human-friendly form, fallback to raw string if invalid
                  const d = new Date(project.date);
                  const formattedDate = !isNaN(d.getTime())
                    ? d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
                    : project.date;

                  return (
                    <motion.article
                    layout
                    key={project.slug}
                    initial={{ opacity: 0, y: 8, scale: 0.995 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.995 }}
                    transition={{ duration: 0.22 }}
                    role="link"
                    tabIndex={0}
                    aria-label={`Open details for ${project.title}`}
                    onClick={() => goToProject(project.slug)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        goToProject(project.slug);
                        }
                    }}
                    className="relative group bg-[var(--color-card)] border border-gray-800 rounded-[2.5rem] overflow-hidden shadow-lg transform transition hover:scale-[1.02] hover:border-primary/50 hover:shadow-2xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40"
                    >
                    {/* Detay Sayfası İkonu (Sağ Üst) */}
                    <div className="absolute top-6 right-8 z-20 text-gray-500 group-hover:text-primary transition-colors duration-300">
                        <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </div>

                    <div className="flex flex-col md:flex-row w-full">
                        {/* Left: Image */}
                        <figure className="relative w-full md:w-72 h-56 md:h-auto shrink-0 overflow-hidden md:rounded-l-[2.5rem] rounded-t-[2.5rem]">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-black/60 backdrop-blur-md text-foreground border border-primary/30">
                            {project.category}
                            </span>
                        </div>
                        </figure>

                        {/* Right: Content */}
                        <div className="p-6 flex flex-col gap-3 flex-1 md:pl-6">
                        {/* Title */}
                        <div className="pr-8"> {/* İkonla çakışmaması için sağdan padding verdik */}
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground truncate">
                            {project.title}
                            </h3>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-300 line-clamp-5 leading-relaxed pr-4 md:pr-6 overflow-hidden">
                            {project.shortDescription || project.description}
                        </p>

                        {/* Techs */}
                        <div className="flex items-center gap-2 flex-wrap">
                            {project.techStack.slice(0, 5).map((t) => (
                            <span
                                key={t}
                                className="px-2.5 py-1 text-[11px] font-medium rounded-md border border-gray-800 text-gray-300 bg-gray-900/50"
                            >
                                {t}
                            </span>
                            ))}
                            {project.techStack.length > 5 && (
                            <span className="text-xs text-gray-500">+{project.techStack.length - 5}</span>
                            )}
                        </div>

                        {/* Actions + Date (bottom) */}
                        <div className="mt-auto flex items-center justify-between gap-3">
                            <div className="flex gap-3">
                            {project.liveUrl ? (
                                <Link
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-primary text-white hover:opacity-90 transition shadow min-w-[120px]"
                                >
                                <ExternalLink className="w-4 h-4" />
                                View Demo
                                </Link>
                            ) : (
                                <button
                                disabled
                                onClick={(e) => e.stopPropagation()}
                                className="flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border border-gray-700 text-gray-500 bg-transparent cursor-not-allowed min-w-[120px]"
                                >
                                View Demo
                                </button>
                            )}

                            <Link
                                href={project.githubUrl ?? "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border border-gray-700 text-foreground hover:bg-white hover:text-black transition min-w-[120px]"
                            >
                                <SiGithub className="w-4 h-4" />
                                GitHub
                            </Link>
                            </div>
                            <time className="text-xs text-gray-400">{formattedDate}</time>
                        </div>
                        </div>
                    </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Projects;