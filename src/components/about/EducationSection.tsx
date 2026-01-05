'use client';

import React from 'react';
import { motion, Variants } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react"; // Added MapPin icon
import { Education } from "@/types/types";
import { formatDate } from "@/lib/utils";

interface EducationSectionProps {
  education: Education[];
}

const EducationSection = ({ education }: EducationSectionProps) => {
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
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Title with Icon */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-10"
        >
          <GraduationCap className="w-7 h-7 text-primary" />
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Education History</h2>
        </motion.div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-8 top-0 w-0.5 bg-primary/30 origin-top"
          />

          {/* Education List Container */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            {education.map((item, index) => (
              <motion.div 
                key={item.id || index} 
                variants={itemVariants}
                className="relative pl-20"
              >
                {/* Timeline Connector Dot */}
                <div className="absolute left-6 top-2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 shadow-[0_0_10px_rgba(var(--primary),0.5)]"></div>
                
                {/* Education Card Content */}
                <div className="bg-card p-6 rounded-2xl border border-gray-800 hover:border-primary/40 hover:shadow-xl transition-all duration-300 group">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.degree ? `${item.degree} - ${item.department}` : item.title}
                      </h3>
                      
                      {/* University and Location Info */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <p className="text-primary font-medium text-lg">{item.institution}</p>
                        
                      </div>

                      {item.gpa && (
                         <span className="text-xs text-gray-400 block mt-2 font-mono uppercase tracking-widest">GPA: {item.gpa}</span>
                      )}
                    </div>
                    
                    {/* Date Formatting */}
                    <div className="text-gray-400 text-sm font-medium mt-3 md:mt-0 bg-gray-900/50 px-3 py-1 rounded-full border border-gray-800 h-fit">
                      {formatDate(item.start_date)} — {formatDate(item.end_date)}

                      {/* Location Section */}
                        {item.location && (
                          <div className="flex items-center gap-1 text-gray-500 text-sm italic mt-2">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{item.location}</span>
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Details List */}
                  {item.description && item.description.length > 0 && (
                    <ul className="list-disc list-inside space-y-2 text-gray-300 border-t border-gray-800/50 pt-4 mt-4">
                      {item.description.map((desc, i) => (
                        <li key={i} className="text-sm sm:text-base leading-relaxed pl-2 marker:text-primary">
                          {desc}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;