"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeCanHover(callback: () => void) {
  const mq = window.matchMedia(HOVER_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getCanHoverSnapshot() {
  return window.matchMedia(HOVER_QUERY).matches;
}

function getCanHoverServerSnapshot() {
  return true;
}

function useCanHover() {
  return useSyncExternalStore(subscribeCanHover, getCanHoverSnapshot, getCanHoverServerSnapshot);
}

export default function HeroBeforeAfter({
  afterSrc = "/hero-photo.jpg",
  beforeSrc = "/hero-photo.jpg",
}: {
  afterSrc?: string;
  beforeSrc?: string;
}) {
  const canHover = useCanHover();
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);

  const revealed = canHover ? hovered : tapped;

  return (
    <div
      className="relative h-full w-full cursor-pointer select-none"
      onMouseEnter={canHover ? () => setHovered(true) : undefined}
      onMouseLeave={canHover ? () => setHovered(false) : undefined}
      onClick={canHover ? undefined : () => setTapped((t) => !t)}
    >
      <Image
        src={afterSrc}
        alt="Minimal, light-filled living room by Design By Chris, after redesign"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div
        aria-hidden={!revealed}
        className="absolute inset-0"
        style={{
          clipPath: revealed ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          transition: "clip-path 0.7s cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        <Image
          src={beforeSrc}
          alt="The same space before the Design By Chris redesign"
          fill
          sizes="100vw"
          className="object-cover grayscale contrast-75 brightness-90"
        />
      </div>

      <span
        className="pointer-events-none absolute left-6 top-6 rounded-full bg-base/80 px-4 py-2 font-body text-[13px] uppercase tracking-[0.2em] text-ivory backdrop-blur transition-opacity duration-300"
        style={{ opacity: revealed ? 1 : 0 }}
      >
        Before
      </span>
      <span
        className="pointer-events-none absolute right-6 top-6 rounded-full bg-base/80 px-4 py-2 font-body text-[13px] uppercase tracking-[0.2em] text-gold backdrop-blur transition-opacity duration-300"
        style={{ opacity: revealed ? 0 : 1 }}
      >
        {canHover ? "Hover to see before" : "Tap to see before"}
      </span>
    </div>
  );
}
