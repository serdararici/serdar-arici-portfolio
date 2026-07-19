import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Blog } from "@/types/types";
import { supabase } from "@/lib/supabase";
import BlogDetailClient from "@/components/blogs/BlogDetailClient";
import { setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://serdararici.vercel.app";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const isTr = locale === "tr";

  const { data } = await supabase
    .from("blogs")
    .select("title, title_tr, summary, summary_tr, cover_image_url")
    .eq("slug", slug)
    .single();

  if (!data) return { title: "Blog" };

  const title = (isTr && data.title_tr) ? data.title_tr : data.title;
  const description = (isTr && data.summary_tr) ? data.summary_tr : (data.summary ?? "");
  const ogImage = data.cover_image_url ?? "/profile_ai.png";
  const fullTitle = `${title} | Serdar Arıcı`;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/blogs/${slug}`,
      languages: {
        tr: `${BASE_URL}/tr/blogs/${slug}`,
        en: `${BASE_URL}/en/blogs/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: fullTitle,
      description,
      url: `${BASE_URL}/${locale}/blogs/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [{ data }, { data: allBlogs }] = await Promise.all([
    supabase.from("blogs").select("*").eq("slug", slug).single(),
    supabase
      .from("blogs")
      .select("slug, title, title_tr, cover_image_url")
      .order("published_date", { ascending: false }),
  ]);

  if (!data) {
    notFound();
  }

  const blog = data as Blog;
  const allList = allBlogs ?? [];
  const idx = allList.findIndex((b) => b.slug === slug);
  const prevBlog = idx > 0 ? allList[idx - 1] : null;
  const nextBlog = idx !== -1 && idx < allList.length - 1 ? allList[idx + 1] : null;

  return <BlogDetailClient blog={blog} prevBlog={prevBlog} nextBlog={nextBlog} />;
}
