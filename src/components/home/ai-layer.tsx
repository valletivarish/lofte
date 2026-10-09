import { aiLayer } from "@/content/lofte";

/** The studio's AI offer, in the client's own words: one statement, the four verbs, the three areas it covers. */
export function AiLayer() {
  return (
    <section aria-labelledby="ai-layer" className="on-dark bg-ink text-white">
      <div className="gutter mx-auto grid max-w-[90rem] gap-12 py-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-20 lg:py-32">
        <div>
          <p className="label text-signal">For AI products</p>
          <h2 id="ai-layer" data-split className="display mt-5 max-w-[18ch] text-[length:var(--text-display-l)]">
            {aiLayer.heading}
          </h2>
          <p className="mt-8 max-w-[46ch] text-lg text-white/80 lg:text-xl">{aiLayer.body}</p>
        </div>
        <div>
          <ul className="grid">
            {aiLayer.verbs.map((v) => (
              <li key={v} data-reveal className="display border-t border-white/15 py-4 text-[clamp(1.8rem,1.2rem+1.6vw,2.8rem)] last:border-b">
                {v}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-white/60">Across</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {aiLayer.across.map((a) => (
              <li key={a} className="rounded-full bg-signal px-4 py-1.5 font-semibold text-ink">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
