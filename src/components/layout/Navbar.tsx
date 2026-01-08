"use client";

import { Link } from "@/i18n/routing";
import { useState } from "react";
import { usePathname, useParams } from "next/navigation";
import HamburgerMenu from "./HamburgerMenu";
import LanguageSwitcher from "../ui/LanguageSwitcher";
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
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations('navigation');

  return (
    <header className="fixed top-0 z-50 w-full bg-[#121212]/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
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
          <li>
            <LanguageSwitcher variant="desktop" />
          </li>
        </ul>

        {/* Mobile: Hamburger + Language */}
        <div className="md:hidden flex items-center gap-3">
          {/* Language Switcher - Mobile */}
          <LanguageSwitcher variant="mobile" />

          {!isOpen && (
            <button onClick={() => setIsOpen(true)}>
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