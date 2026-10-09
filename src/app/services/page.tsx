import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { capabilities, servicesIntro, stages } from "@/content/lofte";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Services",
  description: servicesIntro.body,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }]}
        label={servicesIntro.label}
        title={servicesIntro.heading}
        lede={servicesIntro.sub}
      />
      <main id="main">
        <section className="gutter mx-auto max-w-[90rem] py-24 lg:py-32">
          <p data-fill className="max-w-[40ch] text-[clamp(1.5rem,1rem+1.9vw,2.8rem)] font-semibold leading-[1.2] tracking-[-0.01em]">
            {servicesIntro.body.split(" ").map((w, i) => (
              <span key={i} data-word>
                {w}{" "}
              </span>
            ))}
          </p>
        </section>

        <section aria-labelledby="caps" className="gutter mx-auto max-w-[90rem] pb-24 lg:pb-32">
          <h2 id="caps" data-split className="display text-[length:var(--text-display-l)]">
            Copy, video, visual, <span className="text-flare">audio</span>
          </h2>
          <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:gap-6">
            {capabilities.map((c, i) => (
              <li key={c.slug} id={c.slug} data-reveal className="group relative scroll-mt-24 overflow-hidden rounded-[2rem] bg-ink text-white">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={c.image}
                    alt={c.alt}
                    fill
                    sizes="(min-width: 48rem) 50vw, 100vw"
                    className="object-cover grayscale transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                </div>
                <div className="on-dark absolute inset-x-0 bottom-0 p-7 lg:p-9">
                  <p className="text-sm font-semibold text-signal tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="display mt-2 text-[clamp(2.4rem,1.6rem+2.4vw,3.8rem)]">{c.name}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${c.name} disciplines`}>
                    {c.disciplines.map((d) => (
                      <li key={d} className="rounded-full border border-white/40 px-3 py-1 text-sm backdrop-blur-sm">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="stages" className="on-dark bg-ink text-white">
          <div className="gutter mx-auto max-w-[90rem] py-24 lg:py-32">
            <p className="label text-signal">(Six stages)</p>
            <h2 id="stages" data-split className="display mt-5 text-[length:var(--text-display-l)]">
              From discover to delivery
            </h2>
            <ol className="mt-14">
              {stages.map((s) => (
                <li key={s.slug} data-reveal className="border-t border-white/15 last:border-b">
                  <Link
                    href={`/services/${s.slug}`}
                    className="group grid items-center gap-4 py-8 no-underline lg:grid-cols-[6rem_minmax(0,1.1fr)_minmax(0,1fr)_3.5rem] lg:gap-10"
                  >
                    <span className="display text-[1.6rem] text-signal tabular-nums">{s.n}</span>
                    <span>
                      <span className="block text-sm font-semibold uppercase tracking-[0.12em] text-white/60">{s.label}</span>
                      <span className="display mt-1 block text-[clamp(2.2rem,1.4rem+2.6vw,4rem)] transition-[color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-3 group-hover:text-signal">
                        {s.name}
                      </span>
                    </span>
                    <span className="text-white/75">{s.summary}</span>
                    <span
                      aria-hidden="true"
                      className="hidden size-14 place-items-center rounded-full border-[1.5px] border-white/60 transition-all duration-500 group-hover:rotate-45 group-hover:border-signal group-hover:bg-signal group-hover:text-ink lg:grid"
                    >
                      <ArrowUpRight weight="bold" className="size-6" />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
    </>
  );
}
