import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ArrowBadgeProps = {
  /** "diagonal" (↗) rotates to → on hover of the closest `group`; "right" stays →. */
  direction?: "diagonal" | "right";
  tone?: "accent" | "ink" | "outline" | "outlineLight" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const tones = {
  accent: "bg-accent text-white",
  ink: "bg-ink text-white",
  white: "bg-white text-ink",
  outline: "border-[1.5px] border-ink text-ink",
  outlineLight: "border-[1.5px] border-white/70 text-white",
};

const sizes = {
  sm: "size-8 [&>svg]:size-4",
  md: "size-[52px] [&>svg]:size-5",
  lg: "size-16 [&>svg]:size-6",
};

/** Circular arrow used inside buttons, tiles and table rows. Decorative. */
export function ArrowBadge({
  direction = "diagonal",
  tone = "accent",
  size = "sm",
  className,
}: ArrowBadgeProps) {
  const Icon = direction === "diagonal" ? ArrowUpRight : ArrowRight;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full",
        tones[tone],
        sizes[size],
        className,
      )}
    >
      <Icon
        strokeWidth={1.75}
        className={cn(
          "transition-transform duration-300 ease-(--ease-precise)",
          direction === "diagonal" && "group-hover:rotate-45 group-focus-visible:rotate-45",
          direction === "right" && "group-hover:translate-x-0.5",
        )}
      />
    </span>
  );
}
