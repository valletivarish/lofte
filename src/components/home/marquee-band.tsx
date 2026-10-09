import { disciplineRows } from "@/content/lofte";

/** The site's own discipline marquee: two rows, opposite directions. Speed follows scroll velocity (home-motion). */
export function MarqueeBand() {
  return (
    <section aria-label="Disciplines" className="on-dark overflow-hidden bg-ink py-8 text-white lg:py-10">
      <h2 className="sr-only">What we do</h2>
      <ul className="sr-only">
        {disciplineRows.flat().map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
      {disciplineRows.map((row, r) => (
        <div key={r} data-marquee={r ? "rev" : "fwd"} aria-hidden="true" className={`flex w-max gap-3 ${r ? "mt-3" : ""}`}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-3">
              {row.map((word, i) => (
                <span
                  key={word + copy}
                  className={`caps whitespace-nowrap rounded-full border px-6 py-3 text-[clamp(0.95rem,0.7rem+0.8vw,1.35rem)] ${
                    (i + r * 3) % 7 === 2 ? "border-signal bg-signal text-ink" : "border-white/35"
                  }`}
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
