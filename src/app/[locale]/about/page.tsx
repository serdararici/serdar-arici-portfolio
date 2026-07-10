import type { Metadata } from "next";
import {
  getExperiences,
  getEducation,
  getSkills,
  getCertifications,
  getFeaturedProjects,
  getProfileContent,
} from "@/lib/queries";
import AboutHero from "@/components/about/AboutHero";
import ExperienceSection from "@/components/about/ExperienceSection";
import EducationSection from "@/components/about/EducationSection";
import SkillsSection from "@/components/about/SkillsSection";
import CertificationsSection from "@/components/about/CertificationsSection";
import ProjectCarousel from "@/components/about/ProjectCarousel";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://serdararici.vercel.app';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === 'tr';

  const title = isTr ? 'Hakkımda' : 'About Me';
  const description = isTr
    ? 'Serdar Arıcı hakkında — iş deneyimi, eğitim, teknik beceriler ve sertifikalar.'
    : 'About Serdar Arıcı — work experience, education, technical skills, and certifications.';

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title: `${title} | Serdar Arıcı`,
      description,
      url: `${BASE_URL}/${locale}/about`,
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

export default async function AboutPage() {
  const [experiences, education, skills, certifications, featuredProjects, profileContent] = await Promise.all([
    getExperiences(),
    getEducation(),
    getSkills(),
    getCertifications(),
    getFeaturedProjects(),
    getProfileContent(),
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <AboutHero profileContent={profileContent} />

      <div className="max-w-6xl mx-auto space-y-12 pb-10">
        <ExperienceSection experiences={experiences} />
        <EducationSection education={education} />
        <SkillsSection skills={skills} />
        <ProjectCarousel initialProjects={featuredProjects} />
        <CertificationsSection certifications={certifications} />
      </div>
    </div>
  );
}
