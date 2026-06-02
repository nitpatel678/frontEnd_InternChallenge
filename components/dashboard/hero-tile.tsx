"use client";

import { motion } from "framer-motion";
import { Flame, Sparkles } from "lucide-react";

export function HeroTile() {
  return (
    <motion.section
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="noise relative overflow-hidden bg-card hover:bg-card-hover border border-border hover:border-border-hover rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 shadow-2xl hover:shadow-[0_0_30px_rgba(109,90,205,0.05)] cursor-pointer"
    >
      {/* Abstract Background Gradient */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Greeting info */}
      <div className="space-y-2 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-xs text-accent font-semibold tracking-wide">
          <Sparkles size={12} />
          <span>AETHER DASHBOARD</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground to-muted bg-clip-text text-transparent">
          Welcome back, <span className="text-accent">Alex</span>
        </h1>
        <p className="text-muted text-sm max-w-md">
          You're on track to master your skills today. Continue where you left off or explore new concepts.
        </p>
      </div>

      {/* Daily Streak Indicator */}
      <div className="flex items-center gap-4 bg-background/55 border border-border/80 p-4 rounded-2xl relative z-10 self-start md:self-auto backdrop-blur-md">
        <div className="flex items-center justify-center p-3 bg-amber-500/10 border border-amber-500/25 text-amber-500 rounded-xl animate-pulse">
          <Flame size={24} className="fill-current" />
        </div>
        <div>
          <div className="text-xs text-muted font-medium">Daily Streak</div>
          <div className="text-lg font-bold text-foreground">7 Days Active</div>
        </div>
      </div>
    </motion.section>
  );
}
