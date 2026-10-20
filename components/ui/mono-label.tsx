import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Uppercase JetBrains Mono label, e.g. "[ 002 ] LINE CARD" or "§01". */
export function MonoLabel({ className, ...props }: ComponentProps<"span">) {
  return <span className={cn("label-mono text-muted", className)} {...props} />;
}
