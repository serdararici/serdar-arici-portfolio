'use client'

import { useTranslations } from 'next-intl';

export default function Loading() {
  const t = useTranslations('common.loading');

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-400 font-medium tracking-wide">
          {t('text')}
        </p>
      </div>
    </div>
  )
}