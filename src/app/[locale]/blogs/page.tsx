"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Terminal, Code2, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing"; // Kendi Link'ini kullanıyoruz

const BlogsComingSoon = () => {
  const t = useTranslations('blogs');
  const tNav = useTranslations('navigation'); // Alt nav linkleri için

  return (
    <div className="min-h-[90vh] bg-background text-foreground flex flex-col items-center justify-center px-6 relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-primary)]/5 rounded-full blur-[120px] pointer-events-none" />

      <main className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 py-12">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold border border-[var(--color-primary)]/20 uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]"></span>
            </span>
            {t('comingSoon')}
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            {t('title')} <br />
            <span className="text-[var(--color-primary)]">{t('titleHighlight')}</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
            {t('description')}
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="relative max-w-md mx-auto lg:mx-0 group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-gray-500 group-focus-within:text-[var(--color-primary)] transition-colors" />
            </div>
            <input
              type="email"
              placeholder={t('inputPlaceholder')}
              className="w-full bg-[var(--color-card)] border border-gray-800 rounded-2xl py-4 pl-14 pr-36 focus:outline-none focus:border-[var(--color-primary)]/50 transition-all text-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-[var(--color-primary)] text-white px-6 rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-[var(--color-primary)]/20"
            >
              {t('notifyBtn')}
            </button>
          </form>
          
          <p className="text-xs text-gray-600 italic">{t('spamNote')}</p>
        </motion.div>

        {/* Sağ Taraf: Stil/Kod Bloğu (Değişmedi) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group"
        >
          <div className="relative rounded-[2.5rem] overflow-hidden border border-gray-800 bg-gray-900/50 backdrop-blur-sm shadow-2xl transition-transform duration-700 group-hover:rotate-1">
            <div className="absolute inset-0 opacity-20 font-mono text-[10px] p-6 text-blue-400 pointer-events-none select-none overflow-hidden">
              {`struct BlogEntry {
    title: String,
    content: Markdown,
    tags: Vec<String>,
}

impl Compiler for SerdarArıcı {
    fn compile_insights(&self) -> Result<Article, Error> {
        let insight = self.curate_experience()?;
        let draft = insight.refine_patterns();
        Ok(draft.publish())
    }
}
// Optimization in progress...`}
            </div>
            <div className="relative h-[400px] w-full flex items-center justify-center p-8">
              <div className="w-full max-w-[320px] bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                <div className="flex gap-1.5 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-3/4 bg-white/10 rounded-full animate-pulse" />
                  <div className="h-2 w-full bg-white/5 rounded-full" />
                  <div className="h-2 w-5/6 bg-white/5 rounded-full" />
                </div>
                <div className="mt-8 flex justify-between items-center">
                   <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-black" />
                      <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 border-2 border-black" />
                   </div>
                   <div className="w-12 h-2 bg-[var(--color-primary)]/20 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="mt-auto py-12 flex flex-col items-center gap-8 w-full border-t border-gray-900/50">
        <nav className="flex gap-8 text-sm font-medium text-gray-500">
          <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">{tNav('home')}</Link>
          <Link href="/projects" className="hover:text-[var(--color-primary)] transition-colors">{tNav('projects')}</Link>
          <Link href="/about" className="hover:text-[var(--color-primary)] transition-colors">{tNav('about')}</Link>
          <Link href="/blogs" className="text-[var(--color-primary)]">{tNav('blogs')}</Link>
          <Link href="/contact" className="hover:text-[var(--color-primary)] transition-colors">{tNav('contact')}</Link>
        </nav>
        
        <div className="flex gap-4">
          <button className="p-3 rounded-full bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-all">
            <Code2 className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-full bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-all">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        <p className="text-[10px] text-gray-700 uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} Serdar Arıcı. {t('footerNote')}
        </p>
      </footer>
    </div>
  );
};

export default BlogsComingSoon;