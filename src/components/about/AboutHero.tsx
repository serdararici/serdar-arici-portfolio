'use client';

import React from 'react';
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { MapPin } from "lucide-react";
import { FiEye } from "react-icons/fi";
import { useTranslations, useLocale } from "next-intl";
import type { ProfileContent } from "@/types/types";

type Props = {
  profileContent: ProfileContent | null;
};

const AboutHero = ({ profileContent }: Props) => {
  const t = useTranslations('about.hero');
  const locale = useLocale();

  const jobTitle = locale === 'tr'
    ? (profileContent?.job_title_tr || t('title'))
    : (profileContent?.job_title || t('title'));

  const cvHref = profileContent?.resume_url || "/Serdar_Arici_Resume.pdf";

  const rawDescription = locale === 'tr'
    ? (profileContent?.about_description_tr || null)
    : (profileContent?.about_description || null);

  const aboutParagraphs: string[] = rawDescription
    ? rawDescription.split(/\r?\n\r?\n/).map((p: string) => p.trim()).filter(Boolean)
    : [];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  } as Variants;

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  } as Variants;

  return (
    <section className="pt-24 pb-12 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

          <motion.div
            initial="hidden"
            animate="visible"
            variants={imageVariants}
            className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/50 shadow-2xl shrink-0"
          >
            <Image
              src="/profile_ai.png"
              alt="Serdar Arıcı"
              fill
              sizes="(max-width: 768px) 192px, 224px"
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.2 }}
            className="flex-1 text-center md:text-left"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-2 text-foreground"
            >
              Serdar Arıcı
            </motion.h1>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4"
            >
              <p className="text-xl md:text-2xl text-muted">
                {jobTitle}
              </p>

              <a
                href={cvHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2 text-sm sm:text-base font-semibold rounded-full bg-primary text-on-primary hover:bg-primary/80 transition duration-300 transform hover:scale-[1.05] shadow-xl"
              >
                <FiEye className="text-xl" /> {t('viewResume')}
              </a>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center md:justify-start gap-2 text-muted mb-6"
            >
              <MapPin className="w-5 h-5 text-primary" />
              <span>{t('location')}</span>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-2">
              {aboutParagraphs.length > 0 ? (
                <div className="space-y-4 max-w-2xl md:max-w-3xl">
                  {aboutParagraphs.map((para, i) => (
                    <p key={i} className="text-muted leading-relaxed">{para}</p>
                  ))}
                </div>
              ) : (
                <>
                  <p className="text-muted leading-relaxed max-w-2xl md:max-w-3xl">
                    {t.rich('description1', {
                      white: (chunks) => <span className="text-foreground">{chunks}</span>
                    })}
                  </p>
                  <p className="text-muted leading-relaxed max-w-2xl md:max-w-3xl mt-4">
                    {t('description2')}
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
