
export type Project = {
  id?: number; // Automatic ID from Supabase
  created_at?: string;
  title: string;
  slug: string;
  category: 'Backend' | 'Frontend' | 'Full-Stack' | 'Mobile' | 'Desktop' | 'System' | 'AI/ML' | 'Academic' | 'Other';
  description: string | null;
  short_description: string | null;
  tech_stack: string[];
  github_url?: string | null;
  live_url?: string | null;
  image_url: string | null;
  video_url?: string | null;
  document_url?: string | null;
  project_date?: string | null;
  is_featured?: boolean;
  gallery?: string[] | null;
}

export type Experience = {
  id: number;
  company_name: string;
  position: string;
  description: string[];
  start_date: string;
  end_date: string | null;
  logo_url?: string;
  location?: string;
};

export type Education = {
  id: number;
  title: string;
  institution: string;
  description: string[];
  degree?: string;
  department?: string;
  gpa?: string;
  location?: string;
  start_date: string;
  end_date: string | null;
};

export type Skill = {
  id: number;
  title: string;
  items: string[];
  order_index: number;
};

export type Certification = {
  id: number;
  title: string;
  issuer: string;
  issue_date: string;
  credential_id?: string;
  credential_url?: string;
  media_url?: string;
  skills: string[];
};

export type Blog = {
  id?: number;
  slug: string;
  title: string;
  title_tr?: string | null;
  summary?: string | null;
  summary_tr?: string | null;
  content?: string | null;
  content_tr?: string | null;
  external_url?: string | null;
  medium_url?: string | null;
  github_url?: string | null;
  youtube_url?: string | null;
  kaggle_url?: string | null;
  cover_image_url?: string | null;
  gallery?: string[] | null;
  documents?: { title: string; title_tr?: string; url: string }[] | null;
  category: 'Blog' | 'Academic' | 'Notes' | 'Study' | 'Other';
  is_featured?: boolean;
  published_date?: string | null;
  other_url?: string | null;
  other_url_label?: string | null;
};

export type ProfileContent = {
  id: number;
  job_title: string;
  job_title_tr?: string | null;
  home_short_description?: string | null;
  home_short_description_tr?: string | null;
  about_description?: string | null;
  about_description_tr?: string | null;
  resume_url?: string | null;
};

