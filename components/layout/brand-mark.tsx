import Link from "next/link";
import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  href?: string;
  className?: string;
  /** Light text for dark backgrounds */
  light?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "text-lg sm:text-xl",
  md: "text-xl sm:text-2xl",
  lg: "text-2xl sm:text-3xl",
};

export function BrandMark({
  href = "/",
  className,
  light = true,
  size = "md",
}: BrandMarkProps) {
  const content = (
    <span className={cn("group flex flex-col", className)}>
      <span
        className={cn(
          "font-serif tracking-wide transition",
          sizeMap[size],
          light
            ? "text-cream group-hover:text-honey"
            : "text-forest group-hover:text-honey-dark"
        )}
      >
        {siteConfig.name}
      </span>
      <span
        className={cn(
          "hidden text-[10px] uppercase tracking-[0.2em] sm:block",
          light ? "text-cream/70" : "text-muted"
        )}
      >
        Pure Mountain Dry Fruits
      </span>
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      aria-label={`${siteConfig.name} home`}
      className="inline-flex"
    >
      {content}
    </Link>
  );
}
