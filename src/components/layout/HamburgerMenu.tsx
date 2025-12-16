"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SiLinkedin, SiGithub, SiGmail, SiX } from "react-icons/si";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Me", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

export default function HamburgerMenu({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="flex-1 bg-black/50"
        onClick={onClose}
      />

      {/* Menu*/}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="w-3/4 max-w-xs bg-[#121212] p-6 flex flex-col justify-between"
      >
        {/* Close Button */}
        <div className="flex justify-end">
          <button onClick={onClose}>
            <SiX className="w-6 h-6 text-gray-300 hover:text-white" />
          </button>
        </div>

        {/* Menu Items */}
        <ul className="flex flex-col gap-6 mt-10">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose} 
                className="text-gray-300 hover:text-white text-lg"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="flex gap-4 justify-center mt-10">
          <a href="https://github.com/serdararici" target="_blank">
            <SiGithub  className="w-5 h-5 text-gray-400 hover:text-white" />
          </a>
          <a href="https://linkedin.com/in/serdar" target="_blank">
            <SiLinkedin className="w-5 h-5 text-gray-400 hover:text-white" />
          </a>
          <a href="mailto:serdararici3@gmail.com">
            <SiGmail className="w-5 h-5 text-gray-400 hover:text-white" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
