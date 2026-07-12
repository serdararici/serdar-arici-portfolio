"use client";

import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowLeft, ArrowRight, Clock, ExternalLink, Download } from "lucide-react";
import { SiMedium, SiGithub, SiYoutube, SiKaggle } from "react-icons/si";
import type { Components } from "react-markdown";
import type { Blog } from "@/types/types";
import { getLocalized } from "@/lib/utils";
import { getBlogCategoryLabel } from "@/lib/blogCategories";
import BlogGallery from "./BlogGallery";

type NavBlog = {
  slug: string;
  title: string;
  title_tr?: string | null;
  cover_image_url?: string | null;
};

type Props = {
  blog: Blog;
  prevBlog?: NavBlog | null;
  nextBlog?: NavBlog | null;
};

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold mt-10 mb-4 text-foreground">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold mt-8 mb-3 text-foreground border-b border-border pb-2">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-semibold mt-4 mb-2 text-foreground">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-foreground/85 leading-7">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="text-primary underline underline-offset-2 hover:text-secondary transition-colors"
    >
      {children}
    </a>
  ),
  pre: ({ children }) => (
    <pre className="bg-card border border-border rounded-xl p-4 overflow-x-auto mb-4 text-sm font-mono">
      {children}
    </pre>
  ),
  code: ({ children, className }) => {
    if (className?.startsWith("language-")) {
      return <code className={`${className} text-sm font-mono text-foreground/90`}>{children}</code>;
    }
    return (
      <code className="bg-card border border-border rounded px-1.5 py-0.5 text-sm font-mono text-primary">
        {children}
      </code>
    );
  },
  ul: ({ children }) => (
    <ul className="list-disc list-outside mb-4 space-y-1 text-foreground/85 pl-5">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside mb-4 space-y-1 text-foreground/85 pl-5">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary/40 pl-4 py-1 my-4 italic text-muted bg-card/50 rounded-r-lg">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-border my-8" />,
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  em: ({ children }) => <em className="italic text-foreground/80">{children}</em>,
  img: ({ src, alt }) =>
    src ? (
      <span className="block my-6 rounded-xl overflow-hidden border border-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt ?? ""} className="w-full h-auto" />
      </span>
    ) : null,
  table: ({ children }) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-card">{children}</thead>,
  th: ({ children }) => (
    <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border border-border px-3 py-2 text-foreground/85">{children}</td>
  ),
};

export default function BlogDetailClient({ blog, prevBlog, nextBlog }: Props) {
  const t = useTranslations("blogs.detail");
  const locale = useLocale();

  const title = getLocalized(blog, "title", locale) as string;
  const summary = getLocalized(blog, "summary", locale) as string | null | undefined;
  const content = getLocalized(blog, "content", locale) as string | null | undefined;

  const wordCount = content ? content.trim().split(/\s+/).filter(Boolean).length : 0;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 200));

  const categoryLabel = getBlogCategoryLabel(blog.category, locale);
  const publishedDate = blog.published_date
    ? new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(blog.published_date))
    : null;

  const galleryItems = (blog.gallery ?? []).filter(Boolean);
  const docItems = (blog.documents ?? []).filter(Boolean);
  const videoItems = (blog.videos ?? []).filter(Boolean);

  const hasLinks = !!(
    blog.medium_url ||
    blog.github_url ||
    blog.youtube_url ||
    blog.kaggle_url ||
    blog.other_url
  );

  return (
    <div className="min-h-screen bg-background text-foreground py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {t("back")}
          </Link>
        </div>

        {/* Hero cover image — full width, outside the grid */}
        {blog.cover_image_url && (
          <div className="mb-8 rounded-2xl overflow-hidden border border-border shadow-2xl relative h-72 sm:h-96 md:h-[500px]">
            <Image
              src={blog.cover_image_url}
              alt={title}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 1152px"
            />
          </div>
        )}

        {/* Main grid: article (col-span-2) + aside (col-span-1).
            Mobile: aside order-first so links/docs are visible before scrolling.
            Desktop: natural grid order with sticky aside. */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ARTICLE */}
          <article className="lg:col-span-2 order-last lg:order-none space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
              {title}
            </h1>

            {summary && (
              <p className="text-lg text-muted leading-relaxed border-l-4 border-primary/30 pl-4">
                {summary}
              </p>
            )}

            <hr className="border-border" />

            {content ? (
              <div className="max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {content}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="text-muted italic">{t("noContent")}</p>
            )}
          </article>

          {/* ASIDE */}
          <aside className="order-first lg:order-none lg:sticky lg:top-24 lg:self-start space-y-4">

            {/* Meta + Links */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-xl">
              <dl className="space-y-3">
                <div className="flex justify-between items-center">
                  <dt className="text-muted text-sm">{t("category")}</dt>
                  <dd className="px-3 py-1 bg-background2 rounded-full text-xs font-medium text-foreground">
                    {categoryLabel}
                  </dd>
                </div>

                {publishedDate && (
                  <div className="flex justify-between items-center">
                    <dt className="text-muted text-sm">{t("date")}</dt>
                    <dd className="text-subtle font-medium text-sm">{publishedDate}</dd>
                  </div>
                )}

                {wordCount > 0 && (
                  <div className="flex items-center gap-1.5 text-sm text-subtle pt-0.5">
                    <Clock className="w-3.5 h-3.5 text-muted shrink-0" />
                    <span>{t("readTime", { minutes: readMinutes })}</span>
                  </div>
                )}
              </dl>

              {hasLinks && (
                <div className="mt-6 flex flex-col gap-3">
                  {blog.medium_url && (
                    <a
                      href={blog.medium_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-foreground text-background font-bold hover:opacity-90 transition"
                    >
                      <SiMedium className="w-4 h-4" />
                      Medium
                    </a>
                  )}
                  {blog.github_url && (
                    <a
                      href={blog.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border text-foreground font-bold hover:bg-foreground hover:text-background transition"
                    >
                      <SiGithub className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                  {blog.youtube_url && (
                    <a
                      href={blog.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#FF0000] hover:bg-[#CC0000] text-white font-bold transition shadow-lg shadow-red-900/20"
                    >
                      <SiYoutube className="w-4 h-4 fill-current" />
                      YouTube
                    </a>
                  )}
                  {blog.kaggle_url && (
                    <a
                      href={blog.kaggle_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border text-foreground font-bold hover:bg-foreground hover:text-background transition"
                    >
                      <SiKaggle className="w-4 h-4" />
                      Kaggle
                    </a>
                  )}
                  {blog.other_url && (
                    <a
                      href={blog.other_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-on-primary font-bold hover:opacity-90 transition shadow-lg shadow-primary/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {blog.other_url_label ?? t("link")}
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Documents card */}
            {docItems.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6 shadow-xl">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted mb-4">
                  {t("documents")}
                </h3>
                <div className="flex flex-col gap-2">
                  {docItems.map((doc, i) => {
                    const docTitle = locale === "tr" && doc.title_tr ? doc.title_tr : doc.title;
                    return (
                      <a
                        key={i}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border text-foreground hover:border-primary/50 hover:bg-background2 transition text-sm group"
                      >
                        <Download className="w-4 h-4 text-muted shrink-0 group-hover:text-primary transition-colors" />
                        <span>{docTitle}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Videos — full width below grid */}
        {videoItems.length > 0 && (
          <section className="mt-12 border-t border-border pt-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-6">
              {t("videos")}
            </h3>
            <div className="flex flex-col gap-8">
              {videoItems.map((video, i) => {
                const videoTitle = locale === "tr" && video.title_tr ? video.title_tr : video.title;
                return (
                  <div key={i}>
                    {videoTitle && (
                      <p className="text-sm font-medium text-foreground mb-2">{videoTitle}</p>
                    )}
                    <video
                      controls
                      preload="metadata"
                      className="max-h-[70vh] w-auto mx-auto rounded-2xl border border-border object-contain"
                    >
                      <source src={video.url} />
                    </video>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Gallery — full width below grid */}
        {galleryItems.length > 0 && (
          <BlogGallery gallery={galleryItems} blogTitle={title} />
        )}

        {/* Prev / Next navigation */}
        {(prevBlog || nextBlog) && (
          <div className="mt-12 border-t border-border pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevBlog ? (
              <Link
                href={`/blogs/${prevBlog.slug}`}
                className="group flex flex-col gap-2 p-4 rounded-2xl border border-border hover:border-primary/50 bg-card hover:bg-primary/5 transition-all duration-300"
              >
                <span className="flex items-center gap-1 text-xs text-muted uppercase tracking-wider">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {t("prevBlog")}
                </span>
                <div className="flex items-center gap-3">
                  {prevBlog.cover_image_url && (
                    <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={prevBlog.cover_image_url}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  )}
                  <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {locale === "tr" ? (prevBlog.title_tr ?? prevBlog.title) : prevBlog.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextBlog ? (
              <Link
                href={`/blogs/${nextBlog.slug}`}
                className="group flex flex-col gap-2 p-4 rounded-2xl border border-border hover:border-primary/50 bg-card hover:bg-primary/5 transition-all duration-300 text-right"
              >
                <span className="flex items-center justify-end gap-1 text-xs text-muted uppercase tracking-wider">
                  {t("nextBlog")}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <div className="flex items-center justify-end gap-3">
                  <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {locale === "tr" ? (nextBlog.title_tr ?? nextBlog.title) : nextBlog.title}
                  </span>
                  {nextBlog.cover_image_url && (
                    <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={nextBlog.cover_image_url}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  )}
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        )}

      </div>
    </div>
  );
}
