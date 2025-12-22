import { LucideIcon } from "lucide-react";

export type Project = {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
};

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
  year: string;
  icon: LucideIcon;
};

