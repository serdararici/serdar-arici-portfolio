"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface BlogGalleryProps {
  gallery: string[];
  blogTitle: string;
}

const BlogGallery = ({ gallery, blogTitle }: BlogGalleryProps) => {
  const t = useTranslations('blogs.gallery');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const galleryItems = gallery.filter(Boolean);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpenedIndex = useRef<number | null>(null);

  const isOpen = currentIndex !== null;

  const openModal = (i: number) => {
    lastOpenedIndex.current = i;
    setCurrentIndex(i);
  };

  const closeModal = () => setCurrentIndex(null);

  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex(prev => prev !== null ? (prev + 1) % galleryItems.length : null);
  };

  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex(prev => prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : null);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => closeButtonRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    } else if (lastOpenedIndex.current !== null) {
      triggerRefs.current[lastOpenedIndex.current]?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentIndex(prev => prev !== null ? (prev + 1) % galleryItems.length : null);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex(prev => prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : null);
      } else if (e.key === "Escape") {
        setCurrentIndex(null);
      } else if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = Array.from(
          dialog.querySelectorAll<HTMLElement>('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, galleryItems.length]);

  if (galleryItems.length === 0) return null;

  return (
    <section className="mt-12 border-t border-border pt-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-foreground">{t('title')}</h3>
        <span className="text-sm text-muted">
          {galleryItems.length} {t('screenshots')}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((src, i) => (
          <motion.button
            key={i}
            type="button"
            ref={(el: HTMLButtonElement | null) => { triggerRefs.current[i] = el; }}
            whileHover={{ y: -5 }}
            onClick={() => openModal(i)}
            aria-label={`${blogTitle} ${t('screenshotAlt')} ${i + 1} – ${t('openImage')}`}
            className="group rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300 shadow-lg cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="relative w-full aspect-video">
              <Image
                src={src}
                alt={`${blogTitle} ${t('screenshotAlt')} ${i + 1}`}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {currentIndex !== null && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={t('dialogLabel')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 touch-none"
            onClick={closeModal}
          >
            <button
              ref={closeButtonRef}
              type="button"
              aria-label={t('close')}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110] p-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              onClick={closeModal}
            >
              <X className="w-8 h-8 md:w-10 md:h-10" />
            </button>

            <button
              type="button"
              aria-label={t('prevImage')}
              className="hidden md:flex absolute left-4 md:left-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all z-[110] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              onClick={showPrev}
            >
              <ArrowLeft className="w-8 h-8" />
            </button>

            <button
              type="button"
              aria-label={t('nextImage')}
              className="hidden md:flex absolute right-4 md:right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all z-[110] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              onClick={showNext}
            >
              <ArrowRight className="w-8 h-8" />
            </button>

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
                alt={`${blogTitle} ${t('screenshotAlt')} ${currentIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain pointer-events-none"
                priority
              />

              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <div className="text-white/70 text-sm font-medium">
                  {currentIndex + 1} / {galleryItems.length}
                </div>
                <div className="md:hidden text-[10px] text-white/40 uppercase tracking-widest animate-pulse">
                  {t('swipeHint')}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BlogGallery;
