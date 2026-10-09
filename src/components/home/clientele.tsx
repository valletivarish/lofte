import Image from "next/image";
import { clients } from "@/content/lofte";

/** Our clientele: the logos from loftestudios.com, fading up in sequence. */
export function Clientele() {
  return (
    <section aria-labelledby="clients" className="bg-white">
      <div className="gutter mx-auto max-w-[90rem] py-24 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2
            id="clients"
            data-split
            className="display text-[length:var(--text-display-l)]"
          >
            Our clientele
          </h2>
          <p className="max-w-sm text-muted">
            Localization leaders and growing brands who trust Løfte with their
            content.
          </p>
        </div>
        {/* One row on desktop, hairline dividers, no tiles; multiply drops the logos' baked-in white grounds. */}
        <ul className="mt-14 grid grid-cols-2 border-t border-line/70 sm:grid-cols-4 lg:grid-cols-7">
          {clients.map((c) => (
            <li
              key={c.name}
              data-logo
              className="group grid h-28 place-items-center border-b border-line/70 px-5 last:col-span-2 sm:last:col-span-1 lg:border-b-0 lg:border-r lg:first:border-l"
            >
              <Image
                src={c.logo}
                alt={c.name}
                width={398}
                height={92}
                className="h-auto max-h-11 w-full max-w-[10rem] object-contain opacity-75  grayscale transition-[filter,opacity] duration-500 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
