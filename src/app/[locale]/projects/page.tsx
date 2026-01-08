import React from "react";
import type { Project } from "@/types/types";
import { supabase } from "@/lib/supabase";
import ProjectsClient from "@/components/projects/ProjectsClient";
import { projects as fallbackProjects } from "@/data/projectsData";
import { getTranslations } from "next-intl/server"; // Server side translation

export default async function ProjectsPage() {
  const t = await getTranslations('projects.page');
  
  // Fetch from Supabase
  const { data, error } = await supabase.from("projects").select("*");

  const rawProjects = (data ?? fallbackProjects) as any[];

  // Data normalization logic
  const projects: Project[] = rawProjects.map((p) => ({
    ...p,
    tech_stack: Array.isArray(p.tech_stack)
      ? p.tech_stack
      : typeof p.tech_stack === "string"
      ? (p.tech_stack ? JSON.parse(p.tech_stack) : [])
      : p.tech_stack ?? [],
  }));

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {t('title')}{" "}
            <span style={{ color: "var(--color-primary)" }} className="hidden md:inline">
              — {t('subtitle')}
            </span>
          </h1>
          <p className="text-gray-300 max-w-2xl">
            {t('description')}
          </p>
        </header>

        {/* Client-side interactive list with filtering */}
        <ProjectsClient initialProjects={projects} />
      </div>
    </div>
  );
}