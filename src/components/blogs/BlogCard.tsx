"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { SiMedium } from "react-icons/si";
import { Link } from "@/i18n/routing";
import type { Blog } from "@/types/types";
import { getLocalized, formatDate } from "@/lib/utils";
import { getBlogCategoryLabel } from "@/lib/blogCategories";
import { useTranslations, useLocale } from "next-intl";

type Props = {
  blog: Blog;
  featured?: boolean;
};

export default function BlogCard({ blog, featured = false }: Props) {
  const t = useTranslations('blogs.card');
  const locale = useLocale();

  const currentTitle = getLocalized(blog, 'title', locale);
  const currentSummary = getLocalized(blog, 'summary', locale);
  const currentCategory = getBlogCategoryLabel(blog.category, locale);
  const formattedDate = blog.published_date ? formatDate(blog.published_date, locale) : null;

  const wordCount = blog.content ? blog.content.trim().split(/\s+/).filter(Boolean).length : 0;
  const readMinutes = wordCount > 0 ? Math.ceil(wordCount / 200) : 0;

  const isExternal = !!blog.external_url;
  const cardHref = blog.external_url ?? `/blogs/${blog.slug}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.995 }}
      transition={{ duration: 0.22 }}
      className="relative group bg-card border border-border rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:border-primary/40 transition-all duration-300"
    >
      {/* Stretched link — primary navigation target */}
      <Link
        href={cardHref}
        aria-label={currentTitle}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="absolute inset-0 z-[1] rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      />

      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-[2] px-2.5 py-1 rounded-full bg-primary text-on-primary text-[11px] font-bold uppercase tracking-wider pointer-events-none">
          {t('featured')}
        </div>
      )}

      {/* Arrow indicator */}
      <div className="absolute top-4 right-4 z-0 text-muted group-hover:text-primary transition-colors duration-300 pointer-events-none">
        <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
      </div>

      <div className={`flex flex-col ${featured ? 'md:flex-row' : 'md:flex-row'}`}>

        {/* Cover Image */}
        {blog.cover_image_url && (
          <figure className={`relative shrink-0 overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none ${
            featured
              ? 'w-full md:w-[44%] aspect-video md:aspect-auto md:min-h-[280px]'
              : 'w-full md:w-[36%] aspect-video md:aspect-auto md:min-h-[200px]'
          }`}>
            <Image
              src={blog.cover_image_url}
              alt={currentTitle}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 480px"
            />
          </figure>
        )}

        {/* Content */}
        <div className="flex flex-col justify-between flex-1 p-6 min-w-0">

          {/* Meta row: category · date · read time · medium badge */}
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold text-[11px] uppercase tracking-wide">
              {currentCategory}
            </span>
            {formattedDate && (
              <>
                <span className="text-faint text-xs">·</span>
                <time className="text-xs text-muted">{formattedDate}</time>
              </>
            )}
            {readMinutes > 0 && (
              <>
                <span className="text-faint text-xs">·</span>
                <span className="flex items-center gap-1 text-xs text-muted">
                  <Clock className="w-3 h-3" />
                  {t('readTime', { minutes: readMinutes })}
                </span>
              </>
            )}
            {isExternal && (
              <span className="ml-auto flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-foreground text-background text-[11px] font-bold uppercase tracking-wide pointer-events-none">
                <SiMedium className="w-3 h-3" />
                {t('readOnMedium')}
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className={`font-bold text-foreground leading-tight mb-3 group-hover:text-primary transition-colors duration-300 ${
            featured ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-xl md:text-2xl'
          }`}>
            {currentTitle}
          </h2>

          {/* Summary */}
          {currentSummary && (
            <p className={`text-muted leading-relaxed ${
              featured ? 'line-clamp-4 text-base' : 'line-clamp-2 text-sm'
            }`}>
              {currentSummary}
            </p>
          )}

          {/* Footer hint */}
          <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
            <span className="text-xs text-faint">
              {isExternal ? t('external') : t('readMore')}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
