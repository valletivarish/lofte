import type { Metadata } from "next";
import { about, site } from "@/content/lofte";
import { PageHero } from "@/components/page-hero";
import { PillarTabs } from "@/components/pillar-tabs";
import { Clientele } from "@/components/home/clientele";

export const metadata: Metadata = {
  title: "About us",
  description: `${about.heading}. ${about.lede}`,
  alternates: { canonical: "/about-us" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { href: "/about-us", label: "About us" }]}
        label={about.label}
        title={about.heading}
        lede={about.lede}
        image={{ src: "/images/hero-studio-desk.jpg", alt: "The Løfte studio desk in warm light: monitors, a boom microphone, headphones and colour swatches" }}
      />
      <main id="main">
        <section className="gutter mx-auto grid max-w-[90rem] gap-10 py-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 lg:py-32">
          {/* The old site's "we are / known for / location" block. */}
          <dl className="grid content-start gap-6 lg:sticky lg:top-28 lg:self-start">
            {[
              ["We are", site.weAre],
              ["Known for", site.knownFor],
              ["Location", `${site.coordinates}, ${site.city} / ${site.country}`],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-t border-line pt-4">
                <dt className="text-muted">{k}</dt>
                <dd className="text-lg font-semibold leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
          <p data-fill className="text-[clamp(1.5rem,1rem+1.9vw,2.8rem)] font-semibold leading-[1.2] tracking-[-0.01em]">
            {about.body.split(" ").map((w, i) => (
              <span key={i} data-word>
                {w}{" "}
              </span>
            ))}
          </p>
        </section>

        <section aria-labelledby="why-choose" className="border-t border-line bg-white">
          <div className="gutter mx-auto max-w-[90rem] py-24 lg:py-32">
            <h2 id="why-choose" data-split className="display text-[length:var(--text-display-l)]">
              Why choose Løfte Studios
            </h2>
            <div className="mt-12">
              <PillarTabs />
            </div>
          </div>
        </section>

        <section aria-labelledby="process" className="on-dark bg-ink text-white">
          <div className="gutter mx-auto grid max-w-[90rem] gap-12 py-24 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20 lg:py-32">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="label text-signal">(How it works)</p>
              <h2 id="process" data-split className="display mt-5 text-[length:var(--text-display-l)]">
                Our process
              </h2>
              <p className="mt-6 max-w-sm text-white/75">Seven steps from the first insight to the finished hand-over, on every project.</p>
            </div>
            <ol className="grid">
              {about.process.map((p, i) => (
                <li key={p.name} data-reveal className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-6 border-t border-white/15 py-8 last:border-b">
                  <span className="display text-[2.4rem] leading-none text-signal tabular-nums">#{i + 1}</span>
                  <div>
                    <h3 className="text-[length:var(--text-title)] font-bold">{p.name}</h3>
                    <p className="mt-2 max-w-[52ch] text-white/75">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Clientele />

      </main>
    </>
  );
}
