"use client";

import { Link } from "@/i18n/routing";
import { useState, useRef } from "react";
import { usePathname, useParams } from "next/navigation";
import HamburgerMenu from "./HamburgerMenu";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import ThemeToggle from "../ui/ThemeToggle";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";

const navItems = [
  { name: "home", href: "/" },
  { name: "about", href: "/about" },
  { name: "projects", href: "/projects" },
  { name: "blogs", href: "/blogs" },
  { name: "contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations('navigation');

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-surface/80 backdrop-blur border-b border-border/50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-semibold text-foreground transition-transform transition-colors duration-500 hover:scale-103 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-lg"
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
                      group relative pb-1 text-base font-medium
                      transition-colors duration-300
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm
                      ${isActive ? "text-primary" : "text-muted hover:text-foreground"}
                    `}
                  >
                    {t(item.name)}

                    {/* Animated underline */}
                    <span
                      className={`
                        absolute left-0 -bottom-1 h-[2px] bg-primary
                        transition-all duration-300
                        ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                      `}
                    />
                  </Link>
                </li>
              );
            })}

            {/* Language Switcher + Theme Toggle - Desktop */}
            <li className="flex items-center gap-1">
              <LanguageSwitcher variant="desktop" />
              <ThemeToggle />
            </li>
          </ul>

          {/* Mobile: Hamburger + Language + Theme */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            {/* Language Switcher - Mobile */}
            <LanguageSwitcher variant="mobile" />

            <button
              ref={triggerRef}
              onClick={() => setIsOpen(true)}
              aria-label={t('openMenu')}
              aria-expanded={isOpen}
              aria-controls="hamburger-menu"
              className={`p-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-opacity ${isOpen ? 'opacity-0 pointer-events-none' : ''}`}
            >
              <Menu className="w-6 h-6 text-muted hover:text-foreground" />
            </button>
          </div>
        </nav>
      </header>

      {/* HamburgerMenu rendered outside <header> to avoid backdrop-filter containing-block trap:
          backdrop-filter on <header> creates a new containing block for fixed descendants,
          which would constrain the overlay to the header's ~64px height instead of the viewport. */}
      <HamburgerMenu isOpen={isOpen} onClose={() => setIsOpen(false)} triggerRef={triggerRef} />
    </>
  );
}