import { getDiscountPercent } from "@/lib/data";
import { cn, formatPrice } from "@/lib/utils";

type PriceProps = {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg";
  showSaving?: boolean;
  className?: string;
};

export function Price({ price, compareAtPrice, size = "md", showSaving, className }: PriceProps) {
  const discount = getDiscountPercent(price, compareAtPrice);
  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-1", className)}>
      <span
        className={cn(
          "font-medium tabular-nums text-ink",
          size === "sm" && "text-[15px]",
          size === "md" && "text-base",
          size === "lg" && "text-2xl sm:text-3xl"
        )}
      >
        {formatPrice(price)}
      </span>
      {discount > 0 && (
        <>
          <span
            className={cn(
              "tabular-nums text-muted line-through",
              size === "lg" ? "text-base" : "text-[13px]"
            )}
          >
            <span className="sr-only">Was </span>
            {formatPrice(compareAtPrice!)}
          </span>
          {showSaving && (
            <span className="rounded-sm bg-apricot/12 px-1.5 py-0.5 text-xs font-medium text-apricot-deep">
              Save {discount}%
            </span>
          )}
        </>
      )}
    </div>
  );
}
