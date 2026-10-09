import type { Metadata, Viewport } from "next";
import { dmSans, manrope } from "./fonts";
import { site } from "@/content/lofte";
import { SiteFooter } from "@/components/site-footer";
import { StickyNav } from "@/components/sticky-nav";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteMotion } from "@/components/site-motion";
import "./globals.css";

/* Design contract (impeccable). Kept in source, not shipped in the HTML.
THESIS: The PixelCut hero, rebuilt for Løfte: an orange editing suite, the site's own line "Side-kick for all content needs", six discipline callouts on arcs, and a base bar of true offer facts instead of invented stats.
OWN-WORLD: orange-lit studio photograph over a textured ember field, DM Sans display set mixed case and tight, Manrope text, ink pills with white arrow discs, outlined glass callouts, loftestudios.com's light/black rhythm with black-and-white photography and one orange accent.
STORY: see what Løfte makes, watch the disciplines scroll, read why the studio exists, pick a capability, walk the six stages, see the clientele and what they say, get in touch.
FIRST VIEWPORT: full-bleed editor photo; logo + uppercase nav + Start a project pill; two-line headline centred; offer line; Explore our services pill; six callouts on concentric arcs with waveform bars; five-fact base bar.
FORM: user-pinned Dribbble shot 27526976 reproduced, content from loftestudios.com; motion from 7 animated Dribbble studio sites (research in scratchpad/dribbble-motion); seed 55b1bce2.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
*/

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Løfte Studios · Side-kick for all content needs", template: "%s · Løfte Studios" },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  robots: site.indexing ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { type: "website", siteName: site.name, locale: "en_IN", title: "Løfte Studios · Side-kick for all content needs", description: site.description, url: "/" },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#3a1004", colorScheme: "light" };

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  description: site.description,
  address: { "@type": "PostalAddress", streetAddress: "Road No. 36, Jubilee Hills", addressLocality: site.city, addressCountry: "IN" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${dmSans.variable} ${manrope.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <StickyNav />
        <SiteFooter />
        <SmoothScroll />
        <SiteMotion />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
