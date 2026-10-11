"use client";

import { useSyncExternalStore } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import AnimatedText from "@/components/AnimatedText";

const steps = [
  {
    number: "01",
    title: "Concept & Details",
    body: "It is a long established fact that a reader will be distracted. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "/img/about/living-room.jpg",
  },
  {
    number: "02",
    title: "Idea for Work",
    body: "It is a long established fact that a reader will be distracted. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "/img/hero/Modern Sunlit Living Room Cutout.png",
  },
  {
    number: "03",
    title: "Design",
    body: "It is a long established fact that a reader will be distracted. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "/img/hero/Golden Hour Double-Height Luxury Living Room.png",
  },
  {
    number: "04",
    title: "Perfection",
    body: "It is a long established fact that a reader will be distracted. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "/img/about/living-room.jpg",
  },
];

const VIEWPORT = { once: true, margin: "-120px" } as const;

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

export default function HowWeWork() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-14">
      <div className="rounded-[70px] bg-cream px-6 py-20 sm:px-16">
        <div className="mx-auto flex max-w-[800px] flex-col items-center gap-3 text-center">
          <AnimatedText as="h2" className="font-heading text-[36px] text-ivory sm:text-[50px]">
            How We Work
          </AnimatedText>
          <AnimatedText as="p" className="font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
            It is a long established fact will be distracted. Lorem Ipsum is
            simply dummy text of the printing and typesetting industry.
          </AnimatedText>
        </div>

        <div className="mt-16 flex flex-col gap-14">
          {steps.map((step, i) => {
            const fromLeft = i % 2 === 0;

            const image = (
              <motion.div
                {...(!reducedMotion && {
                  initial: { opacity: 0, scale: 0.82, rotate: fromLeft ? -4 : 4 },
                  whileInView: { opacity: 1, scale: 1, rotate: 0 },
                  viewport: VIEWPORT,
                  transition: { duration: 0.7, ease: "easeOut" },
                })}
                className="relative h-[300px] w-full overflow-hidden rounded-[80px] bg-placeholder sm:h-[453px] sm:w-[453px]"
              >
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(min-width: 640px) 453px, 100vw"
                  className="object-cover"
                />
              </motion.div>
            );

            const text = (
              <div className="flex flex-1 flex-col items-start gap-8">
                <motion.span
                  {...(!reducedMotion && {
                    initial: { opacity: 0, y: 40 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: VIEWPORT,
                    transition: { duration: 0.6, delay: 0.1, ease: "easeOut" },
                  })}
                  className="font-heading text-[80px] leading-none text-gold sm:text-[120px]"
                >
                  {step.number}
                </motion.span>
                <motion.div
                  {...(!reducedMotion && {
                    initial: { opacity: 0, x: fromLeft ? 36 : -36 },
                    whileInView: { opacity: 1, x: 0 },
                    viewport: VIEWPORT,
                    transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
                  })}
                  className="flex flex-col gap-3"
                >
                  <h3 className="font-heading text-[28px] text-ivory sm:text-[35px]">
                    {step.title}
                  </h3>
                  <p className="max-w-[456px] font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
                    {step.body}
                  </p>
                </motion.div>
              </div>
            );

            return (
              <div
                key={step.number}
                className="flex flex-col items-center gap-8 sm:flex-row sm:gap-12"
              >
                {fromLeft ? (
                  <>
                    {image}
                    {text}
                  </>
                ) : (
                  <>
                    {text}
                    {image}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
