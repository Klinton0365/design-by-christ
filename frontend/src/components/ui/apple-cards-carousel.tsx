"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";

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

interface CarouselProps {
  items: React.ReactElement[];
  initialScroll?: number;
}

export type CardData = {
  src?: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

const CARD_WIDTH = { mobile: 300, desktop: 360 };
const CARD_GAP = 16;

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const isMobile = () => typeof window !== "undefined" && window.innerWidth < 640;

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? CARD_WIDTH.mobile : CARD_WIDTH.desktop;
      const scrollPosition = (cardWidth + CARD_GAP) * (index + 1);
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
      setCurrentIndex(index);
    }
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-14"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 z-[1000] h-full w-[8%] bg-gradient-to-l from-base to-transparent"
          />

          <div className="mx-auto flex max-w-[1200px] flex-row justify-start gap-4 px-6">
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.1 * index, ease: "easeOut" },
                }}
                key={"card" + index}
                className="last:pr-[5%] md:last:pr-[25%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-3 px-6">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className="group/button relative z-40 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-base transition-colors hover:border-gold disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeftIcon className="h-4 w-4 text-gold transition-transform duration-300 group-hover/button:-translate-x-0.5" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={scrollRight}
            disabled={!canScrollRight}
            className="group/button relative z-40 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-base transition-colors hover:border-gold disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowRightIcon className="h-4 w-4 text-gold transition-transform duration-300 group-hover/button:translate-x-0.5" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: CardData;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    document.body.style.overflow = open ? "hidden" : "auto";

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-dark/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[60] mx-auto my-10 h-fit max-w-4xl rounded-[40px] bg-surface p-6 md:p-12"
            >
              <button
                type="button"
                aria-label="Close"
                className="sticky top-4 right-0 ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-gold text-base transition-opacity hover:opacity-90"
                onClick={handleClose}
              >
                <CloseIcon className="h-4 w-4" />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="font-body text-[16px] font-semibold text-gold"
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="mt-4 font-heading text-[32px] text-ivory md:text-[48px]"
              >
                {card.title}
              </motion.p>
              <div className="py-10">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="relative z-10 flex h-[420px] w-[300px] flex-col items-start justify-start overflow-hidden rounded-[30px] bg-placeholder text-left sm:h-[480px] sm:w-[360px]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/60 via-black/10 to-transparent" />
        <div className="relative z-40 p-6 sm:p-8">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="font-body text-[14px] font-medium text-white/80 sm:text-[15px]"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="mt-2 max-w-xs font-heading text-[22px] text-white [text-wrap:balance] sm:text-[28px]"
          >
            {card.title}
          </motion.p>
        </div>
        {card.src && (
          <BlurImage
            src={card.src}
            alt={card.title}
            fill
            sizes="(min-width: 640px) 360px, 300px"
            className="absolute inset-0 z-10 object-cover"
          />
        )}
      </motion.button>
    </>
  );
};

export const BlurImage = ({ className, alt, onLoad, ...rest }: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn("h-full w-full transition duration-300", isLoading ? "blur-sm" : "blur-0", className)}
      onLoad={(event) => {
        setLoading(false);
        onLoad?.(event);
      }}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
