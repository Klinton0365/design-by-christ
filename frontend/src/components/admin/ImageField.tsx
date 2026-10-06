"use client";

import { useState } from "react";

export default function ImageField({
  label,
  name,
  defaultImageUrl,
}: {
  label: string;
  name: string;
  defaultImageUrl?: string | null;
}) {
  const [preview, setPreview] = useState<string | null>(defaultImageUrl ?? null);

  return (
    <label className="flex flex-col gap-2">
      <span className="font-body text-[14px] text-body">{label}</span>
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt=""
          className="h-[160px] w-[240px] rounded-xl border border-border object-cover"
        />
      )}
      <input
        type="file"
        name={name}
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setPreview(URL.createObjectURL(file));
        }}
        className="font-body text-[14px] text-body file:mr-4 file:rounded-xl file:border-0 file:bg-gold file:px-4 file:py-2 file:font-body file:text-[14px] file:font-semibold file:text-white"
      />
    </label>
  );
}
