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
import ThemeProvider from "@/components/providers/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://serdararici.com';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Serdar Arıcı',
  jobTitle: 'Computer Engineer',
  url: BASE_URL,
  image: `${BASE_URL}/profile_ai.png`,
  sameAs: [
    'https://github.com/serdararici',
    'https://linkedin.com/in/serdararici',
    'https://www.kaggle.com/serdararici',
  ],
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === 'tr';

  const title = "Serdar Arıcı — Portfolio";
  const description = isTr
    ? "Serdar Arıcı'nın kişisel portfolio websitesi — Java, Spring Boot, React ve Next.js uzmanı Bilgisayar Mühendisi."
    : "Personal portfolio of Serdar Arıcı — Computer Engineer & Full-Stack Developer specializing in Java, Spring Boot, React, and Next.js.";

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: title,
      template: '%s | Serdar Arıcı',
    },
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        tr: `${BASE_URL}/tr`,
        en: `${BASE_URL}/en`,
      },
    },
    openGraph: {
      type: 'profile',
      firstName: 'Serdar',
      lastName: 'Arıcı',
      title,
      description,
      url: `${BASE_URL}/${locale}`,
      siteName: 'Serdar Arıcı',
      locale: isTr ? 'tr_TR' : 'en_US',
      images: [
        {
          url: '/profile_ai.png',
          width: 800,
          height: 800,
          alt: 'Serdar Arıcı',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/profile_ai.png'],
    },
    verification: {
      google: [
        '9THtHXL8nDvgDMVKtshNlPSHol1c76aKErwYwElfX78',
        'vyE4Xxk9wscZEm8TrOcq6PLcA2Nk2RSd_vyin04yfms',
      ],
    },
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body
        key={locale}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <ClientLayout>{children}</ClientLayout>
            <Analytics />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}