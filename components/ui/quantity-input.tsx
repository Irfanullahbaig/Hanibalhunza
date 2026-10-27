"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type QuantityInputProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  size?: "sm" | "md";
  className?: string;
};

export function QuantityInput({
  value,
  onChange,
  min = 1,
  max = 50,
  label = "Quantity",
  size = "md",
  className,
}: QuantityInputProps) {
  const h = size === "sm" ? "h-9" : "h-11";
  const btn = cn(
    "flex w-10 items-center justify-center text-ink transition-colors hover:bg-paper disabled:opacity-40",
    h
  );
  return (
    <div
      className={cn("inline-flex items-center rounded-md border border-line bg-white", className)}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        className={btn}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        aria-label={label}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10);
          if (!Number.isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
        }}
        className={cn(
          "w-10 border-x border-line bg-transparent text-center text-sm tabular-nums [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          h
        )}
      />
      <button
        type="button"
        className={btn}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
