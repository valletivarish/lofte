import { Hero } from "@/components/hero";
import { MarqueeBand } from "@/components/home/marquee-band";
import { Opportunity } from "@/components/home/opportunity";
import { CapabilityRows } from "@/components/home/capability-rows";
import { AiLayer } from "@/components/home/ai-layer";
import { StagesTrack } from "@/components/home/stages-track";
import { Clientele } from "@/components/home/clientele";
import { Testimonials } from "@/components/home/testimonials";

export default function Home() {
  return (
    <>
      {/* ScrollTrigger wraps the pinned hero in a pin-spacer; this wrapper is what React removes on navigation. */}
      <div>
        <Hero />
      </div>
      {/* The page slides up over the held hero (curtain), so it needs its own ground and stacking. */}
      <main id="main" data-curtain className="relative z-10 bg-paper">
        <MarqueeBand />
        <Opportunity />
        <AiLayer />
        <CapabilityRows />
        <StagesTrack />
        <Testimonials />
        <Clientele />
      </main>
    </>
  );
}
