"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import HamburgerMenu from "./HamburgerMenu";
import { Menu } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Me", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full bg-[#121212]/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold text-white">
          Serdar Arıcı
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={`
                    group relative pb-1 text-md font-medium
                    transition-colors duration-300
                    ${isActive ? "text-blue-400" : "text-gray-300 hover:text-white"}
                  `}
                >
                  {item.name}

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
        </ul>

        {/* Mobile Hamburger */}
        {!isOpen && (
          <button
            className="md:hidden"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-6 h-6 text-gray-300 hover:text-white" />
          </button>
        )}

        {/* Hamburger Menu */}
        <HamburgerMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </nav>
    </header>
  );
}
