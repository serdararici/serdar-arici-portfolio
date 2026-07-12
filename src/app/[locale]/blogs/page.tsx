import React from "react";
import type { Metadata } from "next";
import type { Blog } from "@/types/types";
import { supabase } from "@/lib/supabase";
import BlogsClient from "@/components/blogs/BlogsClient";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://serdararici.vercel.app';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === 'tr';

  const title = isTr ? 'Blog' : 'Blog';
  const description = isTr
    ? 'Yazılım mühendisliği, yapay zeka ve akademik çalışmalar üzerine notlar, makaleler ve çalışmalar.'
    : 'Notes, articles, and studies on software engineering, AI, and academic research.';

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title: `${title} | Serdar Arıcı`,
      description,
      url: `${BASE_URL}/${locale}/blogs`,
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

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('blogs.page');

  const { data } = await supabase
    .from("blogs")
    .select("*")
    .order('published_date', { ascending: false });

  const blogs: Blog[] = (data ?? []) as Blog[];

  return (
    <div className="min-h-screen bg-background text-foreground py-12 md:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-muted max-w-2xl text-base">{t('description')}</p>
        </header>

        <BlogsClient initialBlogs={blogs} />
      </div>
    </div>
  );
}
