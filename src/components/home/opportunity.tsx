import Image from "next/image";
import { opportunity } from "@/content/lofte";
import { PillLink } from "../pill-link";

/** "We saw an opportunity": the statement scrubs from faint to ink as it scrolls; inline image pills open inside the sentence. */
export function Opportunity() {
  const pill = (src: string, alt: string) => (
    <span data-pill className="relative mx-[0.12em] inline-block h-[0.82em] w-[1.9em] translate-y-[0.1em] overflow-hidden rounded-full align-baseline">
      <Image src={src} alt={alt} fill sizes="120px" className="object-cover grayscale" />
    </span>
  );
  const words = (text: string) =>
    text.split(" ").map((w, i) => (
      <span key={i} data-word className="inline">
        {w}{" "}
      </span>
    ));

  return (
    <section aria-labelledby="opportunity" className="gutter mx-auto max-w-[90rem] py-24 lg:py-36">
      <p className="label text-signal-ink">({opportunity.label})</p>
      <h2 id="opportunity" data-split className="display mt-6 max-w-[16ch] text-[length:var(--text-display-l)]">
        {opportunity.heading}
      </h2>
      <p data-fill className="mt-12 max-w-[38ch] text-[clamp(1.6rem,1rem+2.2vw,3.1rem)] font-semibold leading-[1.18] tracking-[-0.01em]">
        {words("Businesses often struggle to find")}
        {pill("/images/service-words.jpg", "")}
        {words("high-quality, yet affordable, content and design")}
        {pill("/images/service-visual.jpg", "")}
        {words("solutions.")}
        <span data-word className="inline">
          That’s why{" "}
        </span>
        <span data-word className="inline-block rounded-full bg-signal px-[0.35em] text-ink">
          Løfte Studios
        </span>{" "}
        {words("exists.")}
      </p>
      <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
        <div data-reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image src="/images/worktable.jpg" alt="A studio work table: script pages, headphones and a colour proof" fill sizes="(min-width: 64rem) 40vw, 100vw" className="object-cover grayscale" />
        </div>
        <div data-reveal className="self-end">
          <p className="measure text-lg text-muted lg:text-xl">{opportunity.body}</p>
          <div className="mt-8">
            <PillLink href="/contact">Contact us</PillLink>
          </div>
        </div>
      </div>
    </section>
  );
}
