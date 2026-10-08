"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "@/components/AnimatedText";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const triggerElement = rootRef.current?.querySelector<HTMLElement>("[data-parallax-layers]");
      if (!triggerElement) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0,
        },
      });

      // Background photo drifts slowest (reads as distant); the furniture
      // cutout — matched to the same spot in that photo — drifts at a
      // medium speed, separating from the background as you scroll; the
      // title drifts fastest, reading as closest to the viewer.
      const layers = [
        { layer: "title", yPercent: 55 },
        { layer: "cutout", yPercent: 30 },
        { layer: "photo", yPercent: 12 },
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          { yPercent: layerObj.yPercent, ease: "none" },
          idx === 0 ? undefined : "<"
        );
      });

      // The "Scroll" hint only makes sense before scrolling starts — fade
      // it out immediately so the drifting title never crosses through it.
      const hint = rootRef.current?.querySelector<HTMLElement>("[data-scroll-hint]");
      if (hint) {
        tl.to(hint, { opacity: 0, duration: 0.05, ease: "none" }, 0);
      }
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={rootRef} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-base">
      <div data-parallax-layers className="absolute inset-0">
        <div data-parallax-layer="photo" className="absolute inset-0">
          <Image
            src="/img/hero/Golden Hour Double-Height Luxury Living Room.png"
            alt="Golden-hour double-height luxury living room by Design By Chris"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[25%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/50" />
        </div>

        <div
          data-parallax-layer="title"
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-start px-6 pt-28 text-center sm:pt-40"
        >
          <h1 className="font-heading text-[clamp(2.25rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-white">
            Let Your
            <br />
            Home Be Unique
          </h1>
          <AnimatedText
            as="p"
            className="relative mt-4 max-w-[480px] font-body text-[17px] leading-relaxed text-white/80 sm:text-[20px]"
          >
            There are many variations of the passages of lorem Ipsum from available, variations of the passages.
          </AnimatedText>
        </div>

        <div data-parallax-layer="cutout" className="pointer-events-none absolute inset-0">
          <Image
            src="/img/hero/Modern Sunlit Living Room Cutout.png"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover object-[25%_center]"
          />
        </div>
      </div>

      <div
        data-scroll-hint
        className="absolute bottom-8 right-6 flex flex-col items-center gap-3 sm:right-10"
      >
        <span className="font-body text-[12px] uppercase tracking-[0.35em] text-white/70">
          Scroll
        </span>
        <span className="h-10 w-px animate-pulse bg-gold" />
      </div>
    </section>
  );
}
