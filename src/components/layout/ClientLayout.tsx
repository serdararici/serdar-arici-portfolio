"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="pt-16 md:pt-16 flex-1">{children}</main>
      {!isHome && <Footer />}
    </div>
  );
}
