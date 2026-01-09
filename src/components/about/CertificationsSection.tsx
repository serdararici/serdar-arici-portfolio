'use client';

import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from "framer-motion"; 
import { Award, ChevronDown, ChevronUp, ArrowUpRight } from "lucide-react";
import { Certification } from "@/types/types";
import { formatDate, getLocalized } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";

interface CertificationsSectionProps {
  certifications: Certification[];
}

const CertificationsSection = ({ certifications }: CertificationsSectionProps) => {
  const t = useTranslations('about.certifications');
  const locale = useLocale();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const initialCount = 6;
  const displayedCerts = isExpanded ? certifications : certifications.slice(0, initialCount);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  } as Variants;

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: "easeOut" } 
    }
  } as Variants;

  return (
    <section className="py-12 px-4 sm:px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10"
        >
          <div className="flex items-center gap-3">
            <Award className="w-7 h-7 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              {t('title')}
            </h2>
          </div>
          <span className="text-[10px] sm:text-xs font-mono text-gray-500 uppercase tracking-widest">
            [{certifications.length} {t('unit')}]
          </span>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {displayedCerts.map((cert) => {
              const currentTitle = getLocalized(cert, 'title', locale);
              const currentSkills = getLocalized(cert, 'skills', locale);

              return (
                <motion.a
                  key={cert.id}
                  layout
                  href={cert.credential_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative bg-card border border-gray-800 rounded-2xl p-4 sm:p-6 hover:border-primary/50 hover:bg-primary/2 transition-all duration-300"
                >
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>

                  <div className="flex items-start gap-3 sm:gap-5">
                    <div className="shrink-0 p-2 sm:p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate pr-6">
                            {currentTitle}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-400 font-medium mt-0.5">{cert.issuer}</p>
                          <p className="text-[10px] sm:text-xs text-gray-500 mt-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                            {t('issued')} {formatDate(cert.issue_date, locale)}
                          </p>
                        </div>
                      </div>

                      {currentSkills && currentSkills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4">
                          {currentSkills.slice(0, 3).map((skill: string, idx: number) => (
                            <span 
                              key={idx} 
                              className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold px-1.5 sm:px-2 py-0.5 bg-gray-900 border border-gray-800 text-gray-400 rounded-md group-hover:border-primary/30 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                          {currentSkills.length > 3 && (
                            <span className="text-[9px] sm:text-[10px] text-gray-600">+{currentSkills.length - 3}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {certifications.length > initialCount && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 flex justify-center"
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group flex items-center gap-2 px-8 py-2.5 sm:px-10 sm:py-3 bg-transparent hover:bg-primary/5 text-gray-400 hover:text-primary text-sm sm:text-base font-bold rounded-full border border-gray-800 hover:border-primary/50 transition-all duration-300 active:scale-95"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4" /> {t('showLess')}
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" /> {t('showMore')} ({certifications.length - initialCount})
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CertificationsSection;