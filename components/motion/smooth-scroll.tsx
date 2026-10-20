"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Lenis smooth scrolling, skipped entirely under prefers-reduced-motion.
 * Pauses while a Radix dialog/sheet locks scrolling (body[data-scroll-locked]).
 */
export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

    const syncLock = () => {
      if (!lenis) return;
      if (document.body.hasAttribute("data-scroll-locked")) lenis.stop();
      else lenis.start();
    };
    const observer = new MutationObserver(syncLock);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] });

    const sync = () => {
      if (query.matches) {
        lenis?.destroy();
        lenis = null;
      } else if (!lenis) {
        lenis = new Lenis({ autoRaf: true, anchors: { offset: -88 }, lerp: 0.12 });
        syncLock();
      }
    };

    sync();
    query.addEventListener("change", sync);
    return () => {
      query.removeEventListener("change", sync);
      observer.disconnect();
      lenis?.destroy();
    };
  }, []);

  return null;
}
