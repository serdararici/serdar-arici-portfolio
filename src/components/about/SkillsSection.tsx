'use client';

import React from 'react';
import { motion, Variants } from "framer-motion";
import { Code } from "lucide-react";
import { Skill } from "@/types/types";
import { useTranslations } from "next-intl";

interface SkillsSectionProps {
  skills: Skill[];
}

const SkillsSection = ({ skills }: SkillsSectionProps) => {
  const t = useTranslations('about.skills');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  } as Variants;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  } as Variants;

  return (
    <section className="py-6 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-10"
        >
          <Code className="w-7 h-7 text-primary" />
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            {t('title')}
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-8 px-2 sm:px-4"
        >
          {skills.map((group) => (
            <motion.div 
              key={group.id || group.title}
              variants={cardVariants}
              className="group"
            >
              <h3 className="text-sm font-semibold text-gray-500 mb-5 uppercase tracking-[0.2em] group-hover:text-primary transition-colors duration-300">
                {group.title}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {group.items.map((item, idx) => (
                  <motion.span
                    key={idx}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-card border border-gray-800 rounded-xl text-sm font-medium text-gray-300 
                               hover:border-primary/50 hover:text-white hover:shadow-[0_0_15px_rgba(var(--primary),0.1)] 
                               transition-all duration-300 cursor-default"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;