"use client";

import { useEffect } from "react";
import { reportWebVitals, sendToAnalytics } from "@/lib/web-vitals";

export function WebVitals() {
  useEffect(() => {
    reportWebVitals(sendToAnalytics);
  }, []);

  return null;
}

