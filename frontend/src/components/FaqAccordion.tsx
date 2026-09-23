"use client";

import { useState } from "react";

type FaqItem = { question: string; answer?: string };

export default function FaqAccordion({
  heading,
  items,
  imageSide = "right",
  defaultOpen = 1,
}: {
  heading: string;
  items: FaqItem[];
  imageSide?: "left" | "right";
  defaultOpen?: number;
}) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpen);

  const image = (
    <div className="h-[400px] w-full rounded-[40px] bg-placeholder sm:h-[678px] sm:w-[555px]" />
  );

  const list = (
    <div className="flex w-full flex-col gap-5">
      {items.map((item, i) => {
        const isOpen = i === openIndex;
        return (
          <div key={item.question} className="flex flex-col gap-4">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 text-left"
            >
              <span
                className={`font-heading text-[22px] sm:text-[25px] ${
                  isOpen ? "text-gold" : "text-dark"
                }`}
              >
                {item.question}
              </span>
              <svg
                viewBox="0 0 10 14"
                className={`h-3.5 w-2.5 shrink-0 transition-transform ${
                  isOpen ? "-rotate-90" : "rotate-90"
                }`}
                fill="none"
              >
                <path d="M1 1l7 6-7 6" stroke="#292F36" strokeWidth="2" />
              </svg>
            </button>
            {isOpen && item.answer && (
              <p className="font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
                {item.answer}
              </p>
            )}
            <hr className="border-gold" />
          </div>
        );
      })}
    </div>
  );

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-14">
      <div className="flex flex-col items-center gap-12">
        <h2 className="font-heading text-[36px] text-dark sm:text-[50px]">
          {heading}
        </h2>
        <div className="flex w-full flex-col items-center gap-10 sm:flex-row sm:items-start sm:gap-[60px]">
          {imageSide === "left" ? (
            <>
              {image}
              {list}
            </>
          ) : (
            <>
              {list}
              {image}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
