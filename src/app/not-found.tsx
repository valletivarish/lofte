import { SiteHeader } from "@/components/site-header";
import { PillLink, TextLink } from "@/components/pill-link";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="gutter mx-auto max-w-[90rem] pb-28 pt-20 lg:pt-28">
        <p className="font-semibold text-muted">Page not found</p>
        <h1 className="display mt-4 max-w-[14ch] text-[length:var(--text-display-l)]">That page isn’t here.</h1>
        <p className="measure mt-6 text-lg text-muted">
          The link may be old, or the address may have a typo. The services and the enquiry form are both one step away.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <PillLink href="/services">Explore the services</PillLink>
          <TextLink href="/contact">Start a project</TextLink>
        </div>
      </main>
    </>
  );
}
