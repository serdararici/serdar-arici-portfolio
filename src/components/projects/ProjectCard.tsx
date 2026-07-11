"use client";

import React from "react";
import Image from "next/image";
import { Link } from '@/i18n/routing';
import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/types/types";
import { formatDate, getLocalized } from "@/lib/utils";
import { getCategoryLabel } from "@/lib/categories";
import { useTranslations, useLocale } from "next-intl";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  const t = useTranslations('projects.card');
  const locale = useLocale();

  const currentTitle = getLocalized(project, 'title', locale);
  const currentShortDesc = getLocalized(project, 'short_description', locale);
  const currentCategory = getCategoryLabel(project.category, locale);
  const formattedDate = formatDate(project.project_date, locale);

  return (
    <motion.article
      layout
      key={project.slug}
      initial={{ opacity: 0, y: 8, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.995 }}
      transition={{ duration: 0.22 }}
      className="relative group bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-lg transform transition hover:scale-[1.02] hover:border-primary/50 hover:shadow-2xl"
    >
      {/* Stretched link: covers the full card surface as the primary navigation target.
          z-[1] puts it above in-flow content; action buttons at z-[2] intercept their own clicks.
          This avoids nested <a> elements while keeping native keyboard/focus behaviour. */}
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`${t('ariaLabel')} ${currentTitle}`}
        className="absolute inset-0 z-[1] rounded-[2.5rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      />

      {/* Arrow indicator — pointer-events-none so clicks fall through to the stretched link */}
      <div className="absolute top-6 right-8 z-0 text-muted group-hover:text-primary transition-colors duration-300 pointer-events-none">
        <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
      </div>

      <div className="flex flex-col md:flex-row w-full">
        <figure className="relative w-full md:w-72 h-56 md:h-auto shrink-0 overflow-hidden md:rounded-l-[2.5rem] rounded-t-[2.5rem]">
          <Image
            src={project.image_url ?? "/image_not_found.jpg"}
            alt={currentTitle}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-black/60 backdrop-blur-md text-on-primary border border-primary/30">
              {currentCategory}
            </span>
          </div>
        </figure>

        <div className="p-6 flex flex-col gap-3 flex-1 md:pl-6 min-w-0">
          <div className="pr-8 w-full overflow-hidden">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground truncate">{currentTitle}</h3>
          </div>

          <p className="text-sm text-muted line-clamp-3 leading-relaxed pr-4 md:pr-6 overflow-hidden w-full">
            {currentShortDesc || getLocalized(project, 'description', locale)}
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            {project.tech_stack.slice(0, 5).map((tech) => (
              <span key={tech} className="px-2.5 py-1 text-xs font-medium rounded-md border border-border text-muted bg-card/50">
                {tech}
              </span>
            ))}
            {project.tech_stack.length > 5 && (
              <span className="text-xs text-muted">+{project.tech_stack.length - 5}</span>
            )}
          </div>

          {/* Action row at z-[2]: above the stretched link, intercepts its own clicks */}
          <div className="mt-auto relative z-[2] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              {project.live_url && (
                <Link
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-primary text-on-primary hover:opacity-90 transition shadow min-w-30"
                >
                  <ExternalLink className="w-4 h-4" />
                  {t('viewDemo')}
                </Link>
              )}

              {project.github_url && (
                <Link
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border border-border text-foreground hover:bg-foreground hover:text-background transition min-w-30"
                >
                  <SiGithub className="w-4 h-4" />
                  {t('github')}
                </Link>
              )}
            </div>
            <time className="text-xs text-subtle">{formattedDate}</time>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
