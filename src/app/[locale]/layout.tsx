import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClientLayout from "@/components/layout/ClientLayout";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    tr: "Serdar Arıcı - Portfolio",
    en: "Serdar Arıcı - Portfolio"
  };
  
  const descriptions = {
    tr: "Serdar Arıcı'nın kişisel portfolio websitesi",
    en: "Personal portfolio website of Serdar Arıcı"
  };

  return {
    title: titles[locale as 'tr' | 'en'],
    description: descriptions[locale as 'tr' | 'en'],
  };
}

// Next.js 16 için gerekli - static params üret
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Next.js 16'da params artık Promise döndürüyor
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Manuel import - getMessages() kullanma
  let messages;
  if (locale === 'tr') {
    messages = (await import('@/messages/tr.json')).default;
  } else {
    messages = (await import('@/messages/en.json')).default;
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        key={locale}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientLayout>{children}</ClientLayout>
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}