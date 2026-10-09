import type { Metadata } from "next";
import { Clock, MapPin, Phone } from "@phosphor-icons/react/ssr";
import { capabilities, contact, site } from "@/content/lofte";
import { PageHero } from "@/components/page-hero";
import { EnquiryForm } from "@/components/enquiry-form";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.prompt,
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { need } = await searchParams;
  const slugs = capabilities.map((c) => c.slug as string);
  const preselect = (typeof need === "string" ? need.split(",") : []).filter((n) => slugs.includes(n));
  const deliveryReady = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO && process.env.CONTACT_FROM);
  const facts = [
    { icon: MapPin, label: "Location", value: "Jubilee Hills, Road No. 36", sub: `${site.city}, ${site.country}`, href: "https://www.google.com/maps/search/?api=1&query=Jubilee+Hills+Road+No+36+Hyderabad" },
    { icon: Phone, label: "Give us a call", value: site.phone, href: site.phoneHref },
    { icon: Clock, label: "Working hours", value: site.hours },
  ];

  return (
    <>
      <PageHero crumbs={[{ href: "/", label: "Home" }, { href: "/contact", label: "Contact" }]} label="Contact us" title={contact.heading} lede={contact.prompt} />
      <main id="main" className="gutter mx-auto grid max-w-[90rem] gap-14 py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 lg:py-28">
        <div className="grid content-start gap-10">
          {/* The old site's promise and its giant email, kept as the first thing beside the form. */}
          <div>
            <p className="max-w-md text-lg text-muted">{site.promise}</p>
            <a href={`mailto:${site.email}`} className="display mt-4 block break-words text-[clamp(1.7rem,1rem+2.2vw,2.8rem)] no-underline decoration-signal decoration-2 underline-offset-[0.2em] hover:underline">
              {site.email}
            </a>
          </div>
          <ul className="grid content-start gap-3">
            {facts.map((f) => {
              const inner = (
                <>
                  <f.icon weight="light" className="size-9 flex-none text-signal-ink" aria-hidden="true" />
                  <span>
                    <span className="label block text-muted">{f.label}</span>
                    <span className="mt-1 block text-[length:var(--text-title)] font-bold leading-tight">{f.value}</span>
                    {f.sub && <span className="block text-muted">{f.sub}</span>}
                  </span>
                </>
              );
              return (
                <li key={f.label} data-reveal>
                  {f.href ? (
                    <a href={f.href} className="flex items-start gap-5 rounded-3xl bg-white p-6 no-underline transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1" {...(f.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-start gap-5 rounded-3xl bg-white p-6">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        {/* The form leads on phones; the contact facts follow it. */}
        <div className="order-first lg:order-none">
          {!deliveryReady && process.env.NODE_ENV === "development" && (
            <p role="note" className="mb-8 rounded-2xl bg-ink px-5 py-4 text-sm text-white">
              Launch dependency: set RESEND_API_KEY, CONTACT_FROM (verified domain) and CONTACT_TO={site.email}. Until then the form validates and tells visitors nothing was sent.
            </p>
          )}
          <EnquiryForm preselect={preselect} />
        </div>
      </main>
    </>
  );
}
