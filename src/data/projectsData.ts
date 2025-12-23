import type { Project } from "@/types/types";

export const projects: Project[] = [
  {
    slug: "microservices-order-platform",
    title: "Microservices Order Platform",
    description:
      "A production-ready order management platform using microservices, event-driven communication, and robust observability.",
    shortDescription: "Event-driven orders with resilient microservices and observability.",
    techStack: ["Golang", "PostgreSQL", "Redis", "gRPC", "Docker", "Kubernetes", "Kafka", "Grafana"],
    githubUrl: "https://github.com/example/microservices-order-platform",
    liveUrl: "https://order.example.com",
    image: "/profile_ai.png",
    date: "2024-10-01",
    featured: true,
    category: "Backend",
  },
  {
    slug: "next-portfolio",
    title: "Next.js Portfolio",
    description:
      "A fast, SEO-friendly portfolio built with Next.js, Tailwind, and responsive design best practices.",
    shortDescription: "High-performance portfolio with SEO and responsive design.",
    techStack: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"],
    githubUrl: "https://github.com/example/next-portfolio",
    liveUrl: "https://portfolio.example.com",
    image: "/profile_ai.png",
    date: "2024-07-15",
    featured: true,
    category: "Frontend",
  },
  {
    slug: "spring-security-jwt-api",
    title: "Spring Security JWT API",
    description:
      "Secure REST API with Spring Boot, JWT authentication, role-based access control, and extensive tests.",
    shortDescription: "Secure Spring Boot API with JWT and role-based access. kkkkkkkkkk kkkkkkkkkkk kkkkkkkkk  kkkkkkkkkk  kkkkkkkkkk kkkkkkkkkk kkkkkkkkk kkkkkkkkk kkkkkkkkk kkkkkkkkkk kkkkkkkkkk kkkkkkkkkk kkkkkkkk kkkkkk kkkkkkkkkk kkkkkkkkkkk kkkkkkkkk  kkkkkkkkkk  kkkkkkkkkk kkkkkkkkkk kkkkkkkkk kkkkkkkkk kkkkkkkkk kkkkkkkkkk kkkkkkkkkk kkkkkkkkkk kkkkkkkk kkkkkk kkkkkkkkkk kkkkkkkkkkk kkkkkkkkk  kkkkkkkkkk  kkkkkkkkkk kkkkkkkkkk kkkkkkkkk kkkkkkkkk kkkkkkkkk kkkkkkkkkk kkkkkkkkkk kkkkkkkkkk kkkkkkkk kkkkkk",
    techStack: ["Java", "Spring Boot", "Spring Security JWT", "PostgreSQL", "JUnit", "Docker"],
    githubUrl: "https://github.com/example/spring-security-jwt-api",
    liveUrl: "",
    image: "/image_not_found.jpg",
    date: "2023-12-10",
    featured: true,
    category: "Backend",
  },
  {
    slug: "flutter-expense-tracker",
    title: "Flutter Expense Tracker",
    description:
      "Cross-platform expense tracking app with offline support, charts, and cloud sync.",
    shortDescription: "Cross-platform expense tracker with offline-first design.",
    techStack: ["Flutter", "Dart", "Bloc", "Firebase", "SQLite"],
    githubUrl: "https://github.com/example/flutter-expense-tracker",
    liveUrl: "",
    image: "/profile_ai.png",
    date: "2024-03-05",
    featured: true,
    category: "Mobile",
  },
  {
    slug: "react-dashboard",
    title: "React Analytics Dashboard",
    description:
      "Interactive analytics dashboard with real-time charts, filters, and modular widgets.",
    shortDescription: "Real-time analytics dashboard with modular widgets.",
    techStack: ["React", "TypeScript", "Chart.js", "Tailwind CSS", "Node.js"],
    githubUrl: "https://github.com/example/react-analytics-dashboard",
    liveUrl: "https://dashboard.example.com",
    image: "/image_not_found.jpg",
    date: "2024-05-22",
    featured: false,
    category: "Frontend",
  },
];

