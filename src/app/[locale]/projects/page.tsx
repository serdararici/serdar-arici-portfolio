import React from "react";
import type { Project } from "@/types/types";
import { supabase } from "@/lib/supabase";
import ProjectsClient from "@/components/projects/ProjectsClient";
import { projects as fallbackProjects } from "@/data/projectsData";

export default async function ProjectsPage() {
  // Fetch projects from Supabase on the server
  const { data, error } = await supabase.from("projects").select("*");

  // If Supabase request fails or returns null, fall back to local data
  const rawProjects = (data ?? fallbackProjects) as any[];

  // Normalize tech_stack to an array if needed
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

        {/* Client-side interactive list */}
        <ProjectsClient initialProjects={projects} />
      </div>
    </div>
  );
}
