'use client';

import { useParams, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Languages } from 'lucide-react';
import { routing } from '@/i18n/routing';

type LanguageSwitcherProps = {
  variant?: 'desktop' | 'mobile';
};

export default function LanguageSwitcher({ variant = 'desktop' }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();

  const handleLanguageChange = (newLocale: string) => {
    const newPathname = pathname.replace(
      `/${params.locale}`,
      `/${newLocale}`
    );
    
    window.location.href = newPathname;
  };

  if (variant === 'mobile') {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 px-2 py-1 text-muted hover:text-foreground transition-colors"
        >
          <Languages className="w-5 h-5" />
          <span className="text-xs font-medium uppercase">{params.locale}</span>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-28 bg-surface border border-border rounded-lg shadow-lg overflow-hidden">
            {routing.locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLanguageChange(locale)}
                className={`
                  w-full px-3 py-2 text-left text-xs transition-colors
                  ${params.locale === locale 
                    ? 'bg-primary/20 text-primary' 
                    : 'text-muted hover:bg-card hover:text-foreground'
                  }
                `}
              >
                {locale === 'tr' ? 'TR' : 'EN'}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Desktop variant
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-muted hover:text-foreground transition-colors duration-300"
      >
        <Languages className="w-4 h-4" />
        <span className="text-sm font-medium uppercase">{params.locale}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-surface border border-border rounded-lg shadow-lg overflow-hidden">
          {routing.locales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleLanguageChange(locale)}
              className={`
                w-full px-4 py-2 text-left text-sm transition-colors
                ${params.locale === locale 
                  ? 'bg-primary/20 text-primary' 
                  : 'text-muted hover:bg-card hover:text-foreground'
                }
              `}
            >
              {locale === 'tr' ? 'Türkçe' : 'English'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}