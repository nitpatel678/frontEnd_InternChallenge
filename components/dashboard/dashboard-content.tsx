"use client";

import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { type Course } from "@/types";
import { BentoGrid } from "./bento-grid";
import { CourseTile } from "./course-tile";
import { ActivityTile } from "./activity-tile";
import { 
  BookOpen, Search, Filter, TrendingUp, Clock, 
  Award, CheckCircle2, User, Bell, Eye, Shield, Cpu 
} from "lucide-react";
import { useState } from "react";

interface DashboardContentProps {
  courses: Course[];
}

const pageVariants: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 25 } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.15 } }
};

export function DashboardContent({ courses }: DashboardContentProps) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "dashboard";
  
  // Courses search state
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence mode="wait">
      {activeTab === "dashboard" && (
        <motion.div
          key="dashboard"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full"
        >
          <BentoGrid courses={courses} />
        </motion.div>
      )}

      {activeTab === "courses" && (
        <motion.div
          key="courses"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="space-y-6 max-w-7xl mx-auto w-full"
        >
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/40 border border-border p-6 rounded-3xl backdrop-blur-xl">
            <div className="space-y-1">
              <h3 className="font-bold text-xl text-foreground">Enrolled Courses</h3>
              <p className="text-xs text-muted">Manage, filter, and track details of all your active curriculums.</p>
            </div>
            
            {/* Search Input */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-background border border-border focus:border-accent pl-9 pr-4 py-2 rounded-xl text-sm text-foreground outline-none transition-colors"
                />
              </div>
              <button className="p-2 bg-background border border-border hover:border-accent text-muted hover:text-foreground rounded-xl transition-colors cursor-pointer">
                <Filter size={16} />
              </button>
            </div>
          </div>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseTile key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-card/25 border border-border/50 rounded-3xl">
              <div className="p-4 bg-accent/5 border border-accent/15 rounded-2xl text-accent/60">
                <BookOpen size={36} />
              </div>
              <div>
                <h4 className="font-bold text-foreground">No courses found</h4>
                <p className="text-xs text-muted mt-1">Try refining your search keyword.</p>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {activeTab === "analytics" && (
        <motion.div
          key="analytics"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="space-y-6 max-w-7xl mx-auto w-full"
        >
          {/* Top Performance Analytics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border p-6 rounded-3xl flex items-center gap-4 relative overflow-hidden noise">
              <div className="p-3.5 bg-accent/10 border border-accent/20 text-accent rounded-2xl">
                <Clock size={20} />
              </div>
              <div>
                <span className="text-[10px] text-muted font-semibold tracking-wide uppercase">STUDY TIME</span>
                <h4 className="text-2xl font-black text-foreground mt-0.5">32.4 hrs</h4>
                <p className="text-[10px] text-emerald-500 font-medium mt-0.5">↑ 12% from last week</p>
              </div>
            </div>

            <div className="bg-card border border-border p-6 rounded-3xl flex items-center gap-4 relative overflow-hidden noise">
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl">
                <Award size={20} />
              </div>
              <div>
                <span className="text-[10px] text-muted font-semibold tracking-wide uppercase">EXP EARNED</span>
                <h4 className="text-2xl font-black text-foreground mt-0.5">4,850 XP</h4>
                <p className="text-[10px] text-emerald-500 font-medium mt-0.5">Ranked top 5% this month</p>
              </div>
            </div>

            <div className="bg-card border border-border p-6 rounded-3xl flex items-center gap-4 relative overflow-hidden noise">
              <div className="p-3.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded-2xl">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <span className="text-[10px] text-muted font-semibold tracking-wide uppercase">COMPLETIONS</span>
                <h4 className="text-2xl font-black text-foreground mt-0.5">8 Lessons</h4>
                <p className="text-[10px] text-indigo-500 font-medium mt-0.5">Daily target achieved</p>
              </div>
            </div>
          </div>

          {/* Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2">
              <ActivityTile />
            </div>

            {/* Visual target tracking */}
            <div className="bg-card border border-border p-6 rounded-3xl space-y-6 noise relative overflow-hidden">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-accent" />
                <h4 className="font-bold text-sm text-foreground">Weekly Target Goal</h4>
              </div>

              {/* Progress Circle Visual */}
              <div className="flex flex-col items-center justify-center py-4 relative">
                <div className="w-28 h-28 rounded-full border-4 border-border flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent border-r-transparent animate-spin-slow" />
                  <span className="text-lg font-black text-foreground">72%</span>
                </div>
                <span className="text-xs text-muted font-medium mt-4">5 hours remaining to hit target</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === "settings" && (
        <motion.div
          key="settings"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="max-w-4xl mx-auto w-full bg-card border border-border rounded-3xl p-6 md:p-8 space-y-8 noise relative overflow-hidden"
        >
          {/* Header */}
          <div className="border-b border-border/60 pb-6">
            <h3 className="font-extrabold text-xl text-foreground">System Preferences</h3>
            <p className="text-xs text-muted mt-1">Configure profile details, application configurations, and safety toggles.</p>
          </div>

          {/* Setting Blocks */}
          <div className="space-y-6">
            {/* Profile Preferences */}
            <div className="flex items-start gap-4 p-4 hover:bg-card-hover border border-border/40 hover:border-border rounded-2xl transition-all cursor-pointer">
              <div className="p-3 bg-accent/10 text-accent rounded-xl">
                <User size={18} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-foreground">Profile & Details</h4>
                <p className="text-[11px] text-muted mt-0.5">Customize your displayed full name, credentials, and custom avatars.</p>
              </div>
            </div>

            {/* Notification settings */}
            <div className="flex items-start gap-4 p-4 hover:bg-card-hover border border-border/40 hover:border-border rounded-2xl transition-all cursor-pointer">
              <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
                <Bell size={18} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-foreground">Push Notifications</h4>
                <p className="text-[11px] text-muted mt-0.5">Select when to get notified regarding progress metrics or daily streak status.</p>
              </div>
            </div>

            {/* Premium Theme Accent controls */}
            <div className="flex items-start gap-4 p-4 hover:bg-card-hover border border-border/40 hover:border-border rounded-2xl transition-all cursor-pointer">
              <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl">
                <Eye size={18} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-foreground">Aesthetic & Themes</h4>
                <p className="text-[11px] text-muted mt-0.5">Pick theme layouts (Default Dark Core) and choose highlight glows.</p>
              </div>
            </div>

            {/* Safety Settings */}
            <div className="flex items-start gap-4 p-4 hover:bg-card-hover border border-border/40 hover:border-border rounded-2xl transition-all cursor-pointer">
              <div className="p-3 bg-red-500/10 text-red-500 rounded-xl">
                <Shield size={18} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-foreground">Access & Security</h4>
                <p className="text-[11px] text-muted mt-0.5">Integrate authentication steps and manage Supabase secure endpoints.</p>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="flex items-center justify-between pt-6 border-t border-border/60 text-[10px] text-muted font-medium">
            <span className="flex items-center gap-1">
              <Cpu size={12} />
              <span>AetherEngine v1.0</span>
            </span>
            <span>All credentials verified</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
