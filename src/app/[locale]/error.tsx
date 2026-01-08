'use client'

import { useTranslations } from 'next-intl';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('common.error');

  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-background">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          {t('title')}
        </h2>
        <p className="text-gray-400 mb-6">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
        >
          {t('retry')}
        </button>
      </body>
    </html>
  )
}