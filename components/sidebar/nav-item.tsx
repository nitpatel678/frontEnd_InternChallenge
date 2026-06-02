"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}

export function NavItem({ icon: Icon, label, active, collapsed, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center w-full p-3 rounded-xl cursor-pointer transition-colors duration-200 group outline-none"
    >
      {active && (
        <motion.div
          layoutId="active-nav-indicator"
          className="absolute inset-0 bg-accent/10 border border-accent/20 rounded-xl"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}

      {/* Nav Icon */}
      <div className={`relative z-10 flex items-center justify-center transition-colors duration-200 ${
        active ? "text-accent" : "text-muted group-hover:text-foreground"
      }`}>
        <Icon size={20} strokeWidth={2} />
      </div>

      {/* Nav Label */}
      {!collapsed && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className={`relative z-10 ml-3 text-sm font-medium transition-colors duration-200 ${
            active ? "text-foreground font-semibold" : "text-muted group-hover:text-foreground"
          }`}
        >
          {label}
        </motion.span>
      )}

      {/* Hover tooltip for collapsed sidebar */}
      {collapsed && (
        <div className="absolute left-16 scale-0 group-hover:scale-100 transition-transform duration-200 origin-left z-50 bg-card border border-border px-3 py-1.5 rounded-lg text-xs text-foreground font-medium pointer-events-none shadow-xl">
          {label}
        </div>
      )}
    </button>
  );
}
