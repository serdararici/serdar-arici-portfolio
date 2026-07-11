'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useRef, useState, useEffect } from 'react';
import { Languages } from 'lucide-react';
import { routing } from '@/i18n/routing';

type LanguageSwitcherProps = {
  variant?: 'desktop' | 'mobile';
};

export default function LanguageSwitcher({ variant = 'desktop' }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname(); // from @/i18n/routing — no locale prefix
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  // Close on Escape or click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (variant === 'mobile') {
    return (
      <div ref={containerRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className="flex items-center gap-1 px-2 py-1 text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-full"
        >
          <Languages className="w-5 h-5" />
          <span className="text-xs font-medium uppercase">{locale}</span>
        </button>

        {isOpen && (
          <div role="listbox" className="absolute right-0 mt-2 w-28 bg-surface border border-border rounded-lg shadow-lg overflow-hidden z-[60]">
            {routing.locales.map((loc) => (
              <button
                key={loc}
                role="option"
                aria-selected={locale === loc}
                onClick={() => handleLanguageChange(loc)}
                className={`
                  w-full px-3 py-2 text-left text-xs transition-colors
                  ${locale === loc
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted hover:bg-card hover:text-foreground'
                  }
                `}
              >
                {loc === 'tr' ? 'TR' : 'EN'}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Desktop variant
  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex items-center gap-2 px-3 py-1.5 text-muted hover:text-foreground transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-full"
      >
        <Languages className="w-4 h-4" />
        <span className="text-sm font-medium uppercase">{locale}</span>
      </button>

      {isOpen && (
        <div role="listbox" className="absolute right-0 mt-2 w-32 bg-surface border border-border rounded-lg shadow-lg overflow-hidden z-[60]">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              role="option"
              aria-selected={locale === loc}
              onClick={() => handleLanguageChange(loc)}
              className={`
                w-full px-4 py-2 text-left text-sm transition-colors
                ${locale === loc
                  ? 'bg-primary/20 text-primary'
                  : 'text-muted hover:bg-card hover:text-foreground'
                }
              `}
            >
              {loc === 'tr' ? 'Türkçe' : 'English'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
