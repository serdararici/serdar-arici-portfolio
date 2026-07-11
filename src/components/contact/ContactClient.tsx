"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Send, MapPin, ArrowUpRight, ArrowRight } from "lucide-react";
import { SiLinkedin, SiGithub } from "react-icons/si";
import { Link } from '@/i18n/routing';
import { sendEmail } from "@/app/actions/sendEmail";
import { useTranslations } from "next-intl";

const ContactClient = () => {
  const t = useTranslations('contact');
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{success?: boolean; error?: string} | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSending(true);
    setStatus(null);
    const result = await sendEmail(formData);
    setIsSending(false);
    setStatus(result);
    if (result.success) (document.getElementById('contact-form') as HTMLFormElement).reset();
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 uppercase">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                {t('badge')}
              </div>
              {/* Madde 6: kademeli responsive boyut */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
              </h1>
              {/* Madde 9: text-md → text-base */}
              <p className="text-muted text-base max-w-lg">
                {t('description')}
              </p>
            </div>

            {/* Madde 8: mt-5 kaldırıldı - parent space-y-8 yönetiyor */}
            <form id="contact-form" action={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px' }}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  {/* Madde 4: htmlFor + id */}
                  <label htmlFor="field-name" className="text-sm font-medium text-muted ml-1">{t('form.name')}</label>
                  {/* Madde 11: focus: → focus-visible: */}
                  <input
                    id="field-name"
                    name="name"
                    required
                    placeholder={t('form.namePlaceholder')}
                    className="w-full bg-card/50 border border-border rounded-2xl py-4 px-6 focus-visible:outline-none focus-visible:border-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="field-email" className="text-sm font-medium text-muted ml-1">{t('form.email')}</label>
                  <input
                    id="field-email"
                    name="email"
                    type="email"
                    required
                    placeholder={t('form.emailPlaceholder')}
                    className="w-full bg-card/50 border border-border rounded-2xl py-4 px-6 focus-visible:outline-none focus-visible:border-primary/50 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="field-message" className="text-sm font-medium text-muted ml-1">{t('form.message')}</label>
                <textarea
                  id="field-message"
                  name="message"
                  required
                  rows={5}
                  placeholder={t('form.messagePlaceholder')}
                  className="w-full bg-card/50 border border-border rounded-2xl py-4 px-6 focus-visible:outline-none focus-visible:border-primary/50 transition-all resize-none"
                />
              </div>

              <button
                disabled={isSending}
                className="group inline-flex items-center gap-3 bg-primary text-on-primary px-8 py-4 rounded-full font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                {isSending ? t('form.sending') : t('form.send')}
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              {/* Madde 5: aria-live container — screen reader'lar sonucu duyurur
                  Madde 3: tema-duyarlı renk (light: 600, dark: 400)
                  Madde 13: başarıda projeler linki */}
              <div aria-live="assertive" aria-atomic="true">
                {status?.success && (
                  <div className="space-y-2">
                    <p className="text-green-600 dark:text-green-400 font-medium">{t('form.success')}</p>
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      {t('form.successCta')}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
                {status?.error && (
                  <p className="text-red-600 dark:text-red-400 font-medium">{t('form.error')}</p>
                )}
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Madde 1: mt-20 → lg:mt-20 (mobilde boşluk yoktur) */}
            <div className="bg-card/30 border border-border rounded-[2.5rem] p-8 lg:mt-20 space-y-6">
              <h3 className="text-xl font-bold">{t('info.connect')}</h3>
              <div className="space-y-4">
                <ContactLink icon={<Mail className="w-5 h-5" />} label="EMAIL" value="serdararici3@gmail.com" href="mailto:serdararici3@gmail.com" />
                <ContactLink icon={<SiGithub className="w-5 h-5" />} label="GITHUB" value="@serdararici" href="https://github.com/serdararici" />
                <ContactLink icon={<SiLinkedin className="w-5 h-5" />} label="LINKEDIN" value="Serdar Arıcı" href="https://linkedin.com/in/serdararici" />
              </div>
            </div>

            <div className="relative group rounded-[2.5rem] overflow-hidden border border-border aspect-video">
              <div className="absolute inset-0 bg-black/60 z-10" />
              {/* Madde 12: <img> → <Image> with fill for CLS prevention */}
              <Image
                src="/earth-global.jpg"
                alt="Sakarya, Türkiye"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute bottom-8 left-8 z-20 space-y-1">
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest">
                  <MapPin className="w-3 h-3" />
                  {t('info.location')}
                </div>
                <h4 className="text-2xl font-bold text-white">{t('info.city')}</h4>
                <p className="text-xs text-white/70">{t('info.availability')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ContactLink = ({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 rounded-2xl bg-card hover:bg-card/70 border border-border/50 hover:border-border transition-all group">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-card rounded-xl text-primary group-hover:text-foreground transition-colors">{icon}</div>
      <div>
        {/* Madde 10: text-[10px] → text-xs */}
        <p className="text-xs text-muted font-bold uppercase tracking-widest">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
    <ArrowUpRight className="w-4 h-4 text-faint group-hover:text-primary transition-colors" />
  </a>
);

export default ContactClient;
