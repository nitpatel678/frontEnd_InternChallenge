import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar/sidebar";
import { MobileNav } from "@/components/sidebar/mobile-nav";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Student Dashboard | Next-Gen Learning",
  description:
    "A futuristic student dashboard for tracking courses, progress, and learning streaks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="h-full bg-background text-foreground">
        <div className="flex h-full">
          {/* Suspense wrapper around Sidebar to prevent build de-optimization */}
          <Suspense fallback={<div className="w-[80px] md:w-[240px] h-screen bg-card border-r border-border shrink-0 animate-pulse" />}>
            <Sidebar />
          </Suspense>
          
          <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
            {/* Suspense wrapper for the dynamic main content switching */}
            <Suspense fallback={<div className="p-8 text-sm text-muted animate-pulse">Synchronizing dashboard...</div>}>
              {children}
            </Suspense>
          </main>
        </div>

        {/* Suspense wrapper around Mobile Nav */}
        <Suspense fallback={<div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border animate-pulse" />}>
          <MobileNav />
        </Suspense>
      </body>
    </html>
  );
}
