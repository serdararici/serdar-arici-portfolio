import type { Metadata } from "next";
import BlogsComingSoon from "@/components/blogs/BlogsComingSoon";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://serdararici.vercel.app';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === 'tr';

  const title = isTr ? 'Blog' : 'Blog';
  const description = isTr
    ? 'Yazılım mimarisi, sistem tasarımı ve mühendislik içgörüleri üzerine blog — yakında.'
    : "Serdar Arıcı's blog on software architecture, system design, and engineering insights — coming soon.";

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title: `${title} | Serdar Arıcı`,
      description,
      url: `${BASE_URL}/${locale}/blogs`,
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

export default function BlogsPage() {
  return <BlogsComingSoon />;
}
