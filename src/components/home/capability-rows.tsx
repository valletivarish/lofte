import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { capabilities, powerhouse } from "@/content/lofte";

/** Huge uppercase capability rows (Pixel29 / FORME pattern). Hover or focus: the word turns accent and a tilted
 *  photo opens inside the row's empty middle column, so it never covers text or outlives the pointer.
 *  Touch and small screens get the photo inline below. */
export function CapabilityRows() {
  return (
    <section aria-labelledby="capabilities" className="relative border-t border-line">
      <div className="gutter mx-auto max-w-[90rem] pt-24 lg:pt-32">
        <p className="label text-signal-ink">(About Løfte)</p>
        <h2 id="capabilities" data-fill className="mt-6 max-w-[30ch] text-[clamp(1.6rem,1rem+2.2vw,3.1rem)] font-semibold leading-[1.18] tracking-[-0.01em]">
          {powerhouse.lead.split(" ").map((w, i) => (
            <span key={i} data-word>
              {w}{" "}
            </span>
          ))}
          <span className="text-flare">
            {powerhouse.accent.split(" ").map((w, i) => (
              <span key={i} data-word>
                {w}{" "}
              </span>
            ))}
          </span>
          {powerhouse.tail.split(" ").map((w, i) => (
            <span key={i} data-word>
              {w}{" "}
            </span>
          ))}
        </h2>
      </div>
      <ul className="gutter mx-auto mt-16 max-w-[90rem] pb-24 lg:pb-32">
        {capabilities.map((c) => (
          <li key={c.slug} className="border-t border-ink/80 last:border-b">
            <Link
              href={`/services#${c.slug}`}
              className="group relative grid items-center gap-4 py-6 no-underline lg:grid-cols-[minmax(0,1fr)_12rem_minmax(0,19rem)_3.5rem] lg:gap-8 lg:py-8"
            >
              <span className="display text-[clamp(3rem,1rem+7vw,8.5rem)] leading-[0.85] transition-[color,translate] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-3 group-hover:text-flare group-focus-visible:text-flare">
                {c.name}
              </span>
              <span aria-hidden="true" className="caprow-photo relative hidden aspect-[4/3] w-full overflow-hidden rounded-2xl lg:block">
                <Image src={c.image} alt="" fill sizes="12rem" className="object-cover" />
              </span>
              <span className="text-muted lg:text-lg">{c.disciplines.join(" · ")}</span>
              <span aria-hidden="true" className="hidden size-14 place-items-center rounded-full border-[1.5px] border-ink transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:bg-ink group-hover:text-white lg:grid">
                <ArrowUpRight weight="bold" className="size-6" />
              </span>
              <span className="relative aspect-[16/9] overflow-hidden rounded-xl lg:hidden">
                <Image src={c.image} alt={c.alt} fill sizes="100vw" className="object-cover grayscale" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
