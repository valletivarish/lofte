import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Quotes } from "@phosphor-icons/react/ssr";
import { stages, stageBySlug } from "@/content/lofte";
import { PageHero } from "@/components/page-hero";
import { PillLink } from "@/components/pill-link";

export const dynamicParams = false;

export function generateStaticParams() {
  return stages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = stageBySlug(slug);
  if (!s) return {};
  return {
    title: `${s.name}: ${s.label}`,
    description: s.summary,
    alternates: { canonical: `/services/${s.slug}` },
  };
}


export default async function StagePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = stageBySlug(slug);
  if (!s) notFound();
  const i = stages.indexOf(s);
  const prev = stages[(i - 1 + stages.length) % stages.length];
  const next = stages[(i + 1) % stages.length];

  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { href: `/services/${s.slug}`, label: s.name },
        ]}
        label={`${s.n} · ${s.name}`}
        title={s.label}
        lede={s.intro}
        image={{ src: s.image, alt: "" }}
      />
      <main id="main">
        <section className="gutter mx-auto grid max-w-[90rem] gap-12 py-20 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20 lg:py-28">
          <div className="grid content-start gap-8 lg:sticky lg:top-24 lg:self-start">
            <dl className="grid gap-8">
              <div>
                <dt className="label text-muted">Category</dt>
                <dd className="mt-2 text-[length:var(--text-title)] font-bold">
                  {s.category}
                </dd>
              </div>
              <div>
                <dt className="label text-muted">Services</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {s.services.map((x) => (
                    <span
                      key={x}
                      className="rounded-full border border-ink/30 px-4 py-1.5"
                    >
                      {x}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
            <div>
              <PillLink href="/contact">Start a project</PillLink>
            </div>
          </div>
          <div className="grid gap-16">
            <section aria-labelledby="approach">
              <h2
                id="approach"
                data-split
                className="display text-[length:var(--text-display-m)]"
              >
                Approach
              </h2>
              <div className="measure mt-6 grid gap-5 text-lg">
                {s.approach.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
            <section
              aria-labelledby="challenge"
              data-reveal
              className="rounded-[2rem] bg-white p-8 lg:p-12"
            >
              <h2 id="challenge" className="label text-signal-ink">
                Challenge and solution
              </h2>
              <p className="mt-4 text-[clamp(1.25rem,1rem+0.8vw,1.7rem)] font-semibold leading-snug">
                {s.challenge}
              </p>
            </section>
            <figure
              data-reveal
              className="on-dark relative overflow-hidden rounded-[2rem] bg-ink p-8 text-white lg:p-12"
            >
              <Quotes
                weight="fill"
                className="size-12 text-signal"
                aria-hidden="true"
              />
              <blockquote className="mt-6 max-w-[24ch] text-[clamp(1.8rem,1rem+2.6vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.015em]">
                {s.quote.text}
              </blockquote>
              <figcaption className="mt-6 text-white/70">
                {s.quote.by}
              </figcaption>
            </figure>
            <p className="measure text-lg text-muted">{s.outro}</p>
          </div>
        </section>

        <nav aria-label="Other stages" className="border-t border-line">
          <div className="gutter mx-auto grid max-w-[90rem] sm:grid-cols-2">
            <Link
              href={`/services/${prev.slug}`}
              className="group flex items-center gap-5 py-12 no-underline sm:border-r sm:border-line sm:pr-8"
            >
              <ArrowLeft
                weight="bold"
                className="size-7 transition-transform duration-500 group-hover:-translate-x-1"
                aria-hidden="true"
              />
              <span>
                <span className="label block text-muted">
                  Previous · {prev.n}
                </span>
                <span className="display text-[clamp(1.8rem,1.2rem+1.6vw,2.8rem)] group-hover:text-flare">
                  {prev.name}
                </span>
              </span>
            </Link>
            <Link
              href={`/services/${next.slug}`}
              className="group flex items-center justify-end gap-5 border-t border-line py-12 text-right no-underline sm:border-t-0 sm:pl-8"
            >
              <span>
                <span className="label block text-muted">Next · {next.n}</span>
                <span className="display text-[clamp(1.8rem,1.2rem+1.6vw,2.8rem)] group-hover:text-flare">
                  {next.name}
                </span>
              </span>
              <ArrowRight
                weight="bold"
                className="size-7 transition-transform duration-500 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </nav>
      </main>
    </>
  );
}
