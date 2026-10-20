"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

// Variant-level transitions win over the `transition` prop, so delays go
// through `custom`.
const fadeRise: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li";
};

/** Fades and rises 16px when scrolled into view. Static under reduced motion. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = m[as];
  return (
    <Comp
      data-reveal
      className={className}
      variants={fadeRise}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={VIEWPORT}
      custom={delay}
    >
      {children}
    </Comp>
  );
}

const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

type StaggerProps = { children: ReactNode; className?: string };

/** <ul>/<ol> whose <StaggerItem> children rise in sequence. */
export function StaggerList({
  children,
  className,
  ordered = false,
}: StaggerProps & { ordered?: boolean }) {
  const reduce = useReducedMotion();
  const List = ordered ? m.ol : m.ul;
  return (
    <List
      className={className}
      variants={staggerParent}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </List>
  );
}

export function StaggerItem({ children, className }: StaggerProps) {
  return (
    <m.li data-reveal className={className} variants={fadeRise}>
      {children}
    </m.li>
  );
}

const maskUp: Variants = {
  hidden: { y: "105%" },
  visible: (delay: number = 0) => ({ y: 0, transition: { duration: 0.9, ease: EASE, delay } }),
};

/**
 * Slides its content up from behind a mask (used for the giant office codes).
 * The in-view trigger sits on the mask itself — the translated child is fully
 * clipped, so an observer on it would never fire.
 */
export function MaskReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <m.span
      className={`block overflow-hidden ${className ?? ""}`}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={VIEWPORT}
      custom={delay}
    >
      <m.span data-reveal className="block" variants={maskUp} custom={delay}>
        {children}
      </m.span>
    </m.span>
  );
}
