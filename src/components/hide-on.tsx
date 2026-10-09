"use client";

import { usePathname } from "next/navigation";

/** Renders children everywhere except the given route (e.g. the footer's "Get in touch" on /contact itself). */
export function HideOn({ path, children }: { path: string; children: React.ReactNode }) {
  return usePathname() === path ? null : children;
}
