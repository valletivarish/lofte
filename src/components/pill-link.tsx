import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";

type Props = { href: string; children: React.ReactNode; tone?: "ink" | "light"; size?: "md" | "sm"; className?: string };

/** Primary action. Ink pill with a white arrow disc, as in the approved comps. */
export function PillLink({ href, children, tone = "ink", size = "md", className = "" }: Props) {
  const ink = tone === "ink";
  const sm = size === "sm";
  return (
    <Link
      href={href}
      className={`group inline-flex items-center rounded-full no-underline caps transition-colors duration-200 ${
        sm ? "h-12 gap-4 pl-5 pr-1.5 text-[0.8rem]" : "h-14 gap-5 pl-6 pr-2 text-[0.85rem]"
      } ${ink ? "bg-ink text-white hover:bg-black" : "bg-white text-ink hover:bg-paper"} ${className}`}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={`grid place-items-center rounded-full ${sm ? "size-9" : "size-10"} ${ink ? "bg-white text-ink" : "bg-ink text-white"}`}
      >
        <ArrowRight weight="bold" className="size-[1.1rem] transition-transform duration-200 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

/** Secondary action: an underlined link. */
export function TextLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`font-semibold underline decoration-[1.5px] underline-offset-[0.35em] hover:decoration-[3px] ${className}`}>
      {children}
    </Link>
  );
}
