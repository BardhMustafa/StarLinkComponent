import { cn } from "@/lib/utils";

/** Four-point star on an ink rounded square. Decorative — label the parent link. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 34 34" aria-hidden="true" className={cn("size-[34px]", className)}>
      <rect width="34" height="34" rx="9" fill="#0A0E1A" />
      <path
        d="M17 6c.8 6 4 9.2 11 11-7 1.8-10.2 5-11 11-.8-6-4-9.2-11-11 7-1.8 10.2-5 11-11z"
        fill="#2A3FFB"
      />
      <circle cx="17" cy="17" r="2.4" fill="#FFFFFF" />
    </svg>
  );
}
