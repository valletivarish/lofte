"use client";

import { useRef, useState } from "react";
import { about } from "@/content/lofte";

/** Mission / Vision / Core values, as on loftestudios.com. WAI-ARIA tabs with arrow-key support. */
export function PillarTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: React.KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (active + d + about.pillars.length) % about.pillars.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Why choose Løfte Studios" className="flex flex-wrap gap-2" onKeyDown={onKey}>
        {about.pillars.map((p, i) => (
          <button
            key={p.name}
            ref={(el) => void (tabs.current[i] = el)}
            role="tab"
            id={`tab-${i}`}
            aria-selected={active === i}
            aria-controls={`panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className="caps h-12 rounded-full border-[1.5px] border-ink px-6 text-[0.85rem] transition-colors aria-selected:bg-ink aria-selected:text-white"
          >
            {p.name}
          </button>
        ))}
      </div>
      {about.pillars.map((p, i) => (
        <div key={p.name} role="tabpanel" id={`panel-${i}`} aria-labelledby={`tab-${i}`} hidden={active !== i} className="mt-10">
          <ul className="grid gap-4 md:grid-cols-3">
            {p.items.map((item, k) => (
              <li key={item.title} className="flex flex-col rounded-3xl bg-white p-7 lg:p-8">
                <span className="display text-[2.4rem] leading-none text-flare tabular-nums">{String(k + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 text-[length:var(--text-title)] font-bold">{item.title}</h3>
                <p className="mt-3 text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
