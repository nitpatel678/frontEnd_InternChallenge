"use client";

import { motion } from "framer-motion";
import { Activity, Flame } from "lucide-react";

export function ActivityTile() {
  // Generate 7 rows of 24 blocks each to represent a mock learning grid (approx. 6 months/weeks)
  const rows = 7;
  const cols = 22; // Perfect width for our Bento size

  // Helper to determine block color intensity
  const getColorClass = (value: number) => {
    if (value === 0) return "bg-border/60 hover:bg-border";
    if (value === 1) return "bg-accent/20 hover:bg-accent/40 border border-accent/10";
    if (value === 2) return "bg-accent/40 hover:bg-accent/60 border border-accent/20";
    if (value === 3) return "bg-accent/70 hover:bg-accent/80 border border-accent/30";
    return "bg-accent hover:bg-accent/90 shadow-md shadow-accent/25 border border-accent/40";
  };

  // Seed a realistic learning graph (100% deterministic to solve hydration mismatch)
  const grid = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => {
      // Coordinate-based deterministic hash function so server and client render match exactly
      const hash = (Math.abs(Math.sin((r + 1) * 12.9898 + (c + 1) * 78.233)) * 43758.5453) % 1;
      const isWeekend = r === 0 || r === 6;
      if (isWeekend) {
        return hash > 0.85 ? 1 : 0;
      }
      if (hash > 0.9) return 4;
      if (hash > 0.72) return 3;
      if (hash > 0.45) return 2;
      if (hash > 0.2) return 1;
      return 0;
    })
  );

  const days = ["Mon", "", "Wed", "", "Fri", "", "Sun"];

  return (
    <motion.section
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="noise relative overflow-hidden bg-card hover:bg-card-hover border border-border hover:border-border-hover rounded-3xl p-6 transition-all duration-300 shadow-2xl hover:shadow-[0_0_30px_rgba(109,90,205,0.05)] cursor-pointer"
    >
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-accent/10 border border-accent/20 text-accent rounded-lg">
            <Activity size={16} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-foreground">Learning Activity</h3>
            <p className="text-[10px] text-muted font-medium">Daily contribution to course goals</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-accent bg-accent/10 border border-accent/20 px-2 py-1 rounded-full">
          <Flame size={12} className="fill-current" />
          <span>Active Streak</span>
        </div>
      </div>

      {/* Grid Rendering */}
      <div className="flex gap-2 relative z-10 overflow-x-auto pb-2 scrollbar-none">
        {/* Day indicators */}
        <div className="flex flex-col justify-between text-[9px] text-muted py-0.5 select-none font-semibold">
          {days.map((day, i) => (
            <span key={i} className="h-[9px] leading-[9px] w-6">
              {day}
            </span>
          ))}
        </div>

        {/* Contribution Grid */}
        <div className="flex-1 flex gap-[3.5px]">
          {Array.from({ length: cols }).map((_, c) => (
            <div key={c} className="flex flex-col gap-[3.5px] justify-between">
              {Array.from({ length: rows }).map((_, r) => {
                const val = grid[r][c];
                return (
                  <motion.div
                    key={`${r}-${c}`}
                    whileHover={{ scale: 1.25, zIndex: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className={`w-[9px] h-[9px] rounded-[2px] transition-colors duration-200 cursor-pointer ${getColorClass(
                      val
                    )}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend & Summary */}
      <div className="flex items-center justify-between mt-4 text-[10px] text-muted relative z-10 font-medium">
        <span>320 mins active this month</span>
        <div className="flex items-center gap-1 select-none">
          <span>Less</span>
          <div className="w-[8px] h-[8px] rounded-[1.5px] bg-border/60" />
          <div className="w-[8px] h-[8px] rounded-[1.5px] bg-accent/20" />
          <div className="w-[8px] h-[8px] rounded-[1.5px] bg-accent/40" />
          <div className="w-[8px] h-[8px] rounded-[1.5px] bg-accent/70" />
          <div className="w-[8px] h-[8px] rounded-[1.5px] bg-accent" />
          <span>More</span>
        </div>
      </div>
    </motion.section>
  );
}
