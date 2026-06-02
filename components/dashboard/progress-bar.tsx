"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs mb-2">
        <span className="text-muted font-medium">Course Progress</span>
        <span className="text-accent font-semibold">{progress}%</span>
      </div>
      <div className="h-2 w-full bg-border rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 15,
            delay: 0.2
          }}
          className="h-full bg-gradient-to-r from-accent to-[#8a75f5] rounded-full"
        />
      </div>
    </div>
  );
}
