import type { MetadataRoute } from "next";
import { site } from "@/content/lofte";

// Crawling stays off until the production domain is confirmed and SITE_INDEXING=on is set.
export default function robots(): MetadataRoute.Robots {
  if (!site.indexing) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: new URL("/sitemap.xml", site.url).toString() };
}
