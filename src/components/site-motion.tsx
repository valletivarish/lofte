"use client";

import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const $ = <T extends Element = HTMLElement>(sel: string) =>
  gsap.utils.toArray<T>(sel);

/**
 * One motion director for the whole site. Pages render finished, static markup with data-* hooks;
 * this wires the Dribbble-derived patterns on top. Nothing runs under reduced motion, so content never
 * depends on JS to become visible.
 */
export function SiteMotion() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Headings: lines rise out of masks.
        $("[data-split]").forEach((el) => {
          const split = SplitText.create(el, { type: "lines", mask: "lines" });
          gsap.from(split.lines, {
            yPercent: 105,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });

        // Statements: words fill from faint to full as they cross the viewport (Fluke).
        $("[data-fill]").forEach((el) => {
          const words = el.querySelectorAll("[data-word]");
          gsap.fromTo(
            words,
            { opacity: 0.14 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "bottom 45%",
                scrub: true,
              },
            },
          );
          const pills = el.querySelectorAll("[data-pill]");
          if (pills.length)
            gsap.from(pills, {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.9,
              ease: "expo.out",
              stagger: 0.15,
              scrollTrigger: { trigger: el, start: "top 75%" },
            });
        });

        // Generic reveals.
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 88%",
          onEnter: (batch) =>
            gsap.from(batch, {
              y: 40,
              autoAlpha: 0,
              duration: 1,
              ease: "expo.out",
              stagger: 0.12,
            }),
        });
        ScrollTrigger.batch("[data-logo]", {
          start: "top 92%",
          onEnter: (batch) =>
            gsap.from(batch, {
              y: 30,
              autoAlpha: 0,
              duration: 0.8,
              ease: "expo.out",
              stagger: 0.06,
            }),
        });

        // Marquee rows: endless, opposite directions; scroll velocity speeds them up (PixelCut v1 columns).
        const loops = $("[data-marquee]").map((row) =>
          gsap.fromTo(
            row,
            { xPercent: row.dataset.marquee === "rev" ? -50 : 0 },
            {
              xPercent: row.dataset.marquee === "rev" ? 0 : -50,
              duration: 38,
              ease: "none",
              repeat: -1,
            },
          ),
        );
        if (loops.length) {
          ScrollTrigger.create({
            onUpdate: (self) => {
              const boost = gsap.utils.clamp(
                1,
                5,
                1 + Math.abs(self.getVelocity()) / 400,
              );
              loops.forEach((l) =>
                gsap.to(l, {
                  timeScale: boost,
                  duration: 0.2,
                  overwrite: true,
                  onComplete: () =>
                    void gsap.to(l, { timeScale: 1, duration: 1.2 }),
                }),
              );
            },
          });
        }

        // Curtain: the hero holds while the page slides up over it (Frame Core).
        const hero = document.querySelector<HTMLElement>(".hero");
        const curtain = document.querySelector<HTMLElement>("[data-curtain]");
        if (hero && curtain) {
          ScrollTrigger.create({
            trigger: hero,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
          });
          gsap.fromTo(
            curtain,
            { clipPath: "inset(0% 3% 0% 3% round 28px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 0px)",
              ease: "none",
              scrollTrigger: {
                trigger: curtain,
                start: "top bottom",
                end: "top 20%",
                scrub: true,
              },
            },
          );
        }

        // Inner-page hero photos grow from inset to full width (Frame Core / Chapeaux).
        $("[data-expand]").forEach((el) =>
          gsap.fromTo(
            el,
            { clipPath: "inset(0% 5% 0% 5% round 32px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 0px)",
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                end: "top 25%",
                scrub: true,
              },
            },
          ),
        );
      });

      // Desktop-only interactions.
      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 1024px)",
        () => {
          // Six stages: pinned sideways track with a progress bar.
          const section = document.querySelector<HTMLElement>("[data-stages]");
          const track = document.querySelector<HTMLElement>(
            "[data-stages-track]",
          );
          if (section && track) {
            track.classList.add("is-track");
            const distance = () =>
              Math.max(0, track.scrollWidth - window.innerWidth);
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${distance()}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
              },
            });
            tl.to(track, { x: () => -distance(), ease: "none" }, 0).to(
              "[data-stages-progress]",
              { scaleX: 1, ease: "none" },
              0,
            );
            return () => track.classList.remove("is-track");
          }
        },
      );

      // Fonts and images shift layout after first paint; re-measure once they settle.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
