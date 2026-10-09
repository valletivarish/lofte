# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript, GSAP 3 (ScrollTrigger, SplitText) with Lenis for motion. Chosen by the user on 2026-09-29. The authoritative business source is the live WordPress site **https://loftestudios.com/**; its source code is unavailable, so the site is rebuilt from scratch in this folder. All copy lives in `src/content/lofte.ts`.

## Users

Brands and marketing teams that need a steady supply of content across formats and languages (“growing brands” in the studio’s own words), plus localization and language-services companies that buy production capacity. The job: hand the whole content need to one studio instead of managing separate writers, editors, designers, voice artists and translators.

The published testimonials (pending permission) come from Pactera EDGE, Lionbridge, Aarna Private Wealth and Thasyai Analytics, which fits both groups.

## Product Purpose

Løfte Studios (Lofte Studios LLP) is a full-service content studio in Jubilee Hills, Hyderabad: copy, video, visuals, audio and localization. The website’s job is to make that offer understood in seconds and to start projects through a working enquiry path.

Success: a first-time visitor sees what Løfte makes, the range of disciplines, and a route to start a project, all in the first viewport.

## Positioning

“Side-kick for all content needs.” One studio covers the whole content need, from discovery to delivery, so the client can “focus on strategic goals”. Known for “comprehensive, high-quality solutions”.

## Operating Context

- Four capabilities: Copy, Video, Visual, Audio (Localization runs through all of them). There are 21 disciplines in the site’s own two marquee rows.
- Six stages, always in this order: Discover, Design, Develop, Distribute, Deconstruct, Delivery. Each has a service page at `/services/[slug]`.
- About: Mission, Vision and Core values (three items each), plus a seven-step process.
- Contact: kalyanr@loftestudios.com, +91 79815 34318, Mon to Fri, 10 am to 6 pm.
- Enquiry fields: name, email, company (optional), capabilities (optional), message, consent.

## Capabilities and Constraints

- Routes: `/`, `/about-us` (the old slug), `/services`, `/services/[stage]`, `/work`, `/contact` and `/privacy`. Old WordPress and theme-demo URLs are redirected in `next.config.ts`.
- Enquiry delivery needs `RESEND_API_KEY`, a verified `CONTACT_FROM` and `CONTACT_TO`. Without them the form says so and gives the email and phone. It never shows a false success.
- Indexing stays off until `SITE_URL` is set and `SITE_INDEXING=on`.
- Still undecided: social handles (the old site links only to bare platform homepages), retention period, and legal review of the privacy notice under India’s DPDP Act 2023.

## Brand Commitments

- Name: Løfte Studios. The ø must render everywhere. The logo is the “Lift” mark and wordmark (`public/brand/`), chosen 2026-09-29 and pending client sign-off.
- Voice: plain and specific. Reuse the studio’s own phrases rather than inventing claims.
- Binding visual references:
  - The landing page follows the PixelCut hero on Dribbble (shot 27526976): orange field, giant centred headline, focal production photo, callout chips, a stats bar at the base.
  - The palette is orange, black and off-white (Pinterest pin).
  - Motion patterns come from the Dribbble research.
- No invented clients, results, testimonials, team members or statistics, ever.

## Evidence on Hand

- Client logos (7) and testimonials (4) are published on loftestudios.com. Per the user’s decision (“Publish, confirm at launch”), they appear here, but written permission must be confirmed before launch.
- The old site’s counters (850+, 5, 4X, 62%) come from the theme demo and are unverified. They are not shown (see `src/content/evidence.ts`).
- The only numbers shown are counts computed from the site’s own content: 4 capabilities, 6 stages, 21 disciplines. They are never styled as results.
- There are no case studies. The `/work` template publishes an entry only when it is approved and has client permission.

## Product Principles

1. Show the offer as output, not as claims.
2. Every public number has a source, a definition and an approver, or it is not published.
3. Honest states over flattering ones: empty sections are omitted, and failed sends say so.
4. The site must feel alive. Motion is part of the brand, and everything still works without it.

## Accessibility & Inclusion

WCAG 2.2 AA. Keyboard and touch parity for every interaction. Reduced motion gives a complete static layout, and pages still read correctly with images off.
