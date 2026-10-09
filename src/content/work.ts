// Case studies. Only entries with status "approved" AND written client permission are published.
// Drafts render in local development only, so the template can be reviewed without shipping anything.
import type { CapabilitySlug } from "./lofte";

export type Media = { src: string; alt: string; width: number; height: number; caption?: string };

export type CaseStudy = {
  slug: string;
  status: "draft" | "approved";
  permission: { client: boolean; credit: boolean; results: boolean };
  client: string;
  title: string;
  summary: string;
  capabilities: CapabilitySlug[];
  cover: Media;
  challenge?: string;
  audience?: string;
  role?: string;
  approach?: string[];
  media?: Media[];
  deliverables?: string[];
  /** Shown only when permission.results is true and every field is present. */
  outcome?: { value: string; label: string; context: string; source: string; period: string };
  credits?: { role: string; name: string }[];
};

const isDev = process.env.NODE_ENV === "development";

const entries: CaseStudy[] = [
  {
    // Template sample: visible in `npm run dev` only. Delete once a real case study exists.
    slug: "template-sample",
    status: "draft",
    permission: { client: false, credit: false, results: false },
    client: "Template sample",
    title: "What a case study looks like",
    summary:
      "Not a project. This entry exists so the case-study layout can be reviewed locally. It never builds into production.",
    capabilities: ["copy", "video"],
    cover: {
      src: "/images/worktable.jpg",
      alt: "Studio work table with script pages, headphones and a colour proof",
      width: 2688,
      height: 1152,
    },
    challenge: "The client's problem, in the client's own framing.",
    audience: "Who needed to understand it, and where they would see it.",
    role: "What Løfte did, and which disciplines were involved.",
    approach: ["The approach we took and why.", "The decision that shaped the rest of the project."],
    deliverables: ["Each deliverable, named plainly"],
  },
];

export const publishedCaseStudies = entries.filter((c) => c.status === "approved" && c.permission.client);

/** What the site renders: published entries, plus drafts in `npm run dev` only. */
export const caseStudies = isDev ? entries : publishedCaseStudies;
