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
    alternates: {
      canonical: `${BASE_URL}/${locale}/projects/${slug}`,
      languages: {
        tr: `${BASE_URL}/tr/projects/${slug}`,
        en: `${BASE_URL}/en/projects/${slug}`,
      },
    },
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

  const [{ data: project, error }, { data: allProjects }] = await Promise.all([
    supabase.from('projects').select('*').eq('slug', slug).maybeSingle(),
    supabase
      .from('projects')
      .select('slug, title, title_tr, image_url')
      .order('project_date', { ascending: false }),
  ]);

  if (error || !project) {
    return notFound();
  }

  const normalizedProject = {
    ...project,
    tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack : [],
    gallery: Array.isArray(project.gallery) ? project.gallery : [],
  };

  const allList = allProjects ?? [];
  const idx = allList.findIndex(p => p.slug === slug);
  const prevProject = idx > 0 ? allList[idx - 1] : null;
  const nextProject = idx !== -1 && idx < allList.length - 1 ? allList[idx + 1] : null;

  return (
    <ProjectDetailClient
      project={normalizedProject}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}