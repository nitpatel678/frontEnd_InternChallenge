"use client";

import { motion, Variants } from "framer-motion";
import { type Course } from "@/types";
import { HeroTile } from "./hero-tile";
import { CourseTile } from "./course-tile";
import { ActivityTile } from "./activity-tile";

interface BentoGridProps {
  courses: Course[];
}

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 25
    }
  }
};

export function BentoGrid({ courses }: BentoGridProps) {
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full"
    >
      <motion.div variants={cardVariants} className="md:col-span-2 lg:col-span-3">
        <HeroTile />
      </motion.div>

      <motion.div variants={cardVariants} className="md:col-span-2">
        <ActivityTile />
      </motion.div>

      {courses.map((course) => (
        <motion.div key={course.id} variants={cardVariants}>
          <CourseTile course={course} />
        </motion.div>
      ))}
    </motion.div>
  );
}
