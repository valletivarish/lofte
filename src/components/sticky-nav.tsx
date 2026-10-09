"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileMenu } from "./mobile-menu";
import { DesktopNav } from "./desktop-nav";
import { miniLogo } from "./wordmark";

type State = "off" | "shown" | "tucked";

/**
 * Floating pill nav (Clear Street pattern). Off while the page's own header is on screen; after that it tucks away
 * on scroll-down and returns on scroll-up. Keyboard focus always brings it back; reduced motion keeps it put.
 */
export function StickyNav() {
  const pathname = usePathname();
  const [state, setState] = useState<State>("off");

  useEffect(() => {
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let last = scrollY;
    const onScroll = () => {
      const y = scrollY;
      const dy = y - last;
      last = y;
      if (y < innerHeight * 0.85) return setState("off");
      if (still) return setState("shown");
      if (dy > 4) setState("tucked");
      else if (dy < -4) setState("shown");
      else setState((s) => (s === "off" ? "shown" : s));
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <div
      data-state={state}
      inert={state === "off"}
      onFocusCapture={() => setState("shown")}
      className="pointer-events-none fixed inset-x-0 top-[calc(env(safe-area-inset-top,0px)+0.75rem)] z-[60] flex justify-center px-3 transition-[translate,opacity] duration-500 ease-[var(--ease-out-expo)] data-[state=off]:-translate-y-[160%] data-[state=off]:opacity-0 data-[state=tucked]:-translate-y-[160%] motion-reduce:transition-none"
    >
      <nav
        aria-label="Quick navigation"
        className="on-dark pointer-events-auto flex h-14 w-full max-w-[40rem] items-center gap-1 rounded-full bg-ink/85 pl-2 pr-1.5 text-white shadow-[0_10px_40px_-12px_rgb(0_0_0/0.5)] backdrop-blur-md lg:w-auto lg:max-w-none"
      >
        <Link href="/" aria-label="Løfte Studios, home" className="grid h-11 flex-none place-items-center rounded-full px-3 no-underline hover:bg-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element -- static vector */}
          <img src={miniLogo.src} alt="" width={miniLogo.w} height={miniLogo.h} className="h-8 w-auto" />
        </Link>
        <div className="hidden lg:block">
          <DesktopNav tone="light" />
        </div>
        <Link
          href="/contact"
          className="caps ml-auto grid h-11 place-items-center rounded-full bg-signal px-5 text-[0.78rem] text-ink no-underline transition-colors hover:bg-white lg:ml-2"
        >
          Start a project
        </Link>
        <div className="lg:hidden">
          <MobileMenu tone="light" />
        </div>
      </nav>
    </div>
  );
}
