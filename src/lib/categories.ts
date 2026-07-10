export const CATEGORY_ORDER = [
  'Full-Stack',
  'Backend',
  'Frontend',
  'Mobile',
  'AI/ML',
  'Academic',
  'Desktop',
  'System',
  'Other',
] as const;

export const CATEGORY_LABELS: Record<string, { en: string; tr: string }> = {
  'Backend':    { en: 'Backend',    tr: 'Backend'      },
  'Frontend':   { en: 'Frontend',   tr: 'Frontend'     },
  'Full-Stack': { en: 'Full-Stack', tr: 'Full-Stack'   },
  'Mobile':     { en: 'Mobile',     tr: 'Mobil'        },
  'Desktop':    { en: 'Desktop',    tr: 'Masaüstü'     },
  'System':     { en: 'System',     tr: 'Sistem'       },
  'AI/ML':      { en: 'AI/ML',      tr: 'Yapay Zeka'   },
  'Academic':   { en: 'Academic',   tr: 'Akademik'     },
  'Other':      { en: 'Other',      tr: 'Diğer'        },
};

export function getCategoryLabel(category: string, locale: string): string {
  return CATEGORY_LABELS[category]?.[locale as 'en' | 'tr'] ?? category;
}
