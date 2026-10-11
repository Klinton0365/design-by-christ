"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M19 12H5M11 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type GalleryItem = {
  src?: string;
  title?: string;
  summary?: string;
};

interface ExpandableGalleryProps {
  images: GalleryItem[];
  className?: string;
}

function findNextWithSrc(images: GalleryItem[], from: number, direction: 1 | -1) {
  for (let i = 1; i <= images.length; i += 1) {
    const index = (from + direction * i + images.length) % images.length;
    if (images[index].src) return index;
  }
  return from;
}

export function ExpandableGallery({ images, className = "" }: ExpandableGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openImage = (index: number) => {
    if (images[index].src) setSelectedIndex(index);
  };
  const closeImage = () => setSelectedIndex(null);

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(findNextWithSrc(images, selectedIndex, 1));
    }
  };

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(findNextWithSrc(images, selectedIndex, -1));
    }
  };

  const getFlexValue = (index: number) => {
    if (hoveredIndex === null) return 1;
    return hoveredIndex === index ? 2 : 0.5;
  };

  if (images.length === 0) return null;

  const selected = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <div className={className}>
      <div className="flex h-[380px] w-full gap-2 sm:h-[520px]">
        {images.map((image, index) => (
          <motion.div
            key={`${image.title ?? "item"}-${index}`}
            className={`relative overflow-hidden rounded-[24px] bg-placeholder ${
              image.src ? "cursor-pointer" : "cursor-default"
            }`}
            style={{ flex: 1 }}
            animate={{ flex: getFlexValue(index) }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => openImage(index)}
          >
            {image.src && (
              <>
                <Image
                  src={image.src}
                  alt={image.title ?? `Gallery image ${index + 1}`}
                  fill
                  sizes="(min-width: 640px) 500px, 100vw"
                  className="object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-black"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: hoveredIndex === index ? 0 : 0.3 }}
                  transition={{ duration: 0.3 }}
                />
              </>
            )}
            {image.title && (
              <>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
                  <p className="font-heading text-[22px] text-white [text-wrap:balance]">
                    {image.title}
                  </p>
                  <AnimatePresence>
                    {hoveredIndex === index && image.summary && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.25 }}
                        className="mt-2 max-w-md font-body text-[14px] leading-relaxed text-white/85"
                      >
                        {image.summary}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-dark/90 p-4 backdrop-blur-lg"
            onClick={closeImage}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute right-6 top-6 z-10 text-white transition-colors hover:text-gold"
              onClick={closeImage}
            >
              <CloseIcon className="h-7 w-7" />
            </button>

            {images.length > 1 && (
              <button
                type="button"
                aria-label="Previous image"
                className="absolute left-4 z-10 text-white transition-colors hover:text-gold sm:left-8"
                onClick={goToPrev}
              >
                <ArrowLeftIcon className="h-8 w-8" />
              </button>
            )}

            <motion.div
              className="relative max-h-[85vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedIndex}
                src={selected.src}
                alt={selected.title ?? `Gallery image ${(selectedIndex ?? 0) + 1}`}
                className="max-h-[85vh] max-w-5xl rounded-[20px] object-contain"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {images.length > 1 && (
              <button
                type="button"
                aria-label="Next image"
                className="absolute right-4 z-10 text-white transition-colors hover:text-gold sm:right-8"
                onClick={goToNext}
              >
                <ArrowRightIcon className="h-8 w-8" />
              </button>
            )}

            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1">
              {selected.title && (
                <p className="font-heading text-[20px] text-white">{selected.title}</p>
              )}
              <p className="rounded-full bg-dark/60 px-4 py-2 font-body text-[14px] text-white">
                {(selectedIndex ?? 0) + 1} / {images.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
