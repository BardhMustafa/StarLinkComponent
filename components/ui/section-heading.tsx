import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MonoLabel } from "./mono-label";

type SectionHeadingProps = {
  index: string;
  /** First half of the heading, in full ink. */
  title: ReactNode;
  /** Optional second half, in muted grey. */
  muted?: ReactNode;
  as?: "h1" | "h2";
  tone?: "paper" | "ink";
  id?: string;
  className?: string;
};

export function SectionHeading({
  index,
  title,
  muted,
  as: Heading = "h2",
  tone = "paper",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <MonoLabel className={cn(tone === "ink" && "text-on-ink-faint")}>{index}</MonoLabel>
      <Heading
        id={id}
        className={cn(
          "mt-4 max-w-[22ch] text-balance",
          Heading === "h1" ? "text-h1" : "text-h2",
          tone === "ink" && "text-white",
        )}
      >
        {title}
        {muted ? (
          <>
            {" "}
            <span className={tone === "ink" ? "text-on-ink-faint" : "text-faint"}>{muted}</span>
          </>
        ) : null}
      </Heading>
    </div>
  );
}
