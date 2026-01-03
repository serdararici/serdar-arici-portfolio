import { LucideIcon } from "lucide-react";

export type Project = {
  id?: number; // Automatic ID from Supabase
  created_at?: string;
  title: string;
  slug: string;
  category: 'Backend' | 'Frontend' | 'Full-Stack' | 'Mobile' | 'Desktop' | 'System' | 'Other';
  description: string | null;
  short_description: string | null;
  tech_stack: string[];
  github_url?: string | null;
  live_url?: string | null;
  image_url: string | null;
  video_url?: string | null;
  project_date: string | null;
  is_featured: boolean; 
  gallery: string[] | null;
}

export type Experience = {
  title: string;
  company: string;
  period: string;
  description: string[];
};

export type Education = {
  title: string;
  institution: string;
  period: string;
  description: string[];
};

export type SkillCategory = {
  title: string;
  items: string[];
};

export type Certification = {
  title: string;
  issuer: string;
  month: string;
  year: string;
  credentialUrl: string;
  icon: LucideIcon;
};

