'use client';

import React from 'react';
import { motion, Variants } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { Experience } from "@/types/types";
import { formatDate } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  const t = useTranslations('about.experience');
  const locale = useLocale();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  } as Variants;

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  } as Variants;

  return (
    <section className="py-6 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-10"
        >
          <Briefcase className="w-7 h-7 text-primary" />
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            {t('title')}
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-8 top-0 w-0.5 bg-primary/30 origin-top"
          />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            {experiences.map((item, index) => (
              <motion.div 
                key={item.id || index} 
                variants={itemVariants}
                className="relative pl-20"
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 top-2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                
                {/* Experience Card */}
                <div className="bg-card p-6 rounded-2xl border border-gray-800 hover:border-primary/40 hover:shadow-xl transition-all duration-300 group">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground transition-colors">
                        {item.position}
                      </h3>
                      <p className="text-primary font-medium text-lg mt-1">{item.company_name}</p>
                    </div>
                    
                    <div className='flex flex-col md:items-end md:text-right'>
                      {/* Localized Dates */}
                      <div className="text-gray-400 text-sm font-medium mt-2 md:mt-0 bg-gray-900/50 px-3 py-1 rounded-full border border-gray-800">
                        {formatDate(item.start_date, locale, t('present'))} — {formatDate(item.end_date, locale, t('present'))}
                      </div>
                      
                      {item.location && (
                        <div className="flex items-center gap-1 text-gray-500 text-sm italic mt-2 mr-3">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{item.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Accomplishments / Descriptions */}
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {item.description.map((desc, i) => (
                      <li key={i} className="text-sm sm:text-base leading-relaxed pl-2 marker:text-primary">
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;