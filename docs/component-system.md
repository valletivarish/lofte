# Løfte component system

Source of truth for tokens and reusable parts. Pages are assembled from these; they do not define their own colours, type sizes or spacing. Colours were sampled from the approved comps in `.impeccable/mocks/` (`sampled-colors.json`) and contrast-checked.

## Tokens

| Token | Value | Role | Checked pair |
|---|---|---|---|
| `--color-paper` | `#ECF0F1` | Page ground (the Pinterest light, sampled from comps) | ink 16.1:1 |
| `--color-surface` | `#F7F9F9` | Fields, raised panels | ink 17.5:1 |
| `--color-ink` | `#121415` | Text, pill buttons, footer rule | |
| `--color-muted` | `#545B5F` | Secondary text | 6.0:1 on paper |
| `--color-line` | `#CDD3D6` | Decorative dividers only | not for text or control edges |
| `--color-edge` | `#7A8286` | Input and control borders | 3.4:1 on paper |
| `--color-signal` | `#FE7A1F` | The one accent: markers, leader dots, focus on dark, tags on dark | ink on it 7.1:1; never text on light |
| `--color-signal-ink` | `#A63F07` | Orange text and links on light | 5.5:1 on paper |
| `--color-ember` / `--color-ember-deep` | `#C2410C` / `#89280B` | Closing-band field | white 5.2:1 / 8.9:1 |
| `--color-bar` | `#181817` | Hero method bar | white 17.8:1 |
| `--color-error` / `--color-ok` | `#B42318` / `#1F6B3A` | Form states | 6.2:1 on surface |

**Type.** Display: Panchang Extrabold (ITF), uppercase, tracking −0.01em, line-height 0.94. Used only for page and section headlines and the wordmark. Text and UI: Switzer 400/500/600/700 (ITF). Nav, buttons and chip names are uppercase with +0.06em tracking: this is pinned by the PixelCut reference, not a label habit. There are no eyebrow labels, and no monospace face.

Scale (fluid `clamp`): display-xl 3.25→5.4rem (hero), display-l 2.5→4.25rem (page), display-m 1.9→3rem (section), title 1.25→1.5rem, body 1rem→1.125rem / 1.55, small 0.875rem.

**Space.** 4px base. Section rhythm: 6rem desktop, 4rem phone. Gutters: 3rem desktop, 1rem phone. Content max width 1440px, reading measure 65ch.

**Shape.** Interactive elements are pills (buttons, chips, filters). Media frames have a 12px radius. Callouts have a 16px radius. Panels and sections are square. No card shadows. Photographs carry the depth.

**Motion.** A single orchestrated moment: on first load the hero callouts draw their leader lines and settle (450ms, 70ms stagger, `cubic-bezier(.16,1,.3,1)`). Other motion only answers input: pill arrow nudge on hover, scroller controls, the FAQ disclosure, form states. Under reduced motion there are no transforms, and every element is visible at rest.

## Components

| Component | File | Notes |
|---|---|---|
| `SiteHeader` | `components/site-header.tsx` | Wordmark, 4 nav links, `Start a project` pill. Overlay variant on the hero. Phone: disclosure menu sheet. |
| `SiteFooter` | `components/site-footer.tsx` | Wordmark, footer line, link columns. Email is shown only if `site.email` is set. |
| `Wordmark` | `components/wordmark.tsx` | LØFTE in Panchang, STUDIOS tracked beneath |
| `PillLink` | `components/pill-link.tsx` | Primary action: ink pill, white label, white arrow disc. `tone="light"` for dark grounds |
| `TextLink` | `components/pill-link.tsx` | Underlined secondary action |
| `CapabilityIcon` | `components/capability-icon.tsx` | Phosphor icons, one weight |
| `Callout` | `components/hero.tsx` | Hero chip with a leader line to a point on the photo (positions in `content/hero.ts`) |
| `MethodBar` | `components/method-bar.tsx` | The six steps, each linking to `/approach#step` |
| `ServiceScroller` | `components/service-scroller.tsx` | Horizontal snap row of service cards with prev/next controls |
| `HandoffDiagram` | `components/handoff-diagram.tsx` | The usual route against the Løfte route, in SVG and HTML |
| `AudienceColumns` | `components/audience-columns.tsx` | Three situation groups |
| `Commitments` | `components/commitments.tsx` | Sticky heading with the five commitments |
| `CloseBand` | `components/close-band.tsx` | Ember field, three next steps, `Start a project` |
| `PageIntro` | `components/page-intro.tsx` | Inner-page headline, lede and optional action |
| `CaseStudyView` | `components/case-study.tsx` | Omits every section with no approved evidence |
| `EnquiryForm` | `components/enquiry-form.tsx` | Client component: `useActionState`, inline errors, truthful states |

## Evidence rules in code

- `content/evidence.ts`: metrics render only if `status === "verified"` and value, source, period and owner are all present. The list is empty today.
- `content/work.ts`: only `approved` entries with client permission are published. Drafts render only under `npm run dev`.
- `content/studio.ts`: `email`, `phone`, `postalAddress`, `social` and `team` are null or empty. Every component hides the related UI until they are filled.
