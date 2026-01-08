// src/app/projects/[slug]/page.tsx
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ProjectDetailClient from "@/components/projects/ProjectDetailClient";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ slug: string }>;
};

// Optional: Dinamik Sayfa Başlığı (SEO için süper olur)
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { data: project } = await supabase.from('projects').select('title').eq('slug', slug).single();
  
  return {
    title: project ? `${project.title} | Serdar Arıcı` : 'Project Details',
  };
}

export default async function ProjectPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !project) {
    console.error("Project fetch error:", error?.message || "Project not found");
    return notFound();
  }

  return <ProjectDetailClient project={project} />;
}