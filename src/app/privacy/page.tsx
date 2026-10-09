import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/lofte";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What this website does with information, written plainly.",
  alternates: { canonical: "/privacy" },
};

const open = [
  "How long enquiries are kept, and who can read them.",
  "The legal basis for processing under India's Digital Personal Data Protection Act, 2023, and any other applicable jurisdictions.",
  "How someone asks for their data to be corrected or deleted, and where they write to.",
  "The registered business name and address to publish.",
  "Whether any analytics will be added, and on what consent basis.",
];

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
      <PageIntro title="Privacy." lede="What this website currently does with information, written plainly so it can be checked against a real policy." />
        <div className="gutter mx-auto max-w-[90rem] pb-24">
        <p role="note" className="measure rounded-lg border-[1.5px] border-ink bg-surface px-5 py-4">
          This is a factual description of the site as built, not a reviewed privacy policy. Lofte Studios LLP and its advisers will replace it before launch.
        </p>
        <div className="measure mt-12 grid gap-12">
          <section>
            <h2 className="text-[length:var(--text-title)] font-bold">What the site collects</h2>
            <p className="mt-3">
              Only what someone chooses to type into the enquiry form: name, work email, company, an optional website, the kinds of help they need, an optional budget range, timing, and a project summary.
            </p>
          </section>
          <section>
            <h2 className="text-[length:var(--text-title)] font-bold">Where it goes</h2>
            <p className="mt-3">
              Submissions are sent by email to the studio inbox through an email delivery provider. No database stores them, and no customer-relationship or marketing tool is connected. When delivery is not configured, nothing is sent anywhere, and the form says so instead of reporting success.
            </p>
          </section>
          <section>
            <h2 className="text-[length:var(--text-title)] font-bold">Analytics and cookies</h2>
            <p className="mt-3">
              This site sets no cookies and loads no analytics, advertising, or tracking scripts, so there is no consent banner. Fonts and images are served from this site. The contact page links to Google Maps only when you choose to open it.
            </p>
          </section>
          <section>
            <h2 className="text-[length:var(--text-title)] font-bold">Still to be decided</h2>
            <ul className="mt-3 grid list-disc gap-2 pl-5">
              {open.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </section>
          {site.email && (
            <p>
              Questions: <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          )}
        </div>
        </div>
      </main>
    </>
  );
}
