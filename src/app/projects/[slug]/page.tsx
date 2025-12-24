// src/app/projects/[slug]/page.tsx

import { notFound } from "next/navigation";
import type { Project } from "@/types/types";
import { projects } from "@/data/projectsData";
import ProjectDetailClient from "@/components/projects/ProjectDetailClient";

interface Props {
  params: Promise<{ slug: string }>; 
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params; 

  const project = projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  const gallery = (project as Partial<Project> & { gallery?: string[] }).gallery ?? [project.image_url];

  return <ProjectDetailClient project={{ ...project, gallery }} />;
}