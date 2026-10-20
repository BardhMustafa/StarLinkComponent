import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap transition-[transform,background-color,color,border-color] duration-200 ease-(--ease-precise) select-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        /** Ink pill — pair with <ArrowBadge /> as the last child. */
        primary: "bg-ink text-white hover:bg-ink-3",
        accent: "bg-accent text-white hover:bg-[#1f33e0]",
        outline: "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-white",
        /** For use on cobalt or ink surfaces. */
        light: "bg-white text-ink hover:bg-accent-soft",
        outlineLight: "border-[1.5px] border-white/80 text-white hover:bg-white hover:text-ink",
      },
      size: {
        sm: "min-h-11 px-5 text-[15px]",
        md: "min-h-[48px] px-[22px] text-[15px]",
        lg: "min-h-[54px] px-[26px] text-base",
      },
      badge: {
        true: "pr-2",
        false: "",
      },
    },
    defaultVariants: { variant: "primary", size: "md", badge: false },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type ButtonProps = ComponentProps<"button"> & ButtonVariantProps & { asChild?: boolean };

export function Button({ className, variant, size, badge, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, badge }), className)} {...props} />;
}
