import Link from "next/link";
import { ArrowRight, ArrowUp, ArrowUpRight } from "@phosphor-icons/react/ssr";
import { nav, site, stages } from "@/content/lofte";
import { Wordmark } from "./wordmark";
import { HideOn } from "./hide-on";
import { StudioClock } from "./studio-clock";

const col = "label text-white/60";
const link = "inline-block py-1 text-white/85 no-underline hover:text-signal";

/**
 * One of the panel's three ways to reach the studio. Hover or focus: a white hairline draws across the row's
 * bottom edge, the value eases right, the label brightens and the arrow disc fills (premium: ~0.5 s, ease-out).
 */
function Action({
  href,
  label,
  value,
  external,
}: {
  href: string;
  label: string;
  value: string;
  external?: boolean;
}) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const ease =
    "duration-500 ease-[var(--ease-out-expo)] motion-reduce:transition-none";
  const inner = (
    <>
      <span
        className={`w-20 flex-none text-sm text-white/70 transition-colors ${ease} group-hover:text-white group-focus-visible:text-white`}
      >
        {label}
      </span>
      <span
        className={`display min-w-0 flex-1 truncate text-[clamp(1.15rem,0.8rem+0.9vw,1.75rem)] transition-transform ${ease} group-hover:translate-x-2.5 group-focus-visible:translate-x-2.5`}
      >
        {value}
      </span>
      <span
        aria-hidden="true"
        className={`grid size-11 flex-none place-items-center rounded-full border-[1.5px] border-white/60 transition-colors ${ease} group-hover:border-white group-hover:bg-white group-hover:text-ink group-focus-visible:border-white group-focus-visible:bg-white group-focus-visible:text-ink`}
      >
        <Icon
          weight="bold"
          className={`size-5 transition-transform ${ease} ${external ? "group-hover:rotate-45" : "group-hover:translate-x-0.5"}`}
        />
      </span>
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-0 bg-white transition-transform ${ease} group-hover:scale-x-100 group-focus-visible:scale-x-100`}
      />
    </>
  );
  const cls =
    "group relative flex items-center gap-4 border-b border-white/30 py-5 no-underline first:border-t";
  return external || href.startsWith("mailto:") || href.startsWith("tel:") ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/**
 * Closing panel on the ember field (the studio's own closing line and three ways in), then an ink directory with
 * the live studio clock. On /contact the panel steps aside for the form.
 */
export function SiteFooter() {
  return (
    <footer data-footer className="on-dark relative z-20 text-white">
      <HideOn path="/contact">
        <section
          aria-labelledby="footer-cta"
          className="ember relative isolate -mt-10 overflow-hidden rounded-t-[2.5rem] lg:-mt-14 lg:rounded-t-[3.5rem]"
        >
          <div aria-hidden="true" className="hero-grain" />
          <div className="gutter relative z-10 mx-auto grid max-w-[90rem] gap-12 py-20 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-end lg:gap-20 lg:py-28">
            <h2
              id="footer-cta"
              data-split
              className="display max-w-[16ch] text-[clamp(2.4rem,1rem+4.4vw,5.6rem)] leading-[0.98]"
            >
              {site.closing[0]} {site.closing[1]}.
            </h2>
            <div className="grid">
              <Action
                href="/contact"
                label="Brief us"
                value="Start a project"
              />
              <Action
                href={`mailto:${site.email}`}
                label="Email"
                value={site.email}
                external
              />
              <Action
                href={site.phoneHref}
                label="Call"
                value={site.phone}
                external
              />
            </div>
          </div>
        </section>
      </HideOn>

      <div className="bg-ink">
        <div className="gutter mx-auto max-w-[90rem] pb-10 pt-16 lg:pt-20">
          <div className="grid gap-12 md:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,1fr))]">
            <div className="max-w-xs">
              <Wordmark tone="light" />
              <p className="mt-5 text-white/70">{site.tagline}.</p>
            </div>
            <nav aria-label="Footer">
              <h2 className={col}>Studio</h2>
              <ul className="mt-4 grid gap-1">
                {[{ href: "/", label: "Home" }, ...nav].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={link}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Services">
              <h2 className={col}>Services</h2>
              <ul className="mt-4 grid gap-1">
                {stages.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className={link}>
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <h2 className={col}>Visit</h2>
              <p className="mt-4 text-white/85">{site.address}</p>
              <p className="mt-2 text-white/60">{site.hours}</p>
              <div className="mt-5">
                <StudioClock />
              </div>
            </div>
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 text-sm text-white/60">
            <p>
              © {new Date().getFullYear()} Løfte by {site.legalName}. All rights
              reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="py-2 text-white/85 no-underline hover:text-signal"
              >
                Privacy
              </Link>
              <span className="tabular-nums">{site.coordinates}</span>
              <a
                href="#"
                className="group inline-flex items-center gap-2 py-2 text-white/85 no-underline hover:text-signal"
              >
                Back to top
                <ArrowUp
                  weight="bold"
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
