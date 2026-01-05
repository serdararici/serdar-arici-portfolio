// src/app/projects/[slug]/page.tsx
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ProjectDetailClient from "@/components/projects/ProjectDetailClient";
// 1. Define the props type where params is a Promise
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
  // 2. Await the params before using them (Crucial for Next.js 15+)
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // 3. Fetch from Supabase with the resolved slug
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  // 4. Check for errors or empty results
  if (error || !project) {
    console.error("Project fetch error:", error?.message || "Project not found");
    return notFound();
  }

  return <ProjectDetailClient project={project} />;
}