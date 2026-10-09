"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src?: string;
};

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 text-gold transition-transform duration-300 ${
        direction === "left" ? "group-hover/button:-translate-x-0.5" : "group-hover/button:translate-x-0.5"
      }`}
      fill="none"
    >
      <path
        d={direction === "left" ? "M19 12H5M11 18l-6-6 6-6" : "M5 12h14M13 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  // Each card's tilt starts at 0 (deterministic, matches SSR output) and is
  // only randomized client-side after mount — calling Math.random() during
  // the initial render would differ between the server and client passes
  // and trigger a hydration mismatch.
  const [rotations, setRotations] = useState(() => testimonials.map(() => 0));

  useEffect(() => {
    // This has to run client-side only and deliberately diverge from the
    // SSR pass (that's the whole point — a harmless decorative tilt), so
    // the usual "don't setState synchronously in an effect" guidance
    // doesn't apply: there's no external value to derive this from.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRotations(testimonials.map(() => Math.floor(Math.random() * 21) - 10));
    // Intentionally a one-time randomization on mount, not re-run per
    // testimonials change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <div className="relative h-60 w-full sm:h-72 md:h-80">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, scale: 0.9, z: -100, rotate: rotations[index] }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : rotations[index],
                    zIndex: isActive(index) ? 40 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.9, z: 100, rotate: rotations[index] }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                >
                  {testimonial.src ? (
                    <Image
                      src={testimonial.src}
                      alt={testimonial.name}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      draggable={false}
                      className="rounded-[30px] object-cover object-center"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-[30px] bg-placeholder">
                      <span className="font-heading text-[64px] text-gold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="font-heading text-[25px] text-ivory">{testimonials[active].name}</h3>
            <p className="mt-1 font-body text-[15px] text-body">
              {testimonials[active].designation}
            </p>
            <motion.p className="mt-8 font-body text-[18px] leading-relaxed text-body">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * index }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="group/button flex h-10 w-10 items-center justify-center rounded-full border border-border bg-base transition-colors hover:border-gold"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="group/button flex h-10 w-10 items-center justify-center rounded-full border border-border bg-base transition-colors hover:border-gold"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
