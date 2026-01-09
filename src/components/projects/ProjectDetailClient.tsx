"use client";

import React from "react";
import Image from "next/image";
import { Link } from '@/i18n/routing';
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink as ExtIcon } from "lucide-react";
import { SiGithub, SiYoutube } from "react-icons/si";
import type { Project } from "@/types/types";
import { formatDate, getLocalized } from "@/lib/utils";
import ProjectGallery from "./ProjectGallery";
import { useTranslations, useLocale } from "next-intl";

type Props = {
  project: Project;
};

export default function ProjectDetailClient({ project }: Props) {
  const t = useTranslations('projects.detail');
  const locale = useLocale();

  const currentTitle = getLocalized(project, 'title', locale);
  const currentDesc = getLocalized(project, 'description', locale);
  const currentCategory = getLocalized(project, 'category', locale);

  const gallery = (project.gallery && project.gallery.length > 0) 
    ? project.gallery 
    : (project.image_url ? [project.image_url] : []);

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition">
              <ArrowLeft className="w-4 h-4" />
              {t('back')}
            </Link>
          </div>

          <div className="max-w-4xl mx-auto mb-12"> 
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
              <div className="relative w-full h-64 md:h-112.5">
                <Image
                  src={project.image_url ?? "/image_not_found.jpg"}
                  alt={currentTitle}
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <article className="lg:col-span-2 space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                {currentTitle}
              </h1>
              
              <section className="max-w-none">
                <h2 className="text-2xl font-semibold text-primary mb-4 border-b border-gray-800 pb-2">
                  {t('about')}
                </h2>
                <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                  {currentDesc || t('noDescription')}
                </div>
              </section>
            </article>

            <aside className="space-y-6 sticky top-24 self-start">
              <div className="bg-card border border-gray-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">{t('sidebarTitle')}</h3>

                <dl className="space-y-4">
                  <div className="flex justify-between items-center">
                    <dt className="text-gray-400 text-sm">{t('category')}</dt>
                    <dd className="text-white font-medium px-3 py-1 bg-gray-900 rounded-full text-xs">
                      {currentCategory}
                    </dd>
                  </div>

                  <div className="flex justify-between items-center">
                    <dt className="text-gray-400 text-sm">{t('completed')}</dt>
                    <dd className="text-gray-200 font-medium">
                      {formatDate(project.project_date, locale)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-8 flex flex-col gap-3">
                  {project.live_url && (
                    <Link
                      href={project.live_url}
                      target="_blank"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-white font-bold hover:opacity-90 transition shadow-lg shadow-primary/20"
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
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-700 text-white font-bold hover:bg-white hover:text-black transition"
                    >
                      <SiGithub className="w-4 h-4" />
                      {t('source')}
                    </Link>
                  )}
                </div>
              </div>

              <div className="bg-card border border-gray-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">{t('techStack')}</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-sm text-gray-300">
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
          
        </div>
      </motion.div>
    </div>
  );
}