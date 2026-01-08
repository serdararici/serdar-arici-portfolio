"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Link } from '@/i18n/routing';
import { SiLinkedin, SiGithub, SiGmail } from "react-icons/si";
import { HiX } from "react-icons/hi";
import { useTranslations } from "next-intl";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const navItems = [
  { name: "home", href: "/" },
  { name: "about", href: "/about" },
  { name: "projects", href: "/projects" },
  { name: "blogs", href: "/blogs" },
  { name: "contact", href: "/contact" },
];

export default function HamburgerMenu({ isOpen, onClose }: Props) {
  const t = useTranslations('navigation');
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black h-screen opacity-70"
          onClick={onClose}
        />

          {/* Menu */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="absolute top-0 right-0 w-3/4 max-w-xs bg-background p-4 border-l border-gray-700 shadow-2xl"
          >
            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="hover:bg-gray-800 p-2 rounded-full transition-colors"
              >
                <HiX className="w-6 h-6 text-gray-300 hover:text-white" />
              </button>
            </div>

            {/* Menu Items */}
            <ul className="flex flex-col gap-2 mt-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="text-gray-300 hover:text-white text-lg transition-colors block py-1 hover:pl-2 hover:border-l-2 hover:border-blue-500"
                  >
                    {t(item.name)}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Icons */}
            <div className="flex gap-4 justify-center mt-5 pt-4 border-t border-gray-700">
              <a
                href="https://github.com/serdararici"
                target="_blank"
                className="hover:scale-110 transition-transform"
              >
                <SiGithub className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
              <a
                href="https://linkedin.com/in/serdar"
                target="_blank"
                className="hover:scale-110 transition-transform"
              >
                <SiLinkedin className="w-5 h-5 text-gray-400 hover:text-blue-400" />
              </a>
              <a
                href="mailto:serdararici3@gmail.com"
                className="hover:scale-110 transition-transform"
              >
                <SiGmail className="w-5 h-5 text-gray-400 hover:text-red-400" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}