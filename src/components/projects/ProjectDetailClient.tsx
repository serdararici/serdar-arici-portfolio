// src/app/projects/[slug]/ProjectDetailClient.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink as ExtIcon } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project } from "@/types/types";

type Props = {
  project: Project & { gallery?: string[] };
};

export default function ProjectDetailClient({ project }: Props) {
  const gallery = project.gallery ?? [project.image_url];

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Back */}
        <div className="mb-6">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-primary transition">
            <ArrowLeft className="w-4 h-4 text-gray-300" />
            Back to Projects
          </Link>
        </div>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden mb-8">
          <div className="relative w-full h-112.5 rounded-2xl overflow-hidden shadow-lg border border-gray-800">
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Main */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left / Main Column */}
          <article className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>

            <section className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
              <h2 className="text-xl font-semibold mb-2">About Project</h2>
              <p>{project.description}</p>
            </section>

            {/* Additional sections placeholder (challenge/solution/implementation) */}
            {/* Use more subsections as needed */}
          </article>

          {/* Right Column (Sticky boxes) */}
          <aside className="space-y-6 sticky top-24 self-start">
            {/* Info box */}
            <div className="bg-card border border-gray-800 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Project Info</h3>

              <dl className="text-sm text-gray-300 space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Category</dt>
                  <dd>{project.category}</dd>
                </div>

                <div className="flex justify-between">
                  <dt className="text-gray-400">Date</dt>
                  <dd>{project.project_date}</dd>
                </div>
              </dl>

              <div className="mt-4 flex gap-3">
                {project.live_url ? (
                  <Link
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition"
                  >
                    <ExtIcon className="w-4 h-4" />
                    Live Demo
                  </Link>
                ) : null}

                {project.github_url ? (
                  <Link
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-700 text-sm text-foreground hover:bg-white hover:text-black transition"
                  >
                    <SiGithub className="w-4 h-4" />
                    GitHub
                  </Link>
                ) : null}
              </div>
            </div>

            {/* Technologies box */}
            <div className="bg-card border border-gray-800 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-gray-900/40 border border-gray-800 text-sm text-gray-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Gallery */}
        <section className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Project Gallery</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((src, i) => (
              <div key={i} className="rounded-lg overflow-hidden border border-gray-800 bg-card">
                <div className="relative w-full h-44">
                  <Image src={src} alt={`${project.title} - image ${i + 1}`} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
    </div>
  );
}