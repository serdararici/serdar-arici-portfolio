"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProjectGalleryProps {
  gallery: string[];
  projectTitle: string;
}

const ProjectGallery = ({ gallery, projectTitle }: ProjectGalleryProps) => {
  const t = useTranslations('projects.gallery');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const galleryItems = gallery.filter(Boolean);

  const showNext = (e?: React.MouseEvent | any) => {
    e?.stopPropagation();
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex + 1) % galleryItems.length);
    }
  };

  const showPrev = (e?: React.MouseEvent | any) => {
    e?.stopPropagation();
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (currentIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") setCurrentIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  if (galleryItems.length === 0) return null;

  return (
    <section className="mt-16 border-t border-gray-800 pt-12">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-white">{t('title')}</h3>
        <span className="text-sm text-gray-400">
          {galleryItems.length} {t('screenshots')}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((src, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            onClick={() => setCurrentIndex(i)}
            className="group rounded-2xl overflow-hidden border border-gray-800 bg-card hover:border-primary/50 transition-all duration-300 shadow-lg cursor-zoom-in"
          >
            <div className="relative w-full aspect-video">
              <Image
                src={src}
                alt={`${projectTitle} ${t('screenshotAlt')} ${i + 1}`}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {currentIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 touch-none"
            onClick={() => setCurrentIndex(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110] p-2"
              onClick={() => setCurrentIndex(null)}
            >
              <X className="w-8 h-8 md:w-10 md:h-10" />
            </button>

            {/* Navigation Buttons (Hidden on small touch devices, shown on desktop) */}
            <button
              className="hidden md:flex absolute left-4 md:left-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all z-[110]"
              onClick={showPrev}
            >
              <ArrowLeft className="w-8 h-8" />
            </button>

            <button
              className="hidden md:flex absolute right-4 md:right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all z-[110]"
              onClick={showNext}
            >
              <ArrowRight className="w-8 h-8" />
            </button>

            {/* Image Container with Swipe Support */}
            <motion.div
              key={currentIndex}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                const swipeThreshold = 50;
                if (info.offset.x > swipeThreshold) showPrev();
                else if (info.offset.x < -swipeThreshold) showNext();
              }}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              className="relative w-full h-full max-w-5xl max-h-[70vh] md:max-h-[80vh] cursor-grab active:cursor-grabbing"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryItems[currentIndex]}
                alt="Selected view"
                fill
                className="object-contain pointer-events-none"
                priority
              />
              
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <div className="text-gray-400 text-sm font-medium">
                  {currentIndex + 1} / {galleryItems.length}
                </div>
                {/* Visual hint for mobile */}
                <div className="md:hidden text-[10px] text-gray-600 uppercase tracking-widest animate-pulse">
                  {t('swipeHint') || 'Swipe to navigate'}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectGallery;