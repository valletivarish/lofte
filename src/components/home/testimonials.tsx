"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight, Pause, Play } from "@phosphor-icons/react";
import { testimonials } from "@/content/lofte";

gsap.registerPlugin(useGSAP, SplitText);

/**
 * "Trusted by our clients" on the ember field: the page's one orange section after the hero.
 * All quotes share one grid cell, so the block is always as tall as the longest and the controls never jump.
 * Lines leave and arrive through masks. Advances on its own every 6 s (the active segment is the countdown), holds
 * while pointed at, focused or off screen, and has a pause button (WCAG 2.2.2). Reduced motion: no autoplay.
 * Arrows, segment buttons and ←/→ inside the section always work.
 */
export function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const items = useRef<(HTMLElement | null)[]>([]);
  const busy = useRef(false);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true); // the visitor's pause/play choice
  const [held, setHeld] = useState(false); // pointer or focus inside: hold the current quote
  const [inView, setInView] = useState(false);
  const [lap, setLap] = useState(0); // restarts the countdown if a swap could not start
  const n = testimonials.length;

  // Only count down while the section is on screen.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);
  const running = playing && !held && inView;

  const { contextSafe } = useGSAP({ scope: root });
  // Wrapped at call time (an event), so tweens join the component's context and are reverted on unmount.
  const show = (to: number): boolean => contextSafe(() => swap(to))();
  const swap = (to: number) => {
    const next = (to + n) % n;
    if (next === i || busy.current) return false;
    const out = items.current[i]?.querySelector("blockquote");
    const inn = items.current[next];
    if (!out || !inn || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setI(next);
      return true;
    }
    busy.current = true;
    const a = SplitText.create(out, { type: "lines", mask: "lines" });
    gsap.to(a.lines, {
      yPercent: -110,
      duration: 0.35,
      stagger: 0.04,
      ease: "power3.in",
      onComplete: () => {
        a.revert();
        const b = SplitText.create(inn.querySelector("blockquote")!, { type: "lines", mask: "lines" });
        gsap.set(b.lines, { yPercent: 110 });
        setI(next);
        gsap.to(b.lines, {
          yPercent: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: "expo.out",
          onComplete: () => {
            b.revert();
            busy.current = false;
          },
        });
        gsap.fromTo(inn.querySelector("figcaption"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.15, ease: "power3.out" });
      },
    });
    return true;
  };

  const btn = "group grid size-14 place-items-center rounded-full border-[1.5px] border-white/70 transition-colors hover:border-white hover:bg-white hover:text-ink";

  return (
    <section
      ref={root}
      aria-labelledby="trusted"
      aria-roledescription="carousel"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") show(i + 1);
        if (e.key === "ArrowLeft") show(i - 1);
      }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={(e) => (e.target as HTMLElement).matches(":focus-visible") && setHeld(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setHeld(false)}
      className="ember on-dark relative isolate overflow-hidden py-24 text-white lg:py-36"
    >
      <div aria-hidden="true" className="hero-grain" />
      <div className="gutter relative z-10 mx-auto grid max-w-[90rem] gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
        <div className="flex flex-col justify-between gap-10">
          <h2 id="trusted" data-split className="display text-[length:var(--text-display-l)]">
            Trusted by our clients
          </h2>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => show(i - 1)} aria-label="Previous testimonial" className={btn}>
              <ArrowLeft weight="bold" className="size-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>
            <button type="button" onClick={() => show(i + 1)} aria-label="Next testimonial" className={btn}>
              <ArrowRight weight="bold" className="size-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
            <ol className="ml-3 flex gap-1.5">
              {testimonials.map((t, k) => (
                <li key={t.name}>
                  <button
                    type="button"
                    onClick={() => show(k)}
                    aria-label={`Testimonial ${k + 1} of ${n}: ${t.name}, ${t.company}`}
                    aria-current={k === i ? "true" : undefined}
                    className="grid h-11 w-9 place-items-center"
                  >
                    <span className="relative h-1 w-full overflow-hidden rounded-full bg-white/35">
                      {k === i && (
                        // The active segment is the countdown: when its fill ends, the next quote comes in.
                        <span
                          key={`${i}-${lap}`}
                          className="testimonial-timer absolute inset-0 origin-left bg-white"
                          style={{ animationPlayState: running ? "running" : "paused" }}
                          onAnimationEnd={() => !show(i + 1) && setLap((l) => l + 1)}
                        />
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause testimonials" : "Play testimonials"}
              className="testimonial-toggle grid size-11 place-items-center rounded-full text-white/85 hover:text-white"
            >
              {playing ? <Pause weight="fill" className="size-5" /> : <Play weight="fill" className="size-5" />}
            </button>
          </div>
        </div>

        <div className="grid" aria-live="polite">
          {testimonials.map((t, k) => (
            <figure
              key={t.name}
              ref={(el) => {
                items.current[k] = el;
              }}
              aria-hidden={k !== i}
              className={`[grid-area:1/1] ${k === i ? "" : "invisible"}`}
            >
              <blockquote className="display max-w-[18ch] text-[clamp(2.2rem,1rem+4vw,5.2rem)] font-medium leading-[1.02]">“{t.quote}”</blockquote>
              <figcaption className="mt-10 flex items-center gap-4">
                <span className="relative size-16 flex-none overflow-hidden rounded-2xl bg-white p-1.5">
                  <span className="relative block size-full">
                    <Image src={t.logo} alt={`${t.company} logo`} fill sizes="4rem" className="object-contain" />
                  </span>
                </span>
                <span>
                  <span className="block text-lg font-semibold">{t.name}</span>
                  <span className="block text-white/90">{t.company}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
