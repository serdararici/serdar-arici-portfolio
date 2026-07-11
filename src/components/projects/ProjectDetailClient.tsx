"use client";

import React from "react";
import Image from "next/image";
import { Link } from '@/i18n/routing';
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink as ExtIcon, FileText } from "lucide-react";
import { SiGithub, SiYoutube } from "react-icons/si";
import type { Project } from "@/types/types";
import { formatDate, getLocalized } from "@/lib/utils";
import { getCategoryLabel } from "@/lib/categories";
import ProjectGallery from "./ProjectGallery";
import { useTranslations, useLocale } from "next-intl";

type NavProject = {
  slug: string;
  title: string;
  title_tr?: string | null;
  image_url?: string | null;
};

type Props = {
  project: Project;
  prevProject?: NavProject | null;
  nextProject?: NavProject | null;
};

export default function ProjectDetailClient({ project, prevProject, nextProject }: Props) {
  const t = useTranslations('projects.detail');
  const locale = useLocale();

  const currentTitle = getLocalized(project, 'title', locale);
  const currentDesc = getLocalized(project, 'description', locale);
  const currentCategory = getCategoryLabel(project.category, locale);

  const gallery = (project.gallery && project.gallery.length > 0)
    ? project.gallery
    : (project.image_url ? [project.image_url] : []);

  const getNavTitle = (nav: NavProject) =>
    locale === 'tr' ? (nav.title_tr ?? nav.title) : nav.title;

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition">
              <ArrowLeft className="w-4 h-4" />
              {t('back')}
            </Link>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border bg-card/50 backdrop-blur-sm">
              <div className="relative w-full h-64 md:h-112.5">
                <Image
                  src={project.image_url ?? "/image_not_found.jpg"}
                  alt={currentTitle}
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </div>

          {/* On mobile: aside (CTA buttons) first, article (description) second.
              On desktop (lg): article in cols 1-2, aside as col-3 sidebar. */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <article className="lg:col-span-2 space-y-8 order-last lg:order-none">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                {currentTitle}
              </h1>

              <section className="max-w-none">
                <h2 className="text-2xl font-semibold text-primary mb-4 border-b border-border pb-2">
                  {t('about')}
                </h2>
                <div className="text-foreground text-lg leading-relaxed whitespace-pre-line">
                  {currentDesc || t('noDescription')}
                </div>
              </section>
            </article>

            <aside className="space-y-6 order-first lg:order-none lg:sticky lg:top-24 lg:self-start">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-xl">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted mb-4">{t('sidebarTitle')}</h3>

                <dl className="space-y-4">
                  <div className="flex justify-between items-center">
                    <dt className="text-muted text-sm">{t('category')}</dt>
                    <dd className="text-foreground font-medium px-3 py-1 bg-background2 rounded-full text-xs">
                      {currentCategory}
                    </dd>
                  </div>

                  <div className="flex justify-between items-center">
                    <dt className="text-muted text-sm">{t('completed')}</dt>
                    <dd className="text-subtle font-medium">
                      {formatDate(project.project_date, locale)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-8 flex flex-col gap-3">
                  {project.live_url && (
                    <Link
                      href={project.live_url}
                      target="_blank"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-on-primary font-bold hover:opacity-90 transition shadow-lg shadow-primary/20"
                    >
                      <ExtIcon className="w-4 h-4" />
                      {t('live')}
                    </Link>
                  )}

                  {project.video_url && (
                    <Link
                      href={project.video_url}
                      target="_blank"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#FF0000] text-white font-bold hover:bg-[#CC0000] transition shadow-lg shadow-red-900/20"
                    >
                      <SiYoutube className="w-4 h-4 fill-current" />
                      {t('watch')}
                    </Link>
                  )}

                  {project.github_url && (
                    <Link
                      href={project.github_url}
                      target="_blank"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border text-foreground font-bold hover:bg-foreground hover:text-background transition"
                    >
                      <SiGithub className="w-4 h-4" />
                      {t('source')}
                    </Link>
                  )}

                  {project.document_url && (
                    <Link
                      href={project.document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border text-foreground font-bold hover:bg-foreground hover:text-background transition"
                    >
                      <FileText className="w-4 h-4" />
                      {t('document')}
                    </Link>
                  )}
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-xl">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted mb-4">{t('techStack')}</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 rounded-lg bg-background2 border border-border text-sm text-muted">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          <ProjectGallery
            gallery={gallery}
            projectTitle={currentTitle}
          />

          {/* Prev / Next project navigation */}
          {(prevProject || nextProject) && (
            <div className="mt-12 border-t border-border pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.slug}`}
                  className="group flex flex-col gap-2 p-4 rounded-2xl border border-border hover:border-primary/50 bg-card hover:bg-primary/5 transition-all duration-300"
                >
                  <span className="flex items-center gap-1 text-xs text-muted uppercase tracking-wider">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    {t('prevProject')}
                  </span>
                  <div className="flex items-center gap-3">
                    {prevProject.image_url && (
                      <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={prevProject.image_url}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    )}
                    <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {getNavTitle(prevProject)}
                    </span>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextProject ? (
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="group flex flex-col gap-2 p-4 rounded-2xl border border-border hover:border-primary/50 bg-card hover:bg-primary/5 transition-all duration-300 text-right"
                >
                  <span className="flex items-center justify-end gap-1 text-xs text-muted uppercase tracking-wider">
                    {t('nextProject')}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <div className="flex items-center justify-end gap-3">
                    <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {getNavTitle(nextProject)}
                    </span>
                    {nextProject.image_url && (
                      <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={nextProject.image_url}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    )}
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
