import React from "react";
import type { Project } from "@/types/types";
import { supabase } from "@/lib/supabase";
import ProjectsClient from "@/components/projects/ProjectsClient";
import { projects as fallbackProjects } from "@/data/projectsData";
import { getTranslations } from "next-intl/server";

export default async function ProjectsPage() {
  const t = await getTranslations('projects.page');
  
  const { data, error } = await supabase
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
    // Gallery null gelirse boş array set edelim
    gallery: Array.isArray(p.gallery) ? p.gallery : [],
  }));

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {t('title')}{" "}
            <span className="hidden md:inline text-primary">
              — {t('subtitle')}
            </span>
          </h1>
          <p className="text-gray-300 max-w-2xl">
            {t('description')}
          </p>
        </header>

        <ProjectsClient initialProjects={projects} />
      </div>
    </div>
  );
}