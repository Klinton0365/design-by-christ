"use client";

import { useState } from "react";

const NEW_CATEGORY_OPTION = "__new__";

export default function CategoryField({
  categories,
  defaultValue,
}: {
  categories: string[];
  defaultValue?: string | null;
}) {
  const hasExistingValue = !!defaultValue && categories.includes(defaultValue);
  const [isNew, setIsNew] = useState(categories.length === 0 || (!!defaultValue && !hasExistingValue));

  if (isNew) {
    return (
      <label className="flex flex-col gap-2">
        <span className="font-body text-[14px] text-body">Category</span>
        <input
          type="text"
          name="category"
          defaultValue={defaultValue ?? ""}
          required
          placeholder="e.g. Decor / Architecture"
          className="rounded-xl border border-border bg-base px-4 py-3 font-body text-[16px] text-ivory focus:outline-none focus:ring-2 focus:ring-gold"
        />
        {categories.length > 0 && (
          <button
            type="button"
            onClick={() => setIsNew(false)}
            className="self-start font-body text-[13px] text-body hover:text-gold"
          >
            Choose from existing categories
          </button>
        )}
      </label>
    );
  }

  return (
    <label className="flex flex-col gap-2">
      <span className="font-body text-[14px] text-body">Category</span>
      <select
        name="category"
        defaultValue={defaultValue ?? categories[0]}
        required
        onChange={(e) => {
          if (e.target.value === NEW_CATEGORY_OPTION) setIsNew(true);
        }}
        className="rounded-xl border border-border bg-base px-4 py-3 font-body text-[16px] text-ivory focus:outline-none focus:ring-2 focus:ring-gold"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
        <option value={NEW_CATEGORY_OPTION}>+ Add new category…</option>
      </select>
    </label>
  );
}
