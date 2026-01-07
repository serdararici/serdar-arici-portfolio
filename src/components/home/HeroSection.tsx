'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion'; // Animation engine
import { BsPerson } from 'react-icons/bs';
import { FiEye } from 'react-icons/fi';
import { SiLinkedin, SiGithub, SiGmail } from "react-icons/si"; 
import TypewriterText from "@/components/ui/TypewriterText";
import { useTranslations } from 'next-intl';

// Resume file path in the public folder
const CV_HREF = "/Serdar_Arici_Resume.pdf"; 


/**
 * Background decoration with animated glowing orbs
 */
const BackgroundEffect = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    {/* Left top glowing orb */}
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3] 
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full mix-blend-lighten filter blur-3xl"
    />
    {/* Right bottom glowing orb */}
    <motion.div 
      animate={{ 
        scale: [1.2, 1, 1.2],
        opacity: [0.3, 0.5, 0.3] 
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/20 rounded-full mix-blend-lighten filter blur-3xl"
    />
  </div>
);

const HeroSection = () => {
  const t = useTranslations('home');
  const name = "Serdar Arıcı";
  const title = t('hero.title');
  const shortDescription = t('hero.shortDescription');

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each child's animation
      }
    }
  } as Variants;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  } as Variants;

  // Social Media Links
  const socialLinks = [
    { icon: SiGithub, href: "https://github.com/serdararici", label: "GitHub" },
    { icon: SiLinkedin, href: "https://linkedin.com/in/serdararici", label: "LinkedIn" },
    { icon: SiGmail, href: "mailto:serdararici3@gmail.com", label: "Email" },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-6rem)] text-foreground px-6 py-6 overflow-hidden">
      {/* 1. Dynamic Background Decoration */}
      <BackgroundEffect />

      {/* 2. Main Content Wrapper */}
      <motion.div 
        className="relative z-10 text-center max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* 3. Profile Image with hover and entrance effects */}
        <motion.div 
          variants={itemVariants}
          className="mb-2 relative mx-auto w-40 h-40 sm:w-52 sm:h-52 rounded-full p-1 bg-gradient-to-tr from-primary to-secondary/40 shadow-2xl transition-all duration-500 hover:scale-105"
        >
          <div className="relative w-full h-full rounded-full overflow-hidden bg-background">
            <Image
              src="/profile_ai.png"
              alt="Serdar Arıcı"
              fill 
              className="object-cover"
              priority 
            />
          </div>
        </motion.div>

        {/* 4. Name & Professional Title */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl sm:text-7xl font-extrabold mb-2 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent tracking-tight"
        >
          {name}
        </motion.h1>
        
        <motion.div 
          variants={itemVariants}
          className="text-xl sm:text-2xl mb-6 font-medium tracking-wide min-h-[1.5em] flex justify-center items-center" 
        >
          <TypewriterText key={title} text={title} delay={1} />
        </motion.div>

        {/* 5. About Summary */}
        <motion.p 
          variants={itemVariants}
          className="text-sm sm:text-base text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed font-light"
        >
          {shortDescription}
        </motion.p>

        {/* 6. Call To Action Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6"
        >
          <Link
            href="/about"
            className="group flex items-center justify-center gap-2 px-8 py-3 w-full sm:w-auto font-semibold rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_-5px_rgba(var(--primary),0.4)] active:scale-95"
          >
            <BsPerson className="text-xl group-hover:scale-110 transition-transform" /> About Me
          </Link>

          <a 
            href={CV_HREF} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex items-center justify-center gap-2 px-8 py-3 w-full sm:w-auto font-semibold rounded-full bg-transparent border border-gray-700 text-gray-300 hover:border-primary hover:text-white transition-all duration-300 active:scale-95"
          >
            <FiEye className="text-xl group-hover:scale-110 transition-transform" /> View Resume
          </a>
        </motion.div>

        {/* 7. Social Connection Links */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center gap-5 mt-2"
        >
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              title={item.label}
              className="p-3 border border-gray-800 rounded-full text-gray-500 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:-translate-y-1"
            >
              <item.icon className="text-xl" />
            </a>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
};

export default HeroSection;