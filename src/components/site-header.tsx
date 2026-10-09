import { Wordmark } from "./wordmark";
import { PillLink } from "./pill-link";
import { MobileMenu } from "./mobile-menu";
import { DesktopNav } from "./desktop-nav";

/** `overlay` sits on the hero; `solid` heads every inner page. */
export function SiteHeader({ variant = "solid", onOrange = false }: { variant?: "overlay" | "solid"; onOrange?: boolean }) {
  const overlay = variant === "overlay";
  return (
    <header
      className={`gutter relative z-20 grid h-[4.5rem] grid-cols-[1fr_auto] items-center lg:h-24 lg:grid-cols-[1fr_auto_1fr] ${
        overlay ? "on-dark text-white" : "bg-paper text-ink"
      }`}
    >
      <Wordmark tone={onOrange ? "orange" : overlay ? "light" : "dark"} />
      <nav aria-label="Main" className="hidden lg:block" data-anim="nav">
        <DesktopNav tone={overlay ? "light" : "dark"} />
      </nav>
      <div className="hidden justify-self-end lg:block">
        <PillLink href="/contact" size="sm" tone={overlay && !onOrange ? "light" : "ink"}>
          Start a project
        </PillLink>
      </div>
      <div className="justify-self-end lg:hidden">
        <MobileMenu tone={overlay ? "light" : "dark"} />
      </div>
    </header>
  );
}
