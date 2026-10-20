import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { MonoLabel } from "@/components/ui/mono-label";

type PageHeroProps = {
  index: string;
  title: string;
  muted?: string;
  intro?: ReactNode;
  /** Right-hand slot on the label row (e.g. regions or a breadcrumb). */
  aside?: ReactNode;
  children?: ReactNode;
};

/** Inner-page opener: mono index, giant H1 with a muted second half, intro. */
export function PageHero({ index, title, muted, intro, aside, children }: PageHeroProps) {
  return (
    <Container className="pt-10 pb-14 sm:pt-14 sm:pb-20">
      <div className="flex flex-wrap justify-between gap-3 pb-7">
        <MonoLabel>{index}</MonoLabel>
        {aside}
      </div>
      <h1 className="max-w-[14ch] text-h1 text-balance">
        <span className="mask-word">
          <span>{title}</span>
        </span>
        {muted ? (
          <>
            {" "}
            <span className="mask-word [--d:80ms]">
              <span className="text-faint">{muted}</span>
            </span>
          </>
        ) : null}
      </h1>
      {intro ? (
        <div className="mt-10 max-w-[620px] anim-fade-up text-lg leading-[1.6] text-text-2 [--d:200ms] sm:text-xl">
          {intro}
        </div>
      ) : null}
      {children}
    </Container>
  );
}
