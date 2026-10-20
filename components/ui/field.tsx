import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type FieldProps = {
  id: string;
  label: ReactNode;
  required?: boolean;
  requiredLabel?: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

/** Mono label + control + inline error. The control must use `id` and `${id}-error`. */
export function Field({
  id,
  label,
  required,
  requiredLabel,
  error,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <label htmlFor={id} className="label-mono-sm text-muted">
        {label}
        {required && (
          <>
            <span aria-hidden="true"> *</span>
            {requiredLabel && <span className="sr-only"> ({requiredLabel})</span>}
          </>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[13px] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClass =
  "min-h-[50px] w-full min-w-0 rounded-xl border border-hairline bg-field px-3.5 text-base text-ink transition-colors outline-none hover:border-[#B8BECB] focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent aria-[invalid=true]:border-danger";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(inputClass, className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea className={cn(inputClass, "min-h-[120px] resize-y py-3", className)} {...props} />
  );
}
