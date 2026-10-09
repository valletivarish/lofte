import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { stages } from "@/content/lofte";

/** "Why Løfte Studios": the six stages. Desktop pins and scrubs sideways (Frame Core pattern); phones get the vertical list. */
export function StagesTrack() {
  return (
    <section data-stages aria-labelledby="why" className="on-dark relative overflow-hidden bg-ink text-white">
      <div data-stages-pin className="flex min-h-[100svh] flex-col justify-center py-20 lg:py-16">
        <div className="gutter mx-auto flex w-full max-w-[90rem] flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-signal">(What we offer)</p>
            <h2 id="why" data-split className="display mt-5 text-[length:var(--text-display-l)]">
              Why Løfte Studios
            </h2>
          </div>
          <div className="hidden w-64 lg:block" aria-hidden="true">
            <div className="h-[3px] w-full bg-white/15">
              <div data-stages-progress className="h-full origin-left scale-x-0 bg-signal" />
            </div>
            <p className="mt-3 text-sm text-white/70">Six stages, discover to delivery</p>
          </div>
        </div>
        <ol data-stages-track className="gutter mt-12 grid gap-4 lg:mt-16 lg:gap-6">
          {stages.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-white/15 bg-white/[0.03] p-7 no-underline transition-colors duration-500 hover:border-signal hover:bg-signal hover:text-ink lg:min-h-[28rem] lg:p-9"
              >
                <span className="flex items-start justify-between">
                  <span className="display text-[3.2rem] leading-none text-signal tabular-nums transition-colors group-hover:text-ink">{s.n}</span>
                  <ArrowUpRight weight="bold" className="size-7 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
                </span>
                <span className="mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-white/60 group-hover:text-ink/70">{s.label}</span>
                <span className="display mt-2 text-[2.2rem]">{s.name}</span>
                <span className="mt-4 text-white/80 group-hover:text-ink">{s.summary}</span>
                <span className="mt-auto flex flex-wrap gap-2 pt-8">
                  {s.services.map((x) => (
                    <span key={x} className="rounded-full border border-white/25 px-3 py-1 text-sm group-hover:border-ink/40">
                      {x}
                    </span>
                  ))}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
