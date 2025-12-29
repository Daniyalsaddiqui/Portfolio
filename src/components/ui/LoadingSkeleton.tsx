"use client";

import { m } from "framer-motion";

export function SectionSkeleton() {
  return (
    <div className="w-full space-y-8 animate-pulse">
      <div className="h-12 bg-glass-bg rounded-lg w-3/4 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-glass-bg rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full bg-glass-bg rounded-lg p-6 space-y-4"
    >
      <div className="h-6 bg-background/50 rounded w-3/4" />
      <div className="h-4 bg-background/50 rounded w-full" />
      <div className="h-4 bg-background/50 rounded w-5/6" />
      <div className="flex gap-2 mt-4">
        <div className="h-6 bg-background/50 rounded w-16" />
        <div className="h-6 bg-background/50 rounded w-20" />
        <div className="h-6 bg-background/50 rounded w-14" />
      </div>
    </m.div>
  );
}

