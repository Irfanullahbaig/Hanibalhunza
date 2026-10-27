import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  action,
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-6 sm:mb-12",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <p className={cn("eyebrow", dark && "!text-sand")}>{eyebrow}</p>
        )}
        <h2
          id={id}
          className={cn(
            "mt-3 text-3xl leading-tight sm:text-4xl",
            dark ? "text-ivory" : "text-ink"
          )}
        >
          {title}
        </h2>
        {description && (
          <p className={cn("mt-4 leading-relaxed", dark ? "text-ivory/75" : "text-muted")}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
