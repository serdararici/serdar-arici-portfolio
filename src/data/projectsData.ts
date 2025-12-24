import type { Project } from "@/types/types";

export const projects: Project[] = [
  {
    slug: "microservices-order-platform",
    title: "Microservices Order Platform",
    description:
      "A production-ready order management platform using microservices, event-driven communication, and robust observability.",
    short_description: "Event-driven orders with resilient microservices and observability.",
    tech_stack: ["Golang", "PostgreSQL", "Redis", "gRPC", "Docker", "Kubernetes", "Kafka", "Grafana"],
    github_url: "https://github.com/example/microservices-order-platform",
    live_url: "https://order.example.com",
    image_url: "/profile_ai.png",
    project_date: "2024-10-01",
    is_featured: true,
    category: "Backend",
  },
  {
    slug: "next-portfolio",
    title: "Next.js Portfolio",
    description:
      "A fast, SEO-friendly portfolio built with Next.js, Tailwind, and responsive design best practices.",
    short_description: "High-performance portfolio with SEO and responsive design.",
    tech_stack: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"],
    github_url: "https://github.com/example/next-portfolio",
    live_url: "https://portfolio.example.com",
    image_url: "/profile_ai.png",
    project_date: "2024-07-15",
    is_featured: true,
    category: "Frontend",
  },
  {
    slug: "spring-security-jwt-api",
    title: "Spring Security JWT API",
    description:
      "Secure REST API with Spring Boot, JWT authentication, role-based access control, and extensive tests.",
    short_description: "Secure Spring Boot API with JWT and role-based access. kkkkkkkkkk kkkkkkkkkkk kkkkkkkkk  kkkkkkkkkk  kkkkkkkkkk kkkkkkkkkk kkkkkkkkk kkkkkkkkk kkkkkkkkk kkkkkkkkkk kkkkkkkkkk kkkkkkkkkk kkkkkkkk kkkkkk kkkkkkkkkk kkkkkkkkkkk kkkkkkkkk  kkkkkkkkkk  kkkkkkkkkk kkkkkkkkkk kkkkkkkkk kkkkkkkkk kkkkkkkkk kkkkkkkkkk kkkkkkkkkk kkkkkkkkkk kkkkkkkk kkkkkk kkkkkkkkkk kkkkkkkkkkk kkkkkkkkk  kkkkkkkkkk  kkkkkkkkkk kkkkkkkkkk kkkkkkkkk kkkkkkkkk kkkkkkkkk kkkkkkkkkk kkkkkkkkkk kkkkkkkkkk kkkkkkkk kkkkkk",
    tech_stack: ["Java", "Spring Boot", "Spring Security JWT", "PostgreSQL", "JUnit", "Docker"],
    github_url: "https://github.com/example/spring-security-jwt-api",
    live_url: "",
    image_url: "/image_not_found.jpg",
    project_date: "2023-12-10",
    is_featured: true,
    category: "Backend",
  },
  {
    slug: "flutter-expense-tracker",
    title: "Flutter Expense Tracker",
    description:
      "Cross-platform expense tracking app with offline support, charts, and cloud sync.",
    short_description: "Cross-platform expense tracker with offline-first design.",
    tech_stack: ["Flutter", "Dart", "Bloc", "Firebase", "SQLite"],
    github_url: "https://github.com/example/flutter-expense-tracker",
    live_url: "",
    image_url: "/profile_ai.png",
    project_date: "2024-03-05",
    is_featured: true,
    category: "Mobile",
  },
  {
    slug: "react-dashboard",
    title: "React Analytics Dashboard",
    description:
      "Interactive analytics dashboard with real-time charts, filters, and modular widgets.",
    short_description: "Real-time analytics dashboard with modular widgets.",
    tech_stack: ["React", "TypeScript", "Chart.js", "Tailwind CSS", "Node.js"],
    github_url: "https://github.com/example/react-analytics-dashboard",
    live_url: "https://dashboard.example.com",
    image_url: "/image_not_found.jpg",
    project_date: "2024-05-22",
    is_featured: false,
    category: "Frontend",
  },
];

