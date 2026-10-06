"use client";

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from "react";
import Button from "@/components/Button";
import Modal from "@/components/ui/Modal";
import EnquiryForm from "@/components/forms/EnquiryForm";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

const TOTAL_FRAMES = 151;
const frameSrc = (i: number) => `/frames/walk_${String(i).padStart(4, "0")}.webp`;

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

export default function WalkthroughScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssWidth = canvas.clientWidth;
    const cssHeight = canvas.clientHeight;

    if (canvas.width !== cssWidth * dpr || canvas.height !== cssHeight * dpr) {
      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    const scale = Math.max(cssWidth / img.naturalWidth, cssHeight / img.naturalHeight);
    const drawWidth = img.naturalWidth * scale;
    const drawHeight = img.naturalHeight * scale;
    const dx = (cssWidth - drawWidth) / 2;
    const dy = (cssHeight - drawHeight) / 2;

    ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
  }, []);

  // Preload every frame; draw frame 0 as soon as it lands so the canvas
  // never sits empty behind the loader.
  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameSrc(i + 1);
      img.onload = () => {
        if (cancelled) return;
        loadedCount += 1;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (i === 0) drawFrame(0);
        if (loadedCount === TOTAL_FRAMES) setLoaded(true);
      };
      img.onerror = () => {
        if (cancelled) return;
        loadedCount += 1;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) setLoaded(true);
      };
      images[i] = img;
    }
    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, [drawFrame]);

  // Resize handling — keep the canvas sharp and redraw the current frame.
  useEffect(() => {
    function handleResize() {
      drawFrame(currentFrameRef.current);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // Scroll-driven frame selection, only redrawing when the target index changes.
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (!loaded || reducedMotion) return;
    const index = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round(latest * (TOTAL_FRAMES - 1)))
    );
    if (index !== currentFrameRef.current) {
      currentFrameRef.current = index;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(index));
    }
  });

  useEffect(() => {
    if (loaded && !reducedMotion) drawFrame(0);
  }, [loaded, reducedMotion, drawFrame]);

  // ---- Text overlay motion values ----
  const heroOpacity = useTransform(smoothProgress, [0, 0.08, 0.1], [1, 1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.1], [0, -24]);
  const hintOpacity = useTransform(smoothProgress, [0, 0.06, 0.08], [1, 1, 0]);

  const feature1Opacity = useTransform(
    smoothProgress,
    [0.22, 0.25, 0.38, 0.41],
    [0, 1, 1, 0]
  );
  const feature1X = useTransform(smoothProgress, [0.22, 0.25], [-24, 0]);

  const feature2Opacity = useTransform(
    smoothProgress,
    [0.52, 0.55, 0.68, 0.71],
    [0, 1, 1, 0]
  );
  const feature2X = useTransform(smoothProgress, [0.52, 0.55], [24, 0]);

  const ctaOpacity = useTransform(smoothProgress, [0.85, 0.88, 1], [0, 1, 1]);
  const ctaY = useTransform(smoothProgress, [0.85, 0.88], [24, 0]);

  const progressBarScale = useTransform(smoothProgress, [0, 1], [0, 1]);

  if (reducedMotion) {
    return <ReducedMotionFallback />;
  }

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-base">
      {/* Slim scroll progress bar */}
      <motion.div
        aria-hidden
        style={{ scaleX: progressBarScale }}
        className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-gold"
      />

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-label="Cinematic walkthrough of a Design By Chris interior, from the entry staircase up to a loft overlooking the living space"
        />

        {/* Loading state */}
        {!loaded && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-base">
            <div className="h-9 w-9 animate-spin rounded-full border-2 border-border border-t-gold" />
            <span className="font-body text-sm tracking-wide text-body">
              {loadProgress}%
            </span>
          </div>
        )}

        {/* Hero section */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <Scrim />
          <h1 className="relative font-heading text-[clamp(2.25rem,6vw,4.5rem)] text-ivory">
            Step inside a home
            <br />
            designed to be felt.
          </h1>
          <motion.div
            style={{ opacity: hintOpacity }}
            className="relative mt-10 flex flex-col items-center gap-3"
          >
            <span className="font-body text-[13px] uppercase tracking-[0.35em] text-body/70">
              Scroll to walk through
            </span>
            <span className="h-10 w-px animate-pulse bg-gold" />
          </motion.div>
        </motion.div>

        {/* Feature 1 — left aligned */}
        <motion.div
          style={{ opacity: feature1Opacity, x: feature1X }}
          className="pointer-events-none absolute inset-y-0 left-0 flex w-full max-w-xl items-center px-6 sm:px-14 lg:px-24"
        >
          <div className="relative">
            <Scrim />
            <p className="relative font-heading text-[clamp(1.5rem,3.4vw,2.5rem)] leading-[1.15] text-ivory">
              Double-height volume.
              <br />
              Daylight that moves
              <br />
              through the room.
            </p>
          </div>
        </motion.div>

        {/* Feature 2 — right aligned */}
        <motion.div
          style={{ opacity: feature2Opacity, x: feature2X }}
          className="pointer-events-none absolute inset-y-0 right-0 flex w-full max-w-xl items-center justify-end px-6 text-right sm:px-14 lg:px-24"
        >
          <div className="relative">
            <Scrim />
            <p className="relative font-heading text-[clamp(1.5rem,3.4vw,2.5rem)] leading-[1.15] text-ivory">
              Brass, timber and stone,
              <br />
              layered with intent.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <Scrim size="lg" />
          <h2 className="relative font-heading text-[clamp(2rem,5vw,3.5rem)] text-ivory">
            See the whole picture.
          </h2>
          <p className="relative mt-3 max-w-md font-body text-base text-body">
            Book a design consultation and let&apos;s draw up your next home.
          </p>
          <Button
            variant="gold"
            className="relative mt-8"
            onClick={() => setEnquiryOpen(true)}
          >
            Book a Design Consultation
          </Button>
        </motion.div>
      </div>

      <Modal
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        labelledBy="enquiry-modal-title"
      >
        <EnquiryForm onClose={() => setEnquiryOpen(false)} />
      </Modal>
    </div>
  );
}

function Scrim({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -z-10 rounded-[3rem] bg-base/55 blur-3xl ${
        size === "lg" ? "-inset-16 sm:-inset-24" : "-inset-10 sm:-inset-16"
      }`}
    />
  );
}

function ReducedMotionFallback() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <div className="flex flex-col bg-base">
      <div className="relative h-[70vh] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={frameSrc(1)}
          alt="Entry staircase leading into a double-height living space"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-6 py-24 text-center">
        <h1 className="font-heading text-4xl text-ivory">
          Step inside a home designed to be felt.
        </h1>
      </div>

      <div className="mx-auto flex max-w-xl flex-col items-start gap-4 px-6 py-16 text-left">
        <p className="font-heading text-2xl text-ivory">
          Double-height volume. Daylight that moves through the room.
        </p>
      </div>

      <div className="mx-auto flex max-w-xl flex-col items-end gap-4 px-6 py-16 text-right">
        <p className="font-heading text-2xl text-ivory">
          Brass, timber and stone, layered with intent.
        </p>
      </div>

      <div className="relative h-[70vh] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={frameSrc(TOTAL_FRAMES)}
          alt="Loft-height view looking down over the living area"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-6 py-24 text-center">
        <h2 className="font-heading text-3xl text-ivory">
          See the whole picture.
        </h2>
        <p className="font-body text-base text-body">
          Book a design consultation and let&apos;s draw up your next home.
        </p>
        <Button variant="gold" onClick={() => setEnquiryOpen(true)}>
          Book a Design Consultation
        </Button>
      </div>

      <Modal
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        labelledBy="enquiry-modal-title"
      >
        <EnquiryForm onClose={() => setEnquiryOpen(false)} />
      </Modal>
    </div>
  );
}
