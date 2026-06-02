"use client";

import { Home, BookOpen, BarChart3, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

export function MobileNav() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const menuItems = [
    { label: "Dashboard", icon: Home },
    { label: "Courses", icon: BookOpen },
    { label: "Analytics", icon: BarChart3 },
    { label: "Settings", icon: Settings },
  ];

  const activeTab = searchParams.get("tab") || "dashboard";
  const activeItem = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

  const handleNavClick = (label: string) => {
    const tabName = label.toLowerCase();
    if (tabName === "dashboard") {
      router.push("/");
    } else {
      router.push(`/?tab=${tabName}`);
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card/85 backdrop-blur-xl border-t border-border flex items-center justify-around px-4 z-50 shadow-2xl">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const active = activeItem === item.label;

        return (
          <button
            key={item.label}
            onClick={() => handleNavClick(item.label)}
            className="relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl cursor-pointer outline-none transition-colors"
          >
            {active && (
              <motion.div
                layoutId="active-mobile-nav"
                className="absolute inset-0 bg-accent/10 border border-accent/20 rounded-xl"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}

            <div className={`relative z-10 transition-colors duration-200 ${
              active ? "text-accent" : "text-muted"
            }`}>
              <Icon size={20} />
            </div>

            <span className={`relative z-10 text-[10px] mt-1 font-medium tracking-wide transition-colors duration-200 ${
              active ? "text-foreground font-semibold" : "text-muted"
            }`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
