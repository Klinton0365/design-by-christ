"use client";

import { useState } from "react";

const categories = ["Bathroom", "Bed Room", "Kitchan", "Living Area"];

export default function CategoryTabs() {
  const [active, setActive] = useState("Bed Room");

  return (
    <div className="mx-auto flex w-full max-w-[880px] flex-wrap items-center justify-center gap-3 rounded-[18px] border border-gold px-4 py-4 sm:gap-8">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => setActive(cat)}
          className={`rounded-[18px] px-6 py-3 font-body text-[18px] font-semibold tracking-wide transition-colors ${
            active === cat ? "bg-gold text-white" : "text-dark hover:text-gold"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
