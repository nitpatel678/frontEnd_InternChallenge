"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error securely
    console.error("Dashboard error boundary captured:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="noise relative overflow-hidden bg-card/40 border border-red-500/20 max-w-md w-full p-8 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col items-center gap-6">
        <div className="absolute inset-0 bg-red-500/5 blur-3xl -z-10" />

        {/* Warning Icon */}
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400">
          <AlertCircle size={32} />
        </div>

        {/* Text details */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-foreground">Something went wrong</h2>
          <p className="text-xs text-muted leading-relaxed">
            Failed to connect to Supabase. Please ensure your courses table schema is seeded and the database is accessible.
          </p>
          {error.message && (
            <div className="mt-4 px-3 py-2 bg-background/50 border border-border text-[11px] font-mono text-red-300 rounded-lg max-h-[80px] overflow-y-auto break-all">
              {error.message}
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={() => reset()}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-accent hover:bg-accent/90 text-foreground font-semibold rounded-2xl cursor-pointer transition-all duration-200 shadow-lg shadow-accent/25 hover:shadow-accent/40 text-sm outline-none"
        >
          <RotateCcw size={16} />
          <span>Retry Connection</span>
        </button>
      </div>
    </div>
  );
}
