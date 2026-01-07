import { 
  getExperiences, 
  getEducation, 
  getSkills, 
  getCertifications, 
  getFeaturedProjects 
} from "@/lib/queries";

import AboutHero from "@/components/about/AboutHero";
import ExperienceSection from "@/components/about/ExperienceSection";
import EducationSection from "@/components/about/EducationSection";
import SkillsSection from "@/components/about/SkillsSection";
import CertificationsSection from "@/components/about/CertificationsSection";
import ProjectCarousel from "@/components/about/ProjectCarousel";

// This is a Server Component
export default async function AboutPage() {
  // Fetch all data in parallel for high performance
  const [experiences, education, skills, certifications, featuredProjects] = await Promise.all([
    getExperiences(),
    getEducation(),
    getSkills(),
    getCertifications(),
    getFeaturedProjects(),
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* 1. Hero / Introduction */}
      <AboutHero />
      
      {/* Content wrapper with vertical spacing */}
      <div className="max-w-6xl mx-auto space-y-12 pb-10">
        
        {/* 2. Professional Experience */}
        <ExperienceSection experiences={experiences} />
        
        {/* 3. Education History */}
        <EducationSection education={education} />
        
        {/* 4. Technical Skills Grid */}
        <SkillsSection skills={skills} />
        
        {/* 5. Featured Projects Carousel */}
        <ProjectCarousel initialProjects={featuredProjects} />
        
        {/* 6. Professional Certifications */}
        <CertificationsSection certifications={certifications} />
        
      </div>
    </div>
  );
}