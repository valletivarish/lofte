import { DM_Sans, Manrope } from "next/font/google";

// Display: DM Sans (Colophon for Google) at its default optical size, tracked tight (-0.035em), as on the
// reference site. Text: Manrope. Both self-hosted at build time by next/font.
export const dmSans = DM_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-dm", display: "swap" });
export const manrope = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-manrope", display: "swap" });
