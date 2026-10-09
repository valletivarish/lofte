import type { MetadataRoute } from "next";
import { site, stages } from "@/content/lofte";
import { publishedCaseStudies } from "@/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about-us", "/services", ...stages.map((s) => `/services/${s.slug}`), "/work", ...publishedCaseStudies.map((c) => `/work/${c.slug}`), "/contact", "/privacy"];
  return paths.map((p) => ({ url: new URL(p, site.url).toString(), changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
