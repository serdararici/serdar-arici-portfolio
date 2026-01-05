
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

