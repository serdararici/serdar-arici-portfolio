"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, MapPin, ArrowUpRight } from "lucide-react";
import { SiLinkedin, SiGithub } from "react-icons/si";
import { sendEmail } from "../../actions/sendEmail";
import { useTranslations } from "next-intl";

const ContactPage = () => {
  const t = useTranslations('contact');
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{success?: boolean; error?: string} | null>(null);

  // Handle form submission using Server Action
  async function handleSubmit(formData: FormData) {
    setIsSending(true);
    setStatus(null);
    const result = await sendEmail(formData);
    setIsSending(false);
    setStatus(result);
    if(result.success) (document.getElementById('contact-form') as HTMLFormElement).reset();
  }

  return (
    <div className="min-h-screen bg-background text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Side: Contact Form */}
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
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
              </h1>
              <p className="text-gray-400 text-md max-w-lg">
                {t('description')}
              </p>
            </div>

            <form id="contact-form" action={handleSubmit} className="mt-5 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-1">{t('form.name')}</label>
                  <input
                    name="name"
                    required
                    placeholder={t('form.namePlaceholder')}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-1">{t('form.email')}</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder={t('form.emailPlaceholder')}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">{t('form.message')}</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder={t('form.messagePlaceholder')}
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/50 transition-all resize-none"
                />
              </div>

              <button
                disabled={isSending}
                className="group inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                {isSending ? t('form.sending') : t('form.send')}
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              {status?.success && <p className="text-green-400 font-medium">{t('form.success')}</p>}
              {status?.error && <p className="text-red-400 font-medium">{t('form.error')}</p>}
            </form>
          </motion.div>

          {/* Right Side: Contact Info Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-gray-900/30 border border-gray-800 rounded-[2.5rem] p-8 mt-20 space-y-6">
              <h3 className="text-xl font-bold">{t('info.connect')}</h3>
              <div className="space-y-4">
                <ContactLink icon={<Mail className="w-5 h-5" />} label="EMAIL" value="serdararici3@gmail.com" href="mailto:serdararici3@gmail.com" />
                <ContactLink icon={<SiGithub className="w-5 h-5" />} label="GITHUB" value="@serdararici" href="https://github.com/serdararici" />
                <ContactLink icon={<SiLinkedin className="w-5 h-5" />} label="LINKEDIN" value="Serdar Arıcı" href="https://www.linkedin.com/in/serdar-ar%C4%B1c%C4%B1-9827981a3/" />
              </div>
            </div>

            <div className="relative group rounded-[2.5rem] overflow-hidden border border-gray-800 aspect-video">
              <div className="absolute inset-0 bg-black/40 z-10" />
              <img 
                src="/istanbul-view.jpg" 
                alt="Istanbul, TR"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-8 left-8 z-20 space-y-1">
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest">
                  <MapPin className="w-3 h-3" />
                  {t('info.location')}
                </div>
                <h4 className="text-2xl font-bold">{t('info.city')}</h4>
                <p className="text-xs text-gray-400">UTC+3</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ContactLink = ({ icon, label, value, href }: { icon: any, label: string, value: string, href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 rounded-2xl bg-gray-800/30 border border-transparent hover:border-gray-700 hover:bg-gray-800/50 transition-all group">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-gray-900 rounded-xl text-primary group-hover:text-white transition-colors">{icon}</div>
      <div>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
    <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
  </a>
);

export default ContactPage;