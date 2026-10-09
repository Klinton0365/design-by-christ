"use client";

import { useTransition } from "react";

export default function ToggleHomeButton({
  slug,
  showOnHome,
  action,
}: {
  slug: string;
  showOnHome: boolean;
  action: (slug: string, nextValue: boolean) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => action(slug, !showOnHome))}
      className={`rounded-full px-4 py-1.5 font-body text-[13px] font-semibold transition-colors disabled:opacity-60 ${
        showOnHome
          ? "bg-gold text-white hover:opacity-90"
          : "border border-border text-body hover:text-gold"
      }`}
    >
      {showOnHome ? "On Homepage" : "Show on Homepage"}
    </button>
  );
}
