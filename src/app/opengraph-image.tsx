import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { miniLogo } from "@/components/wordmark";

export const alt = "Løfte Studios. Side-kick for all content needs. Copy, video, visual and audio from one studio in Hyderabad.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [display, text, mark] = await Promise.all([
    readFile(join(process.cwd(), "assets/og/dmsans-600.woff")),
    readFile(join(process.cwd(), "assets/og/manrope-500.woff")),
    readFile(join(process.cwd(), "public", miniLogo.src)),
  ]);
  const caps = ["Copy", "Video", "Visual", "Audio", "Localization"];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 72px 64px",
          color: "#fff",
          background: "radial-gradient(ellipse 80% 90% at 50% 60%, #f4621e 0%, #d24514 45%, #8a260a 100%)",
          fontFamily: "Manrope",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:${miniLogo.src.endsWith(".png") ? "image/png" : "image/svg+xml"};base64,${mark.toString("base64")}`} height={88} alt="" />
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "DM Sans", fontSize: 112, lineHeight: 0.95, letterSpacing: -4 }}>
          <span>Side-kick for all</span>
          <span>content needs</span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {caps.map((c) => (
            <span key={c} style={{ border: "2px solid rgba(255,255,255,.75)", borderRadius: 999, padding: "10px 22px", fontSize: 22, letterSpacing: 2 }}>
              {c.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "DM Sans", data: display, weight: 600, style: "normal" },
        { name: "Manrope", data: text, weight: 500, style: "normal" },
      ],
    },
  );
}
