"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { nav, site, stages } from "@/content/lofte";
import { lenis } from "./smooth-scroll";
import { Wordmark } from "./wordmark";

/** Full-screen menu below lg. Portalled to <body> so no hero, pin or curtain stacking context can cover it. */
export function MobileMenu({ tone }: { tone: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const pathname = usePathname();
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const close = () => {
    setOpen(false);
    button.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panel.current) {
        const items = [...panel.current.querySelectorAll<HTMLElement>("a, button")];
        const [head, tail] = [items[0], items[items.length - 1]];
        if (e.shiftKey && document.activeElement === head) {
          e.preventDefault();
          tail.focus();
        } else if (!e.shiftKey && document.activeElement === tail) {
          e.preventDefault();
          head.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [open]);

  return (
    <>
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(true)}
        className={`caps h-11 rounded-full border-[1.5px] px-5 text-[0.8rem] ${
          tone === "light" ? "border-white/75 text-white" : "border-ink text-ink"
        }`}
      >
        Menu
      </button>
      {open &&
        createPortal(
          <div
            id={id}
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="menu-panel on-dark fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-ink px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] text-white"
          >
            <div className="flex h-14 items-center justify-between">
              <Wordmark tone="light" onClick={() => setOpen(false)} />
              <button type="button" onClick={close} className="caps h-11 rounded-full border-[1.5px] border-white/75 px-5 text-[0.8rem]">
                Close
              </button>
            </div>
            <nav aria-label="Main" className="mt-10 grid">
              {nav.map((item, i) => (
                <div key={item.href} className="border-b border-white/15">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                    className="menu-link display py-3 text-[2.4rem] no-underline aria-[current=page]:text-signal"
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <span>{item.label}</span>
                  </Link>
                  {item.href === "/services" && (
                    <ul className="grid grid-cols-2 gap-x-4 pb-4">
                      {stages.map((s) => (
                        <li key={s.slug}>
                          <Link href={`/services/${s.slug}`} onClick={() => setOpen(false)} className="flex gap-2 py-1.5 text-white/75 no-underline">
                            <span className="text-sm tabular-nums text-signal">{s.n}</span>
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-auto grid gap-1 pt-10 text-white/80">
              <a href={`mailto:${site.email}`} className="py-1.5 no-underline">
                {site.email}
              </a>
              <a href={site.phoneHref} className="py-1.5 no-underline">
                {site.phone}
              </a>
            </div>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="caps mt-5 grid h-14 flex-none place-items-center rounded-full bg-signal text-[0.9rem] text-ink no-underline"
            >
              Start a project
            </Link>
          </div>,
          document.body,
        )}
    </>
  );
}
