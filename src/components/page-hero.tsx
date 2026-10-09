import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "./site-header";

/** Inner-page opening: dark band, bracketed label (loftestudios.com convention), masked display title,
 *  and a photo that grows from inset to full width as the page scrolls (data-expand, site-motion). */
export function PageHero({
  crumbs,
  label,
  title,
  lede,
  image,
}: {
  crumbs: { href: string; label: string }[];
  label: string;
  title: string;
  lede?: string;
  image?: { src: string; alt: string };
}) {
  return (
    <div className="on-dark bg-ink text-white">
      <SiteHeader variant="overlay" />
      <section aria-labelledby="page-title">
        <div className="gutter mx-auto max-w-[90rem] pb-16 pt-10 lg:pb-24 lg:pt-16">
          <nav aria-label="Breadcrumb" className="text-sm text-white/60">
            <ol className="flex flex-wrap gap-2">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-white">
                      {c.label}
                    </span>
                  ) : (
                    <Link
                      href={c.href}
                      className="no-underline hover:text-signal"
                    >
                      {c.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <p className="label mt-10 text-signal">({label})</p>
          <h1
            id="page-title"
            data-split
            className="display mt-5 max-w-[15ch] text-[length:var(--text-display-xl)]"
          >
            {title}
          </h1>
          {lede && (
            <p className="measure mt-8 text-lg text-white/80 lg:text-xl">
              {lede}
            </p>
          )}
        </div>
        {image && (
          <div className="relative pb-0">
            <div
              data-expand
              className="relative mx-auto aspect-[4/3] w-full overflow-hidden sm:aspect-[21/9]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                preload
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
