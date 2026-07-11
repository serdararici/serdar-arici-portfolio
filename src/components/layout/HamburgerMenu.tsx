"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Link, usePathname } from '@/i18n/routing';
import { SiLinkedin, SiGithub, SiGmail } from "react-icons/si";
import { HiX } from "react-icons/hi";
import { useTranslations } from "next-intl";
import ThemeToggle from "../ui/ThemeToggle";
import { useRef, useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
};

const navItems = [
  { name: "home", href: "/" },
  { name: "about", href: "/about" },
  { name: "projects", href: "/projects" },
  { name: "blogs", href: "/blogs" },
  { name: "contact", href: "/contact" },
];

export default function HamburgerMenu({ isOpen, onClose, triggerRef }: Props) {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management: open → close button; close → trigger button
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => closeButtonRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    } else {
      triggerRef?.current?.focus();
    }
  }, [isOpen, triggerRef]);

  // Focus trap + Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            ref={dialogRef}
            id="hamburger-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t('mobileMenu')}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="absolute top-0 right-0 w-3/4 max-w-xs bg-background p-4 border-l border-border rounded-bl-lg shadow-2xl"
          >
            {/* Header row: logo / theme toggle / close */}
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-foreground">Serdar Arıcı</span>
              <div className="flex items-center gap-1">
                <ThemeToggle />
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  aria-label={t('closeMenu')}
                  className="hover:bg-card p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <HiX className="w-6 h-6 text-muted hover:text-foreground" />
                </button>
              </div>
            </div>

            {/* Nav Items */}
            <ul className="flex flex-col gap-2 mt-10">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`
                        text-lg transition-colors block py-1 pl-2 border-l-2
                        ${isActive
                          ? "text-primary border-primary font-medium"
                          : "text-muted border-transparent hover:text-foreground hover:border-primary"
                        }
                      `}
                    >
                      {t(item.name)}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Social Icons */}
            <div className="flex gap-4 justify-center mt-5 pt-4 border-t border-border">
              <a
                href="https://github.com/serdararici"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:scale-110 transition-transform"
              >
                <SiGithub className="w-5 h-5 text-muted hover:text-foreground" />
              </a>
              <a
                href="https://linkedin.com/in/serdararici"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:scale-110 transition-transform"
              >
                <SiLinkedin className="w-5 h-5 text-muted hover:text-blue-400" />
              </a>
              <a
                href="mailto:serdararici3@gmail.com"
                aria-label="Gmail"
                className="hover:scale-110 transition-transform"
              >
                <SiGmail className="w-5 h-5 text-muted hover:text-red-400" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
