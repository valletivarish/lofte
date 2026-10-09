"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, CaretDown } from "@phosphor-icons/react";
import { capabilities, nav, stages } from "@/content/lofte";

/** Letters roll up and a fresh copy rolls in behind them (CSS .roll), each a few ms after the last. */
function Roll({ text }: { text: string }) {
  return (
    <span aria-hidden="true" className="roll">
      {[...text].map((ch, i) => (
        <span key={i} style={{ "--d": i } as React.CSSProperties}>
          {ch === " " ? "\u00a0" : ch}
        </span>
      ))}
    </span>
  );
}

/**
 * Desktop nav: plain links whose letters roll on hover, and one dot that glides to whatever is hovered or focused
 * and rests under the current page. Services opens a panel of the six stages with a live photo preview: hover opens
 * it after a short intent delay; click, Enter and Space toggle it; Escape, focus leaving, pointing at another link,
 * or a route change close it.
 */
export function DesktopNav({ tone }: { tone: "light" | "dark" }) {
  const pathname = usePathname();
  const current = nav.findIndex((n) => pathname.startsWith(n.href));
  const [hot, setHot] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [peek, setPeek] = useState(0);
  const [box, setBox] = useState<{ x: number; w: number } | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const timer = useRef<number>(undefined);
  const panelId = useId();
  const active = hot ?? (open ? 1 : current >= 0 ? current : null);

  // Measure only when the highlighted item changes (and on resize or font load); keep the same object when nothing
  // moved, so a measurement can never trigger another render.
  useEffect(() => {
    const measure = () => {
      const el = active === null ? null : (list.current?.children[active] as HTMLElement | undefined);
      const x = el ? el.offsetLeft + el.offsetWidth / 2 : null;
      setBox((b) => (x === null ? null : b?.x === x ? b : { x, w: 0 }));
    };
    const raf = requestAnimationFrame(measure);
    document.fonts?.ready.then(measure);
    addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", measure);
    };
  }, [active]);
  // A route change closes the panel (state reset during render, not in an effect).
  const [path, setPath] = useState(pathname);
  if (path !== pathname) {
    setPath(pathname);
    setOpen(false);
  }

  const later = (fn: () => void, ms: number) => {
    clearTimeout(timer.current);
    timer.current = window.setTimeout(fn, ms);
  };

  const light = tone === "light";
  const item = "group/roll relative flex h-11 items-center gap-1.5 px-4 text-[1rem] font-medium no-underline";

  return (
    <div
      ref={wrap}
      className="relative"
      onPointerLeave={(e) => e.pointerType === "mouse" && later(() => setOpen(false), 220)}
      onPointerEnter={() => clearTimeout(timer.current)}
      onBlur={(e) => !wrap.current?.contains(e.relatedTarget as Node) && setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="relative" onPointerLeave={() => setHot(null)}>
        <span
          aria-hidden="true"
          className={`absolute -bottom-0.5 left-0 size-1.5 rounded-full transition-[translate,opacity] duration-500 ease-[var(--ease-out-expo)] motion-reduce:transition-none ${light ? "bg-white" : "bg-ink"}`}
          style={{ translate: `calc(${box?.x ?? 0}px - 50%) 0`, opacity: box ? 1 : 0 }}
        />
        <ul ref={list} className="flex items-center">
          {nav.map((n, i) => (
            <li
              key={n.href}
              onPointerEnter={(e) => {
                setHot(i);
                // Pointing at another link closes the Services panel.
                if (n.href !== "/services" && e.pointerType === "mouse") later(() => setOpen(false), 120);
              }}
            >
              {n.href === "/services" ? (
                <button
                  ref={toggle}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpen((o) => !o)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && later(() => setOpen(true), 140)}
                  onFocus={() => setHot(i)}
                  aria-label={n.label}
                  className={item}
                >
                  <Roll text={n.label} />
                  <CaretDown weight="bold" className={`size-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
              ) : (
                <Link
                  href={n.href}
                  aria-current={current === i ? "page" : undefined}
                  onFocus={() => setHot(i)}
                  onBlur={() => setHot(null)}
                  aria-label={n.label}
                  className={item}
                >
                  <Roll text={n.label} />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div
        id={panelId}
        hidden={!open}
        className="nav-panel on-dark absolute left-1/2 top-[calc(100%+0.75rem)] z-50 w-[min(60rem,calc(100vw-2rem))] -translate-x-1/2 rounded-[2rem] bg-ink p-3 text-white shadow-[0_40px_90px_-30px_rgb(0_0_0/0.7)]"
      >
        <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-3">
          <div className="px-4 pb-2 pt-4">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-sm text-white/65">Six stages, discover to delivery</p>
              <Link href="/services" className="caps group inline-flex items-center gap-1.5 text-[0.78rem] no-underline hover:text-signal">
                All services
                <ArrowUpRight weight="bold" className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
            <ol className="mt-4">
              {stages.map((s, i) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    aria-current={pathname === `/services/${s.slug}` ? "page" : undefined}
                    onPointerEnter={() => setPeek(i)}
                    onFocus={() => setPeek(i)}
                    className="nav-row group grid grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-2 border-t border-white/10 py-2.5 no-underline"
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <span className="text-sm font-semibold tabular-nums text-signal">{s.n}</span>
                    <span className="flex items-baseline gap-3">
                      <span className="display text-[1.45rem] leading-none transition-colors group-hover:text-signal group-aria-[current=page]:text-signal">{s.name}</span>
                      <span className="truncate text-sm text-white/60">{s.label}</span>
                    </span>
                    <ArrowUpRight
                      weight="bold"
                      className="size-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative min-h-[21rem] overflow-hidden rounded-[1.5rem] bg-coal">
            {stages.map((s, i) => (
              <Image
                key={s.slug}
                src={s.image}
                alt=""
                fill
                sizes="26rem"
                className={`object-cover transition-[opacity,scale] duration-700 ease-[var(--ease-out-expo)] ${i === peek ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
              />
            ))}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(18_19_20/0)_40%,rgb(18_19_20/0.85)_100%)]" />
            <p aria-live="polite" className="absolute inset-x-5 bottom-5 text-[0.95rem] leading-snug">
              <span className="caps block text-[0.72rem] text-signal">
                {stages[peek].n} {stages[peek].name}
              </span>
              <span className="mt-1.5 block">{stages[peek].summary}</span>
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/10 px-4 pb-2 pt-4">
          <span className="mr-2 text-sm text-white/65">Capabilities</span>
          {capabilities.map((c) => (
            <Link key={c.slug} href={`/services#${c.slug}`} className="rounded-full border border-white/25 px-4 py-1.5 text-sm no-underline transition-colors hover:border-white hover:bg-white hover:text-ink">
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
