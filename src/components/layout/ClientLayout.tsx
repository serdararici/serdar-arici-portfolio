"use client";

import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import { MotionConfig } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const params = useParams();

  // locale'i dahil et
  const isHome = pathname === `/${params.locale}` || pathname === "/";

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="pt-16 md:pt-16 flex-1">{children}</main>
        {!isHome && <Footer />}
      </div>
    </MotionConfig>
  );
}