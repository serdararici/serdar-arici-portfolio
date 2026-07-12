"use client";

import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Clock, ExternalLink, Download } from "lucide-react";
import { SiMedium, SiGithub, SiYoutube, SiKaggle } from "react-icons/si";
import type { Components } from "react-markdown";
import type { Blog } from "@/types/types";
import { getLocalized } from "@/lib/utils";
import { getBlogCategoryLabel } from "@/lib/blogCategories";
import BlogGallery from "./BlogGallery";

type Props = {
  blog: Blog;
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

export default function BlogDetailClient({ blog }: Props) {
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

  const hasLinks = !!(
    blog.medium_url ||
    blog.github_url ||
    blog.youtube_url ||
    blog.kaggle_url ||
    blog.other_url
  );

  return (
    <div className="min-h-screen bg-background text-foreground py-12 md:py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {t("back")}
        </Link>

        {/* Hero image */}
        {blog.cover_image_url && (
          <div className="mt-2 mb-8 rounded-2xl overflow-hidden border border-border relative aspect-video">
            <Image
              src={blog.cover_image_url}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        {/* Category + date + read time */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted mb-4">
          <span className="font-medium text-primary">{categoryLabel}</span>
          {publishedDate && (
            <>
              <span className="text-border">·</span>
              <span>{publishedDate}</span>
            </>
          )}
          {wordCount > 0 && (
            <>
              <span className="text-border">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {t("readTime", { minutes: readMinutes })}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
          {title}
        </h1>

        {/* Summary */}
        {summary && (
          <p className="text-lg text-muted leading-relaxed mb-8 border-l-4 border-primary/30 pl-4">
            {summary}
          </p>
        )}

        <hr className="border-border mb-8" />

        {/* Markdown content */}
        {content ? (
          <div className="max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {content}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="text-muted italic">{t("noContent")}</p>
        )}

        {/* Links section */}
        {hasLinks && (
          <section className="mt-10 pt-8 border-t border-border">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-4">
              {t("links")}
            </h3>
            <div className="flex flex-wrap gap-3">
              {blog.medium_url && (
                <a
                  href={blog.medium_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-85 transition-opacity"
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
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-foreground text-sm font-semibold hover:border-primary/50 hover:bg-card transition-all"
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
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-85 shadow-lg shadow-red-900/20"
                  style={{ backgroundColor: "#FF0000" }}
                >
                  <SiYoutube className="w-4 h-4" />
                  YouTube
                </a>
              )}
              {blog.kaggle_url && (
                <a
                  href={blog.kaggle_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-foreground text-sm font-semibold hover:border-primary/50 hover:bg-card transition-all"
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
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="w-4 h-4" />
                  {blog.other_url_label ?? t("link")}
                </a>
              )}
            </div>
          </section>
        )}

        {/* Documents section */}
        {docItems.length > 0 && (
          <section className="mt-10 pt-8 border-t border-border">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-4">
              {t("documents")}
            </h3>
            <div className="flex flex-col gap-2">
              {docItems.map((doc, i) => {
                const docTitle =
                  locale === "tr" && doc.title_tr ? doc.title_tr : doc.title;
                return (
                  <a
                    key={i}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-4 py-3 rounded-xl border border-border text-foreground hover:border-primary/50 hover:bg-card transition-all text-sm group"
                  >
                    <Download className="w-4 h-4 text-muted shrink-0 group-hover:text-primary transition-colors" />
                    <span>{docTitle}</span>
                  </a>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* Gallery — wider than reading column */}
      {galleryItems.length > 0 && (
        <div className="max-w-5xl mx-auto mt-4 px-4">
          <BlogGallery gallery={galleryItems} blogTitle={title} />
        </div>
      )}
    </div>
  );
}
