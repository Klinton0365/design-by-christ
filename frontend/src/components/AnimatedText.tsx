"use client";

import { createElement, useSyncExternalStore } from "react";
import { TextAnimate } from "@/components/ui/text-animate";

type AnimatedTextTag = "h1" | "h2" | "h3" | "h4" | "p" | "span";

type AnimatedTextProps = {
  children: string;
  as?: AnimatedTextTag;
  className?: string;
  delay?: number;
  once?: boolean;
};

const HEADING_TAGS = new Set<AnimatedTextTag>(["h1", "h2", "h3", "h4"]);

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

/**
 * Entrance animation for the site's two text roles: short, large headings
 * (word-level blur+rise) and longer body copy (word-level fade, lighter
 * motion so a whole paragraph doesn't feel sluggish to read in).
 */
export default function AnimatedText({
  children,
  as = "p",
  className = "",
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  const isHeading = HEADING_TAGS.has(as);
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return createElement(as, { className }, children);
  }

  return (
    <TextAnimate
      as={as}
      by="word"
      animation={isHeading ? "blurInUp" : "fadeIn"}
      duration={isHeading ? 0.8 : 0.5}
      delay={delay}
      once={once}
      startOnView
      className={className}
    >
      {children}
    </TextAnimate>
  );
}
