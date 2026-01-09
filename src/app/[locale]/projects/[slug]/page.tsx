import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ProjectDetailClient from "@/components/projects/ProjectDetailClient";
import { getTranslations } from "next-intl/server";
import { getLocalized } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  
  const { data: project } = await supabase
    .from('projects')
    .select('title, title_tr')
    .eq('slug', slug)
    .single();

  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} | Serdar Arıcı`,
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
    return notFound();
  }

  const normalizedProject = {
    ...project,
    tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack : [],
    gallery: Array.isArray(project.gallery) ? project.gallery : [],
  };

  return <ProjectDetailClient project={normalizedProject} />;
}