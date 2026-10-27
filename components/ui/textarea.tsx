import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full text-base sm:text-sm rounded-md border border-line bg-white px-4 py-3 text-ink placeholder:text-muted/70 transition-colors focus-visible:outline-none focus-visible:border-forest focus-visible:ring-2 focus-visible:ring-forest/15 aria-[invalid=true]:border-danger disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
