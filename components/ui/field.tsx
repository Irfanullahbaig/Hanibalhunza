import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
};

export function Field({ id, label, error, hint, optional, className, children }: FieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id}>
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(optional)</span>}
      </Label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
