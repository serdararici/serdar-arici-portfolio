"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ExternalLink as ExtIcon, Play, X } from "lucide-react";
import { SiGithub, SiYoutube } from "react-icons/si";
import type { Project } from "@/types/types";
import { formatProjectDate } from "@/lib/utils";
import ProjectGallery from "./ProjectGallery";

type Props = {
  project: Project; // We use our main Project type
};

export default function ProjectDetailClient({ project }: Props) {

  // Use gallery array if exists, otherwise fallback to main image_url
  const gallery = (project.gallery && project.gallery.length > 0) 
    ? project.gallery 
    : (project.image_url ? [project.image_url] : []);

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Navigation Back */}
          <div className="mb-4">
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition">
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </div>

          {/* Hero Image Section */}
          <div className="max-w-4xl mx-auto mb-12"> 
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
              <div className="relative w-full h-64 md:h-112.5">
                <Image
                  src={project.image_url ?? "/image_not_found.jpg"}
                  alt={project.title}
                  fill
                  className="object-aspectratio object-center"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Project Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content Column */}
            <article className="lg:col-span-2 space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                {project.title}
              </h1>
              
              <section className="max-w-none">
                <h2 className="text-2xl font-semibold text-primary mb-4 border-b border-gray-800 pb-2">
                  About Project
                </h2>
                <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                  {project.description || "No description provided."}
                </div>
              </section>
            </article>

            {/* Sidebar Column */}
            <aside className="space-y-6 sticky top-24 self-start">
              {/* Project Info Box */}
              <div className="bg-card border border-gray-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Project Details</h3>

                <dl className="space-y-4">
                  <div className="flex justify-between items-center">
                    <dt className="text-gray-400 text-sm">Category</dt>
                    <dd className="text-white font-medium px-3 py-1 bg-gray-900 rounded-full text-xs">
                      {project.category}
                    </dd>
                  </div>

                  <div className="flex justify-between items-center">
                    <dt className="text-gray-400 text-sm">Completed</dt>
                    <dd className="text-gray-200 font-medium">
                      {formatProjectDate(project.project_date)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-8 flex flex-col gap-3">
                  {project.live_url && (
                    <Link
                      href={project.live_url}
                      target="_blank"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-white font-bold hover:opacity-90 transition shadow-lg shadow-primary/20"
                    >
                      <ExtIcon className="w-4 h-4" />
                      Live Preview
                    </Link>
                  )}

                  {/* YouTube Video Button - */}
                  {project.video_url && (
                    <Link
                      href={project.video_url}
                      target="_blank"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#FF0000] text-white font-bold hover:bg-[#CC0000] transition shadow-lg shadow-red-900/20"
                    >
                      <SiYoutube className="w-4 h-4 fill-current" />
                      Watch Demo
                    </Link>
                  )}

                  {project.github_url && (
                    <Link
                      href={project.github_url}
                      target="_blank"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-700 text-white font-bold hover:bg-white hover:text-black transition"
                    >
                      <SiGithub className="w-4 h-4" />
                      View Source
                    </Link>
                  )}

                </div>
              </div>

              {/* Stack Box */}
              <div className="bg-card border border-gray-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((t) => (
                    <span key={t} className="px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-sm text-gray-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Project Gallery Section */}
          <ProjectGallery 
            gallery={gallery} 
            projectTitle={project.title} 
          />
          
        </div>
      </motion.div>
    </div>
  );
}