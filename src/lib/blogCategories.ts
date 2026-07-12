export const BLOG_CATEGORY_ORDER = [
  'Blog',
  'Academic',
  'Notes',
  'Study',
  'Other',
] as const;

export const BLOG_CATEGORY_LABELS: Record<string, { en: string; tr: string }> = {
  'Blog':     { en: 'Blog',     tr: 'Blog Yazısı' },
  'Academic': { en: 'Academic', tr: 'Akademik'    },
  'Notes':    { en: 'Notes',    tr: 'Ders Notu'   },
  'Study':    { en: 'Study',    tr: 'Çalışma'     },
  'Other':    { en: 'Other',    tr: 'Diğer'       },
};

export function getBlogCategoryLabel(category: string, locale: string): string {
  return BLOG_CATEGORY_LABELS[category]?.[locale as 'en' | 'tr'] ?? category;
}
