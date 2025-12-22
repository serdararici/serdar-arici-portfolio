import Image from "next/image";
import {
  Briefcase,
  GraduationCap,
  Code,
  Award,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { experiences, education, skills, certifications } from "@/data/aboutData";

const About = () => {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Picture */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[var(--color-primary)]/50 shadow-2xl flex-shrink-0">
              <Image
                src="/profile_ai.png"
                alt="Serdar Arıcı"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Info Section */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Serdar Arıcı</h1>
              <p className="text-xl md:text-2xl text-gray-400 mb-4">Computer Engineer | Full-Stack Developer</p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-300 mb-6">
                <MapPin className="w-5 h-5" />
                <span>Sakarya, Türkiye</span>
              </div>
              <p className="text-gray-300 leading-relaxed max-w-2xl">
                I am passionate about building scalable and efficient software solutions. 
                With a background in computer engineering and full-stack development, I focus on 
                creating clean, maintainable code that solves real-world problems. I specialize in 
                backend development with Java, Kotlin, and Golang, as well as frontend development 
                with React and Next.js. I'm always eager to learn new technologies and contribute 
                to innovative projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="w-6 h-6 text-[var(--color-primary)]" />
            <h2 className="text-3xl font-bold">Work Experience</h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[var(--color-primary)]/30"></div>

            <div className="space-y-8">
              {experiences.map((item, index) => (
                <div key={index} className="relative pl-20">
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-2 w-4 h-4 rounded-full bg-[var(--color-primary)] border-4 border-[var(--color-background)]"></div>
                  
                  <div className="bg-[var(--color-card)] p-6 rounded-lg border border-gray-800 hover:border-[var(--color-primary)]/50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-[var(--color-foreground)]">
                          {item.title}
                        </h3>
                        <p className="text-[var(--color-primary)] font-medium">{item.company}</p>
                      </div>
                      <span className="text-gray-400 text-sm mt-1 md:mt-0">{item.period}</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                      {item.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education History Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-6 h-6 text-[var(--color-primary)]" />
            <h2 className="text-3xl font-bold">Education History</h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[var(--color-primary)]/30"></div>

            <div className="space-y-8">
              {education.map((item, index) => (
                <div key={index} className="relative pl-20">
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-2 w-4 h-4 rounded-full bg-[var(--color-primary)] border-4 border-[var(--color-background)]"></div>
                  
                  <div className="bg-[var(--color-card)] p-6 rounded-lg border border-gray-800 hover:border-[var(--color-primary)]/50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-[var(--color-foreground)]">
                          {item.title}
                        </h3>
                        <p className="text-[var(--color-primary)] font-medium">{item.institution}</p>
                      </div>
                      <span className="text-gray-400 text-sm mt-1 md:mt-0">{item.period}</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                      {item.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Code className="w-6 h-6 text-[var(--color-primary)]" />
            <h2 className="text-3xl font-bold">Technical Skills</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((group) => (
              <div key={group.title}>
                <h3 className="text-lg font-semibold text-gray-400 mb-4 uppercase tracking-wide">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-4 py-2 bg-[var(--color-card)] border border-gray-700 rounded-full text-sm text-[var(--color-foreground)] hover:border-[var(--color-primary)] transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-12 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-6 h-6 text-[var(--color-primary)]" />
            <h2 className="text-3xl font-bold">Certifications</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <a
                key={index}
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-[var(--color-card)] border border-gray-800 rounded-lg p-6 hover:border-[var(--color-primary)]/60 hover:bg-[var(--color-card)]/90 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[var(--color-primary)]/10 rounded-lg">
                    <cert.icon className="w-6 h-6 text-[var(--color-primary)]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-1">
                          {cert.title}
                        </h3>
                        <p className="text-sm text-gray-400">{cert.issuer}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Issued {cert.month} {cert.year}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[var(--color-primary)] transition-colors" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
