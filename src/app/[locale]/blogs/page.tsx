import React from "react";
import type { Metadata } from "next";
import type { Blog } from "@/types/types";
import { supabase } from "@/lib/supabase";
import BlogsClient from "@/components/blogs/BlogsClient";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiMedium } from "react-icons/si";

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
    alternates: {
      canonical: `${BASE_URL}/${locale}/blogs`,
      languages: {
        tr: `${BASE_URL}/tr/blogs`,
        en: `${BASE_URL}/en/blogs`,
      },
    },
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">{t('title')}</h1>
              <p className="text-muted max-w-2xl text-base">{t('description')}</p>
            </div>
            <div className="flex items-center justify-center md:justify-end gap-2 shrink-0">
              <a
                href="https://medium.com/@serdararici"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-muted hover:bg-card hover:text-foreground transition-all text-sm font-medium"
              >
                <SiMedium className="w-4 h-4" />
                Medium
              </a>
            </div>
          </div>
        </header>

        <BlogsClient initialBlogs={blogs} />
      </div>
    </div>
  );
}
