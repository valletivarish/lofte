import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/content/work";
import { capabilities } from "@/content/lofte";

const capName = (slug: string) => capabilities.find((c) => c.slug === slug)?.name ?? slug;

export function WorkGrid({ items, className = "" }: { items: CaseStudy[]; className?: string }) {
  return (
    <ul className={`grid gap-x-8 gap-y-14 md:grid-cols-2 ${className}`}>
      {items.map((c) => (
        <li key={c.slug}>
          <Link href={`/work/${c.slug}`} className="group grid gap-4 no-underline">
            <div className="overflow-hidden rounded-[var(--radius-media)]">
              <Image
                src={c.cover.src}
                alt={c.cover.alt}
                width={c.cover.width}
                height={c.cover.height}
                sizes="(min-width: 48rem) 50vw, 100vw"
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.02]"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-muted">
                {c.client}
                {c.status === "draft" && <span className="ml-2 rounded-full bg-ink px-2 py-0.5 text-xs text-white">Draft, local only</span>}
              </p>
              <h3 className="mt-1 text-[length:var(--text-title)] font-bold leading-tight group-hover:underline">{c.title}</h3>
              <p className="mt-2 text-muted">{c.summary}</p>
            </div>
            <ul className="flex flex-wrap gap-2" aria-label="Capabilities">
              {c.capabilities.map((cap) => (
                <li key={cap} className="caps rounded-full border border-edge px-3 py-1 text-[0.72rem] font-medium">
                  {capName(cap)}
                </li>
              ))}
            </ul>
          </Link>
        </li>
      ))}
    </ul>
  );
}
