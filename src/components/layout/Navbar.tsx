"use client";

import { Link } from "@/i18n/routing";
import { useState } from "react";
import { usePathname, useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import HamburgerMenu from "./HamburgerMenu";
import { Menu, Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";

const navItems = [
  { name: "home", href: "/" },
  { name: "about", href: "/about" },
  { name: "projects", href: "/projects" },
  { name: "blogs", href: "/blogs" },
  { name: "contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('navigation');

  const handleLanguageChange = (newLocale: string) => {
    const newPathname = pathname.replace(
      `/${params.locale}`,
      `/${newLocale}`
    );
    router.replace(newPathname);
    router.refresh();
    setLangMenuOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-[#121212]/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-xl font-semibold text-white
          transition-transform transition-colors duration-600
          hover:scale-103"
        >
          Serdar Arıcı
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => {
            const href = item.href === "/" ? "/" : item.href;
            const isActive = pathname === `/${params.locale}${item.href}` || 
                           (item.href === "/" && pathname === `/${params.locale}`);

            return (
              <li key={item.href} className="relative">
                <Link
                  href={href}
                  className={`
                    group relative pb-1 text-md font-medium
                    transition-colors duration-300
                    ${isActive ? "text-blue-400" : "text-gray-300 hover:text-white"}
                  `}
                >
                  {t(item.name)}

                  {/* Animated underline */}
                  <span
                    className={`
                      absolute left-0 -bottom-1 h-[2px] bg-blue-500
                      transition-all duration-300
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                  />
                </Link>
              </li>
            );
          })}

          {/* Language Switcher - Desktop */}
          <li className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 text-gray-300 hover:text-white transition-colors duration-300"
            >
              <Languages className="w-4 h-4" />
              <span className="text-sm font-medium uppercase">{params.locale}</span>
            </button>

            {/* Language Dropdown */}
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-lg overflow-hidden">
                {routing.locales.map((locale) => (
                  <button
                    key={locale}
                    onClick={() => handleLanguageChange(locale)}
                    className={`
                      w-full px-4 py-2 text-left text-sm transition-colors
                      ${params.locale === locale 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }
                    `}
                  >
                    {locale === 'tr' ? 'Türkçe' : 'English'}
                  </button>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* Mobile: Hamburger + Language */}
        <div className="md:hidden flex items-center gap-3">
          {/* Language Switcher - Mobile */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 px-2 py-1 text-gray-300 hover:text-white transition-colors"
            >
              <Languages className="w-5 h-5" />
              <span className="text-xs font-medium uppercase">{params.locale}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-lg overflow-hidden">
                {routing.locales.map((locale) => (
                  <button
                    key={locale}
                    onClick={() => handleLanguageChange(locale)}
                    className={`
                      w-full px-3 py-2 text-left text-xs transition-colors
                      ${params.locale === locale 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }
                    `}
                  >
                    {locale === 'tr' ? 'TR' : 'EN'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
            >
              <Menu className="w-6 h-6 text-gray-300 hover:text-white" />
            </button>
          )}
        </div>

        {/* Hamburger Menu */}
        <HamburgerMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </nav>
    </header>
  );
}