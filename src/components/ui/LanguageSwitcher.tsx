'use client';

import { useParams } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { useRouter, usePathname } from '@/i18n/routing'; // next-intl'den import!

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const handleChange = (newLocale: string) => {
    // next-intl'in router'ı otomatik olarak locale'i yönetir
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex gap-2">
      {routing.locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleChange(locale)}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            params.locale === locale
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          aria-label={`Switch to ${locale}`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}