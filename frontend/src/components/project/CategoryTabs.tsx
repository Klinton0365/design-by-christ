"use client";

import { motion } from "motion/react";

export default function CategoryTabs({
  categories,
  active,
  onSelect,
}: {
  categories: string[];
  active: string | null;
  onSelect: (category: string | null) => void;
}) {
  const tabs = [{ label: "All", value: null }, ...categories.map((cat) => ({ label: cat, value: cat }))];

  return (
    <div className="mx-auto flex w-full max-w-[880px] flex-wrap items-center justify-center gap-2 rounded-full border border-border bg-surface p-2 sm:gap-3">
      {tabs.map((tab) => {
        const isActive = active === tab.value;
        return (
          <button
            key={tab.label}
            type="button"
            onClick={() => onSelect(tab.value)}
            className={`relative rounded-full px-6 py-3 font-body text-[16px] font-semibold tracking-wide transition-colors sm:text-[18px] ${
              isActive ? "text-white" : "text-body hover:text-gold"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="category-pill"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="absolute inset-0 z-0 rounded-full bg-gold"
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
