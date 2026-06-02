import { SkeletonGrid } from "@/components/dashboard/skeleton-grid";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background px-6 py-8 md:px-10 md:py-12 flex flex-col gap-8">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2 max-w-7xl mx-auto w-full">
        <div className="h-8 w-48 bg-card/85 border border-border/40 rounded-xl relative overflow-hidden animate-pulse">
          <div className="skeleton absolute inset-0 opacity-40" />
        </div>
        <div className="h-4 w-72 bg-card/85 border border-border/40 rounded-xl relative overflow-hidden animate-pulse">
          <div className="skeleton absolute inset-0 opacity-40" />
        </div>
      </div>

      <SkeletonGrid />
    </div>
  );
}
