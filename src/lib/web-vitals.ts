"use client";

import { onCLS, onFCP, onLCP, onTTFB, onINP, Metric } from "web-vitals";

type ReportHandler = (metric: Metric) => void;

export function reportWebVitals(onPerfEntry?: ReportHandler) {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    onCLS(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
    onINP(onPerfEntry);
  }
}

export function sendToAnalytics(metric: Metric) {
  // Send to your analytics service
  // Example: Google Analytics, Vercel Analytics, etc.
  
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", metric.name, {
      event_category: "Web Vitals",
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(metric);
  }
}

