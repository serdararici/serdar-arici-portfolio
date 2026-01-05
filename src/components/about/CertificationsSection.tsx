'use client';

import React from 'react';
import { motion, Variants } from "framer-motion"; // Scroll animations
import { Award, ExternalLink } from "lucide-react";
import { Certification } from "@/types/types";
import { formatDate } from "@/lib/utils";

interface CertificationsSectionProps {
  certifications: Certification[];
}

const CertificationsSection = ({ certifications }: CertificationsSectionProps) => {

  // Variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
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
    <section className="py-12 px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-10"
        >
          <Award className="w-7 h-7 text-primary" />
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Certifications</h2>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          {certifications.map((cert) => (
            <motion.a
              key={cert.id}
              href={cert.credential_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              className="group relative bg-card border border-gray-800 rounded-2xl p-6 hover:border-primary/50 hover:bg-primary/[0.02] transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                {/* Icon Decoration */}
                <div className="shrink-0 p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Award className="w-6 h-6 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate pr-4">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-gray-400 font-medium mt-0.5">{cert.issuer}</p>
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                        Issued {formatDate(cert.issue_date)}
                        </p>
                    </div>
                    {cert.credential_url && (
                      <ExternalLink className="shrink-0 w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
                    )}
                  </div>

                  {/* Skills tags associated with the certification */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {cert.skills.slice(0, 4).map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 bg-gray-900 border border-gray-800 text-gray-400 rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 4 && (
                        <span className="text-[10px] text-gray-600">+{cert.skills.length - 4} more</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;