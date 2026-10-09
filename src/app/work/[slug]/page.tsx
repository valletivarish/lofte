import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/content/work";
import { capabilities } from "@/content/lofte";
import { SiteHeader } from "@/components/site-header";
import { WorkGrid } from "@/components/work-grid";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.summary,
    alternates: { canonical: `/work/${c.slug}` },
    ...(c.status === "draft" ? { robots: { index: false, follow: false } } : {}),
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-line py-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
      <h2 className="text-[length:var(--text-title)] font-bold">{title}</h2>
      <div className="measure text-lg">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  if (!c) notFound();
  const outcome = c.permission.results ? c.outcome : undefined;
  const related = caseStudies.filter((x) => x.slug !== c.slug).slice(0, 2);

  return (
    <>
      <SiteHeader />
      <main id="main">
        <div className="gutter mx-auto max-w-[90rem] pb-24">
        {c.status === "draft" && (
          <p role="note" className="mt-6 rounded-lg bg-ink px-4 py-3 text-sm text-white">
            Draft, visible in local development only. It is excluded from production builds, the sitemap and search.
          </p>
        )}
        <header className="pb-12 pt-12 lg:pt-20">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/work" className="no-underline hover:underline">
              Work
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{c.client}</span>
          </nav>
          <h1 className="display mt-6 max-w-[18ch] text-[length:var(--text-display-l)]">{c.title}</h1>
          <p className="measure mt-8 text-lg text-muted lg:text-xl">{c.summary}</p>
          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            <div>
              <dt className="text-sm font-semibold text-muted">Client</dt>
              <dd className="mt-1 font-semibold">{c.permission.credit ? c.client : "Name withheld at the client's request"}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-semibold text-muted">Capabilities</dt>
              <dd className="mt-1 font-semibold">{c.capabilities.map((k) => capabilities.find((x) => x.slug === k)?.name ?? k).join(", ")}</dd>
            </div>
          </dl>
        </header>
        <Image
          src={c.cover.src}
          alt={c.cover.alt}
          width={c.cover.width}
          height={c.cover.height}
          preload
          sizes="(min-width: 90rem) 84rem, 100vw"
          className="aspect-[21/9] w-full rounded-[var(--radius-media)] object-cover"
        />

        <div className="mt-12">
          {c.challenge && <Block title="The challenge"><p>{c.challenge}</p></Block>}
          {c.audience && <Block title="Audience"><p>{c.audience}</p></Block>}
          {c.role && <Block title="Our role"><p>{c.role}</p></Block>}
          {c.approach?.length ? (
            <Block title="Approach">
              <ol className="grid list-decimal gap-3 pl-5">
                {c.approach.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ol>
            </Block>
          ) : null}
          {c.media?.length ? (
            <section className="grid gap-8 border-t border-line py-10">
              <h2 className="text-[length:var(--text-title)] font-bold">The work</h2>
              {c.media.map((m) => (
                <figure key={m.src} className="grid gap-3">
                  <Image src={m.src} alt={m.alt} width={m.width} height={m.height} sizes="100vw" className="w-full rounded-[var(--radius-media)]" />
                  {m.caption && <figcaption className="text-sm text-muted">{m.caption}</figcaption>}
                </figure>
              ))}
            </section>
          ) : null}
          {c.deliverables?.length ? (
            <Block title="Deliverables">
              <ul className="grid gap-2">
                {c.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </Block>
          ) : null}
          {outcome && (
            <Block title="Result">
              <p className="display text-[length:var(--text-display-m)]">{outcome.value}</p>
              <p className="mt-2 font-semibold">{outcome.label}</p>
              <p className="mt-3 text-base text-muted">
                {outcome.context} Source: {outcome.source}. Period: {outcome.period}.
              </p>
            </Block>
          )}
          {c.credits?.length ? (
            <Block title="Credits">
              <dl className="grid gap-2 sm:grid-cols-2">
                {c.credits.map((cr) => (
                  <div key={cr.role + cr.name}>
                    <dt className="text-sm text-muted">{cr.role}</dt>
                    <dd className="font-semibold">{cr.name}</dd>
                  </div>
                ))}
              </dl>
            </Block>
          ) : null}
        </div>

        {related.length > 0 && (
          <section aria-labelledby="more" className="border-t border-line pt-14">
            <h2 id="more" className="display text-[length:var(--text-display-m)]">
              More work
            </h2>
            <WorkGrid items={related} className="mt-10" />
          </section>
        )}
        </div>
      </main>
    </>
  );
}
