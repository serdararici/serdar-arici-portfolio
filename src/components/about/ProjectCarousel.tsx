"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useRef, useEffect, useState } from "react";
import { Project } from "@/types/types";
import { formatProjectDate } from "@/lib/utils";

interface ProjectCarouselProps {
  initialProjects: Project[];
}

const ProjectCarousel = ({ initialProjects }: ProjectCarouselProps) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Scroll navigation logic
  const scrollByCards = (direction: "next" | "prev") => {
    const container = sliderRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>("[data-card]");
    if (cards.length === 0) return;

    const first = cards[0];
    let step = first.getBoundingClientRect().width;

    if (cards.length > 1) {
      const second = cards[1];
      step = second.offsetLeft - first.offsetLeft;
    }

    const delta = direction === "next" ? step : -step;

    container.scrollBy({
      left: delta,
      behavior: "smooth",
    });
  };

  const getVisibleTechCount = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 640) return 5;
    if (window.innerWidth < 1024) return 4;
    return 3;
  };

  const [visibleTechs, setVisibleTechs] = useState(3);

  useEffect(() => {
    const update = () => setVisibleTechs(getVisibleTechCount());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ExternalLink className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
          </div>
          
          <Link 
            href="/projects" 
            className="group flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-all"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-6">
          <button
            type="button"
            onClick={() => scrollByCards("prev")}
            className="z-10 flex items-center justify-center rounded-full border border-primary/30 bg-card text-primary hover:bg-primary hover:text-white transition-all w-10 h-10 shadow-lg disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="overflow-hidden -mx-2 px-2">
            <div
              ref={sliderRef}
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {initialProjects.map((project) => (
                <div
                  key={project.slug}
                  data-card
                  className="shrink-0 snap-start transition-all duration-300
                             w-[calc(100%-40px)] 
                             sm:w-[calc(50%-16px)] 
                             lg:w-[calc(33.33%-20px)]"
                >
                  {/* Clickable Card Link */}
                  <Link href={`/projects/${project.slug}`} className="block h-full group">
                    <div className="h-full bg-card border border-gray-800 group-hover:border-primary/40 shadow-xl rounded-2xl overflow-hidden transition-all group-hover:scale-[1.01]">
                      {/* Project Visual Section */}
                      <figure className="relative w-full h-48 overflow-hidden">
                        <Image
                          src={project.image_url ?? "/image_not_found.jpg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-black/60 backdrop-blur-md text-primary border border-primary/30">
                            {project.category}
                          </span>
                        </div>
                      </figure>

                      {/* Project Information Body */}
                      <div className="card-body p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground truncate">
                            {project.title}
                          </h3>
                          <p className="text-xs font-medium text-gray-500 mt-1 uppercase tracking-wide">
                            {formatProjectDate(project.project_date)}
                          </p>
                        </div>

                        <p className="text-sm text-gray-400 line-clamp-3 min-h-18 leading-relaxed">
                          {project.short_description}
                        </p>

                        <div className="flex items-center gap-2 overflow-hidden flex-nowrap py-1">
                          {project.tech_stack.slice(0, visibleTechs).map((t) => (
                            <span
                              key={t}
                              className="shrink-0 px-2.5 py-1 text-[10px] font-medium rounded-md 
                                        border border-gray-800 text-gray-300 bg-gray-900/50"
                            >
                              {t}
                            </span>
                          ))}
                          {project.tech_stack.length > visibleTechs && (
                            <span className="text-xs text-gray-500">
                              +{project.tech_stack.length - visibleTechs}
                            </span>
                          )}
                        </div>

                        {/* Link buttons - Note: stopPropagation is handled by placing them outside main Link if needed, 
                            but in Next.js nested Links can be tricky. Here they are simple UI elements or separate triggers. */}
                        <div className="card-actions pt-2 flex gap-3 relative z-20">
                          {/* We use div instead of Link here if we want the whole card to be the main link, 
                              or keep them as is and user clicks will bubble up. */}
                          <div
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open(project.github_url ?? "#", "_blank");
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border border-gray-700 text-foreground hover:bg-white hover:text-black transition-all"
                          >
                            <SiGithub className="w-4 h-4" /> GitHub
                          </div>
                          
                          {project.live_url && (
                            <div
                              onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  window.open(project.live_url!, "_blank");
                              }}
                              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-primary text-white hover:opacity-90 transition-all shadow-lg"
                            >
                              <ExternalLink className="w-4 h-4" /> Live
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => scrollByCards("next")}
            className="z-10 flex items-center justify-center rounded-full border border-primary/30 bg-card text-primary hover:bg-primary hover:text-white transition-all w-10 h-10 shadow-lg disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectCarousel;