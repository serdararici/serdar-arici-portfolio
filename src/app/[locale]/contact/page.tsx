import type { Metadata } from "next";
import ContactClient from "@/components/contact/ContactClient";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://serdararici.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === 'tr';

  const title = isTr ? 'İletişim' : 'Contact';
  const description = isTr
    ? 'Serdar Arıcı ile iletişime geçin — yazılım mühendisliği alanında yeni fırsatlara açık.'
    : 'Get in touch with Serdar Arıcı — open to new opportunities in software engineering.';

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: {
        tr: `${BASE_URL}/tr/contact`,
        en: `${BASE_URL}/en/contact`,
      },
    },
    openGraph: {
      type: 'website',
      title: `${title} | Serdar Arıcı`,
      description,
      url: `${BASE_URL}/${locale}/contact`,
      images: [{ url: '/profile_ai.png', width: 800, height: 800, alt: 'Serdar Arıcı' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Serdar Arıcı`,
      description,
      images: ['/profile_ai.png'],
    },
  };
}

export default function ContactPage() {
  return <ContactClient />;
}
