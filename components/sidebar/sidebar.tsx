"use client";

import { useState, useEffect } from "react";
import { Home, BookOpen, BarChart3, Settings, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import { NavItem } from "./nav-item";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

export function Sidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-collapse sidebar on tablet viewports (< 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { label: "Dashboard", icon: Home },
    { label: "Courses", icon: BookOpen },
    { label: "Analytics", icon: BarChart3 },
    { label: "Settings", icon: Settings },
  ];

  // Derive active tab from URL query params (defaulting to "dashboard")
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
    <motion.aside
      animate={{ width: isCollapsed ? "80px" : "240px" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="hidden md:flex flex-col h-screen bg-card border-r border-border p-4 relative z-40 shrink-0"
    >
      {/* Brand logo & name */}
      <div className="flex items-center gap-3 px-2 py-4 mb-6">
        <div className="flex items-center justify-center p-2.5 bg-accent/10 border border-accent/25 rounded-xl text-accent shadow-lg shadow-accent/5">
          <GraduationCap size={22} className="stroke-[2.5]" />
        </div>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-bold text-base tracking-wide bg-gradient-to-r from-foreground via-foreground to-muted bg-clip-text text-transparent"
          >
            AetherAcademy
          </motion.span>
        )}
      </div>

      {/* Nav List */}
      <nav className="flex-1 flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={activeItem === item.label}
            collapsed={isCollapsed}
            onClick={() => handleNavClick(item.label)}
          />
        ))}
      </nav>

      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-20 -right-3.5 bg-card border border-border hover:border-border-hover p-1.5 rounded-full text-muted hover:text-foreground cursor-pointer transition-colors shadow-md z-50 hover:bg-card-hover"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </motion.aside>
  );
}
