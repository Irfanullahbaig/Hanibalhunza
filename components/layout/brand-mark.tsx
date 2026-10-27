import Link from "next/link";
import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  href?: string;
  className?: string;
  /** Light text for dark backgrounds */
  light?: boolean;
};

function Peaks({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 20" aria-hidden className={className} fill="none">
      <path
        d="M1 19 L11 5 L16 11 L21 3 L31 19"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="25" cy="5" r="2" fill="var(--apricot)" />
    </svg>
  );
}

export function BrandMark({ href = "/", className, light = false }: BrandMarkProps) {
  const content = (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Peaks className={cn("h-5 w-8", light ? "text-ivory" : "text-forest")} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-[19px] tracking-tight sm:text-xl",
            light ? "text-ivory" : "text-forest"
          )}
        >
          Haniball
        </span>
        <span
          className={cn(
            "mt-1 text-[9px] font-semibold uppercase tracking-[0.32em]",
            light ? "text-ivory/60" : "text-muted"
          )}
        >
          Hunza
        </span>
      </span>
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label={`${siteConfig.name} home`} className="inline-flex shrink-0">
      {content}
    </Link>
  );
}
