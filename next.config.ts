import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 80] },
  async redirects() {
    // Old WordPress URLs on loftestudios.com. Real pages keep their slugs; theme-demo pages go to their nearest real page.
    const to = (source: string, destination: string) => ({ source, destination, permanent: true });
    return [
      to("/about", "/about-us"),
      to("/our-team", "/about-us"),
      to("/history", "/about-us"),
      to("/faq", "/contact"),
      to("/coming-soon", "/"),
      to("/services-1", "/services"),
      to("/portfolio/:slug*", "/work"),
      to("/portfolio-:variant", "/work"),
      to("/gallery", "/work"),
      to("/team/:slug*", "/about-us"),
      to("/blog-:variant", "/"),
      to("/masonry-:variant", "/"),
      to("/category/:slug*", "/"),
      to("/homepage-:n", "/"),
      to("/shop", "/"),
      to("/cart", "/"),
      to("/checkout", "/"),
      to("/my-account", "/"),
      to("/wishlist", "/"),
      to("/elements", "/"),
      to("/elements-demo", "/"),
      to("/typography", "/"),
      to("/mega-menu", "/"),
      to("/tag/:slug*", "/"),
      to("/type/:slug*", "/"),
      to("/feed", "/"),
      to("/author/:slug*", "/about-us"),
      to("/side-panel/:slug*", "/"),
      to("/header/:slug*", "/"),
      to("/portfolio-category/:slug*", "/work"),
      to("/portfolio-tag/:slug*", "/work"),
      // Theme demo blog posts (not Løfte content).
      to("/unraveling-marketing-trends", "/"),
      to("/navigating-the-digital-landscape", "/"),
      to("/unlocking-the-power-of-photo", "/"),
      to("/exploring-ui-ux-trends-2024-2", "/"),
      to("/the-psychology-of-color-in-branding", "/"),
      to("/unraveling-the-seo-secrets-2", "/"),
      to("/designing-for-the-on-the-go-user", "/"),
      to("/powering-the-internet-of-things-2", "/"),
      to("/the-science-behind-shareability", "/"),
      to("/mastering-the-art-of-seo", "/"),
      to("/the-rise-of-social-media-marketing", "/"),
      to("/world-of-quantum-computing", "/"),
      to("/innovations-in-life-sciences", "/"),
      to("/the-future-of-wearable-technology", "/"),
      to("/powering-the-internet-of-things", "/"),
      to("/the-physical-and-digital-worlds-2", "/"),
      to("/unraveling-the-seo-secrets", "/"),
      to("/the-physical-and-digital-worlds", "/"),
      to("/exploring-ui-ux-trends-2024", "/"),
    ];
  },
};

export default nextConfig;
