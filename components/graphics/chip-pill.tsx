import { cn } from "@/lib/utils";

/** The ink pill with a small chip, set inline in the hero H1. Sized in em. */
export function ChipPill({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "mx-[0.05em] inline-flex h-[0.78em] w-[1.7em] items-center justify-center rounded-full bg-ink align-middle",
        className,
      )}
    >
      <svg viewBox="0 0 80 36" fill="none" className="h-[60%]">
        <rect x="26" y="4" width="28" height="28" rx="4" fill="#2A3FFB" />
        <rect x="34" y="12" width="12" height="12" rx="2" fill="#D4FF3A" />
        <path
          d="M4 10h22M4 18h22M4 26h22M54 10h22M54 18h22M54 26h22"
          stroke="#4A5470"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
