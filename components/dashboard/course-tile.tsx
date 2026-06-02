"use client";

import { motion } from "framer-motion";
import { type Course } from "@/types";
import { getIcon } from "@/lib/icons";
import { ProgressBar } from "./progress-bar";
import { ArrowUpRight } from "lucide-react";

interface CourseTileProps {
  course: Course;
}

export function CourseTile({ course }: CourseTileProps) {
  const IconComponent = getIcon(course.icon_name);

  return (
    <motion.article
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="noise relative overflow-hidden bg-card hover:bg-card-hover border border-border hover:border-border-hover rounded-3xl p-6 flex flex-col justify-between min-h-[220px] transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(109,90,205,0.05)] cursor-pointer group"
    >
      {/* Background Subtle Gradient Mesh */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors duration-300" />
      
      {/* Course Header */}
      <div className="flex items-start justify-between relative z-10">
        <div className="p-3 bg-background/80 border border-border rounded-2xl text-accent shadow-inner group-hover:border-accent/30 group-hover:text-accent transition-colors duration-300">
          <IconComponent size={24} strokeWidth={2} />
        </div>
        <div className="p-1.5 rounded-lg text-muted group-hover:text-foreground group-hover:bg-background/40 transition-all duration-300">
          <ArrowUpRight size={16} />
        </div>
      </div>

      {/* Course Title and Progress */}
      <div className="space-y-4 mt-6 relative z-10">
        <h3 className="font-bold text-lg text-foreground leading-snug tracking-tight group-hover:text-accent transition-colors duration-200">
          {course.title}
        </h3>
        <ProgressBar progress={course.progress} />
      </div>
    </motion.article>
  );
}
