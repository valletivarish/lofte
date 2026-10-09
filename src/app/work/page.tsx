import type { Metadata } from "next";
import { caseStudies } from "@/content/work";
import { PageHero } from "@/components/page-hero";
import { PillLink } from "@/components/pill-link";
import { WorkGrid } from "@/components/work-grid";
import { Clientele } from "@/components/home/clientele";
import { Testimonials } from "@/components/home/testimonials";

export const metadata: Metadata = {
  title: "Work",
  description: "Løfte Studios clientele and what clients say. Case studies are published once each client approves them.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { href: "/work", label: "Work" }]}
        label="Portfolio"
        title="Work that moves brands"
        lede="Localization leaders and growing brands trust Løfte with their content. Full case studies are published here once each client approves the work and the credit."
      />
      <main id="main">
        {caseStudies.length > 0 ? (
          <section className="gutter mx-auto max-w-[90rem] py-24">
            <WorkGrid items={caseStudies} />
          </section>
        ) : (
          <section className="gutter mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-8 py-20">
            <p className="max-w-xl text-lg text-muted">Case studies are being prepared with our clients. Until they sign off, here is who we work with and what they say.</p>
            <PillLink href="/contact">Start a project</PillLink>
          </section>
        )}
        <Testimonials />
        <Clientele />
      </main>
    </>
  );
}
