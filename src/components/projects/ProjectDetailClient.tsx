"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink as ExtIcon } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project } from "@/types/types";
import { formatProjectDate } from "@/lib/utils";

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
          <div className="mb-6">
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition">
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </div>

          {/* Hero Image Section */}
          <div className="rounded-2xl overflow-hidden mb-12 shadow-2xl border border-gray-800">
            <div className="relative w-full h-75 md:h-125">
              <Image
                src={project.image_url ?? "/image_not_found.jpg"}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Project Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content Column */}
            <article className="lg:col-span-2 space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                {project.title}
              </h1>

              <section className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-semibold text-primary mb-4">About Project</h2>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                  {project.description}
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
          <section className="mt-20">
            <h3 className="text-2xl font-bold mb-8 text-white">Project Gallery</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((src, i) => (
                // check if src is valid
                src && (
                  <div key={i} className="group rounded-2xl overflow-hidden border border-gray-800 bg-card hover:border-primary/50 transition-all duration-300 shadow-lg">
                    <div className="relative w-full h-56">
                      <Image 
                        src={src} 
                        alt={`${project.title} screenshot ${i + 1}`} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-110" 
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                )
              ))}
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}