import React from "react";
import type { Metadata } from "next";
import type { Project } from "@/types/types";
import { supabase } from "@/lib/supabase";
import ProjectsClient from "@/components/projects/ProjectsClient";
import { projects as fallbackProjects } from "@/data/projectsData";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiGithub, SiKaggle } from "react-icons/si";

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://serdararici.vercel.app';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === 'tr';

  const title = isTr ? 'Projeler' : 'Projects';
  const description = isTr
    ? 'Backend, frontend, mobil ve full-stack mühendislik projelerimi keşfedin.'
    : 'Explore my backend, frontend, mobile, and full-stack engineering projects.';

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title: `${title} | Serdar Arıcı`,
      description,
      url: `${BASE_URL}/${locale}/projects`,
      images: [{ url: '/profile_ai.png', width: 800, height: 800, alt: 'Serdar Arıcı' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Serdar Arıcı`,
      description,
      images: ['/profile_ai.png'],
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('projects.page');

  const { data } = await supabase
    .from("projects")
    .select("*")
    .order('project_date', { ascending: false });

  const rawProjects = (data ?? fallbackProjects) as any[];

  const projects: Project[] = rawProjects.map((p) => ({
    ...p,
    tech_stack: Array.isArray(p.tech_stack)
      ? p.tech_stack
      : typeof p.tech_stack === "string"
      ? (p.tech_stack ? JSON.parse(p.tech_stack) : [])
      : p.tech_stack ?? [],
    gallery: Array.isArray(p.gallery) ? p.gallery : [],
  }));

  return (
    <div className="min-h-screen bg-background text-foreground py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                {t('title')}{" "}
                <span className="hidden md:inline text-primary">
                  — {t('subtitle')}
                </span>
              </h1>
              <p className="text-muted max-w-2xl">
                {t('description')}
              </p>
            </div>
            <div className="flex items-center justify-center md:justify-end gap-2 shrink-0">
              <a
                href="https://github.com/serdararici"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-muted hover:bg-card hover:text-foreground transition-all text-sm font-medium"
              >
                <SiGithub className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://www.kaggle.com/serdararici"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-muted hover:bg-card hover:text-foreground transition-all text-sm font-medium"
              >
                <SiKaggle className="w-4 h-4" />
                Kaggle
              </a>
            </div>
          </div>
        </header>

        <ProjectsClient initialProjects={projects} />
      </div>
    </div>
  );
}
