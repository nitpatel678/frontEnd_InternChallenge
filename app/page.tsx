import { supabase } from "@/lib/supabase";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { Sparkles } from "lucide-react";

export const revalidate = 0; // Disable static rendering caching to ensure real-time updates from Supabase

async function getCourses() {
  // Pre-flight check to catch missing environment variables gracefully
  const isUrlConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");
  const isKeyConfigured = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes("placeholder");

  if (!isUrlConfigured || !isKeyConfigured) {
    throw new Error(
      "Supabase credentials are missing or unconfigured. Please create a `.env.local` file in the root of the project with your active NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY keys."
    );
  }

  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Supabase query failed: ${error.message}`);
  }

  if (!courses || courses.length === 0) {
    throw new Error(
      "No courses found. This is likely caused by Supabase Row Level Security (RLS) blocking anonymous reads. " +
      "Go to your Supabase Dashboard → Table Editor → courses → RLS Policies, and either disable RLS or add a SELECT policy: " +
      'CREATE POLICY "Allow public read" ON courses FOR SELECT USING (true);'
    );
  }

  return courses;
}

export default async function DashboardPage() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen bg-background px-6 py-8 md:px-10 md:py-12 flex flex-col gap-8">
      {/* Header Area */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-7xl mx-auto w-full">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <span>Learning Hub</span>
            <span className="text-accent text-xs px-2 py-0.5 bg-accent/10 border border-accent/25 rounded-md font-semibold">
              Live
            </span>
          </h2>
          <p className="text-xs text-muted font-medium mt-1">
            Real-time curriculum sync and predictive performance analytics.
          </p>
        </div>

        {/* Sync Info */}
        <div className="flex items-center gap-2 text-[11px] font-semibold text-muted bg-card border border-border px-3 py-1.5 rounded-xl self-start md:self-auto shadow-sm">
          <Sparkles size={12} className="text-accent" />
          <span>Connected to Supabase Cloud</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex-1">
        <DashboardContent courses={courses} />
      </main>
    </div>
  );
}
