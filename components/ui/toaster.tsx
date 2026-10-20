"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "!rounded-2xl !border !border-hairline-ink !bg-ink !text-white !font-sans !shadow-xl",
          description: "!text-on-ink-muted",
          icon: "!text-signal",
        },
      }}
    />
  );
}
