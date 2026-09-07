import Link from "next/link";
import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  href?: string;
  className?: string;
  /** Show English brand name above Urdu calligraphy */
  showEnglish?: boolean;
  /** Light text for dark backgrounds */
  light?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: {
    en: "text-lg sm:text-xl",
    ur: "text-base sm:text-lg",
  },
  md: {
    en: "text-xl sm:text-2xl",
    ur: "text-lg sm:text-xl",
  },
  lg: {
    en: "text-2xl sm:text-3xl",
    ur: "text-xl sm:text-2xl",
  },
};

/**
 * Brand mark: English site language with Urdu calligraphy branding only.
 */
export function BrandMark({
  href = "/",
  className,
  showEnglish = true,
  light = true,
  size = "md",
}: BrandMarkProps) {
  const sizes = sizeMap[size];

  const content = (
    <span className={cn("group flex flex-col", className)}>
      {showEnglish && (
        <span
          className={cn(
            "font-serif tracking-wide transition",
            sizes.en,
            light
              ? "text-cream group-hover:text-honey"
              : "text-forest group-hover:text-honey-dark"
          )}
        >
          {siteConfig.name}
        </span>
      )}
      <span
        lang="ur"
        dir="rtl"
        className={cn(
          "font-urdu leading-relaxed",
          sizes.ur,
          light ? "text-honey" : "text-forest",
          showEnglish ? "mt-0.5" : ""
        )}
      >
        {siteConfig.nameUrdu}
      </span>
      <span
        lang="ur"
        dir="rtl"
        className={cn(
          "font-urdu text-[11px] leading-none sm:text-xs",
          light ? "text-cream/65" : "text-muted"
        )}
      >
        {siteConfig.taglineUrdu}
      </span>
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label={`${siteConfig.name} home`} className="inline-flex">
      {content}
    </Link>
  );
}
