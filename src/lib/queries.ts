import { supabase } from './supabase'; // Your supabase client initialization
import { Experience, Education, Skill, Certification, Project } from '@/types/types';

/**
 * Fetch all experience records ordered by start date (newest first)
 */
export async function getExperiences(): Promise<Experience[]> {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('start_date', { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}

/**
 * Fetch all education records
 */
export async function getEducation(): Promise<Education[]> {
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .order('start_date', { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}

/**
 * Fetch all skills ordered by their manual display order
 */
export async function getSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) throw new Error(error.message);
  return data || [];
}

/**
 * Fetch all certifications ordered by issue date
 */
export async function getCertifications(): Promise<Certification[]> {
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .order('issue_date', { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}

/**
 * Fetch featured projects for the carousel
 * Sorted by: 1. order_index (Manual Priority) 2. project_date (Recency)
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_featured', true)
    // First it looks at the order you provided (Smaller number = Higher priority)
    .order('order_index', { ascending: true }) 
    // If the order is the same or not provided, it sorts by the most recent date
    .order('project_date', { ascending: false });

  if (error) {
    console.error("Error fetching featured projects:", error.message);
    return [];
  }
  return data || [];
}