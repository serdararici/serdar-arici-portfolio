import { Award, Cloud, Container } from "lucide-react";
import type {
  Experience,
  Education,
  SkillCategory,
  Certification,
} from "@/types/types";

export const experiences: Experience[] = [
  {
    title: "Full-Stack Developer",
    company: "Freelance / Various Projects",
    period: "2022 - Present",
    description: [
      "Developed scalable web applications using React, Next.js, and Node.js",
      "Built mobile applications with Flutter and Kotlin",
      "Implemented RESTful APIs and microservices architecture",
      "Collaborated with cross-functional teams to deliver high-quality software solutions",
    ],
  },
  {
    title: "Backend Developer",
    company: "Software Development Projects",
    period: "2020 - 2022",
    description: [
      "Developed backend services using Java, Kotlin, and Golang",
      "Designed and optimized database schemas for high-performance applications",
      "Implemented CI/CD pipelines and automated testing",
      "Mentored junior developers and conducted code reviews",
    ],
  },
];

export const education: Education[] = [
  {
    title: "B.S. Computer Engineering",
    institution: "Sakarya Üniversitesi",
    period: "2018 - 2022",
    description: [
      "Graduated with focus on software engineering and system design",
      "Capstone project on modern web application architecture",
      "Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering",
    ],
  },
];

export const skills: SkillCategory[] = [
  {
    title: "Backend Development",
    items: [
      "Java",
      "C#",
      ".NET",
      "Spring Boot",
      "Spring Security JWT",
      "Spring Data JPA",
      "Hibernate",
      "Node.js",
      "Express.js",
      "Golang",
      "Microservices Architecture",
      "Redis",
      "Swagger/OpenAPI",
      "Unit Testing (JUnit, Mockito)",
    ],
  },
  {
    title: "Frontend & UI",
    items: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "jQuery",
      "HTML",
      "CSS",
      "Bootstrap",
      "Responsive Design",
    ],
  },
  {
    title: "Mobile Development",
    items: [
      "Flutter (Bloc, Dio)",
      "Kotlin (MVVM, Retrofit, Room, LiveData, Glide)",
    ],
  },
  {
    title: "Database & Infrastructure",
    items: [
      "MySQL",
      "PostgreSQL",
      "MS SQL",
      "SQLite",
      "Firebase",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Git",
      "Linux/Bash",
    ],
  },
  {
    title: "General",
    items: [
      "Agile Methodologies (Scrum)",
      "English (Full Professional Proficiency)",
      "Technical Documentation",
    ],
  },
];

export const certifications: Certification[] = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    month: "October",
    year: "2024",
    credentialUrl: "https://www.example.com/aws-certified-cloud-practitioner",
    icon: Cloud,
  },
  {
    title: "Certified Kubernetes Administrator",
    issuer: "CNCF",
    month: "June",
    year: "2023",
    credentialUrl: "https://www.example.com/certified-kubernetes-administrator",
    icon: Container,
  },
  {
    title: "Professional Scrum Master I",
    issuer: "Scrum.org",
    month: "March",
    year: "2023",
    credentialUrl: "https://www.example.com/professional-scrum-master-i",
    icon: Award,
  },
  {
    title: "Google Cloud Platform Fundamentals",
    issuer: "Google Cloud",
    month: "January",
    year: "2022",
    credentialUrl: "https://www.example.com/google-cloud-platform-fundamentals",
    icon: Cloud,
  },
];

