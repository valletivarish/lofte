// Evidence register. A number reaches the page only when it is verified AND has a source, a definition,
// a period and an owner. Offer counts are computed from the site's own content, so they cannot drift.
import { capabilities, disciplineRows, stages } from "./lofte";

export type Metric = {
  id: string;
  label: string;
  claimedOnOldSite: string | null;
  definition: string;
  source: string | null;
  period: string | null;
  owner: string | null;
  status: "unverified" | "verified";
};

// loftestudios.com/about-us shows animated counters that read as theme-demo leftovers. Unpublished until Løfte verifies them.
export const metrics: Metric[] = [
  { id: "websites", label: "Creating and optimizing websites", claimedOnOldSite: "850+", definition: "Unclear: not a Løfte service line", source: null, period: null, owner: null, status: "unverified" },
  { id: "awareness", label: "Brand awareness and recognition", claimedOnOldSite: "5", definition: "No unit given", source: null, period: null, owner: null, status: "unverified" },
  { id: "analysis", label: "Measure and analyze performance", claimedOnOldSite: "4X", definition: "No baseline given", source: null, period: null, owner: null, status: "unverified" },
  { id: "conversions", label: "Increase conversions and sales", claimedOnOldSite: "62%", definition: "No client, period or baseline given", source: null, period: null, owner: null, status: "unverified" },
];

export const verifiedMetrics = metrics.filter((m) => m.status === "verified" && m.source && m.period && m.owner);

export const offerCounts = {
  capabilities: capabilities.length,
  stages: stages.length,
  disciplines: disciplineRows.flat().length,
};
