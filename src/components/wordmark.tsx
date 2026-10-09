import Link from "next/link";

/**
 * Active logo in /public/brand. "original" is the client's current logo from loftestudios.com (168×88 PNG),
 * in use until a new mark is signed off. "voice" and "carry" are the redesign candidates (vector, no slashed O).
 */
export const LOGO = "original" as "original" | "voice" | "carry";

const sets = {
  original: { light: "/brand/original/logo-light.png", dark: "/brand/original/logo-dark.png", orange: "/brand/original/logo-light.png", w: 168, h: 88 },
  voice: { light: "/brand/voice/wordmark-light.svg", dark: "/brand/voice/wordmark-dark.svg", orange: "/brand/voice/wordmark-on-orange.svg", w: 1377.46, h: 256 },
  carry: { light: "/brand/carry/wordmark-light.svg", dark: "/brand/carry/wordmark-dark.svg", orange: "/brand/carry/wordmark-on-orange.svg", w: 594.32, h: 256 },
};
const set = sets[LOGO];

/** Compact logo for the floating nav. */
export const miniLogo = { src: set.light, w: set.w, h: set.h };

export function Wordmark({ tone = "light", className = "", onClick }: { tone?: "light" | "dark" | "orange"; className?: string; onClick?: () => void }) {
  // The original's Ø is orange, so on the orange hero field the whole logo is set white.
  const white = LOGO === "original" && tone === "orange" ? "brightness-0 invert" : "";
  return (
    <Link href="/" aria-label="Løfte Studios, home" onClick={onClick} className={`inline-block ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- small static logo, no optimisation needed */}
      <img src={set[tone]} alt="Løfte Studios" width={set.w} height={set.h} className={`h-12 w-auto lg:h-14 ${white}`} />
    </Link>
  );
}
