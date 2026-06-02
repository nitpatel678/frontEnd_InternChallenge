export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full animate-pulse">
      {/* Hero Skeleton */}
      <div className="md:col-span-2 lg:col-span-3 h-[200px] md:h-[160px] bg-card/60 border border-border/40 rounded-3xl overflow-hidden relative">
        <div className="skeleton absolute inset-0 opacity-40" />
      </div>

      {/* Activity Skeleton */}
      <div className="md:col-span-2 h-[220px] bg-card/60 border border-border/40 rounded-3xl overflow-hidden relative">
        <div className="skeleton absolute inset-0 opacity-40" />
      </div>

      {/* Dynamic Course Skeletons */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="h-[220px] bg-card/60 border border-border/40 rounded-3xl overflow-hidden relative"
        >
          <div className="skeleton absolute inset-0 opacity-40" />
        </div>
      ))}
    </div>
  );
}
