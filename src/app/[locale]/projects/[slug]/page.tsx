import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ProjectDetailClient from "@/components/projects/ProjectDetailClient";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://serdararici.vercel.app';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const isTr = locale === 'tr';

  const { data: project } = await supabase
    .from('projects')
    .select('title, title_tr, short_description, short_description_tr, image_url')
    .eq('slug', slug)
    .single();

  if (!project) return { title: 'Project Not Found' };

  const title = (isTr && project.title_tr) ? project.title_tr : project.title;
  const description = isTr
    ? (project.short_description_tr || project.short_description || '')
    : (project.short_description || '');
  const imageUrl = project.image_url ?? '/profile_ai.png';
  const fullTitle = `${title} | Serdar Arıcı`;

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title: fullTitle,
      description,
      url: `${BASE_URL}/${locale}/projects/${slug}`,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
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