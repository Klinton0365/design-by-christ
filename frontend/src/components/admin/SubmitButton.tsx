"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
  pendingLabel = "Saving…",
}: {
  children: React.ReactNode;
  pendingLabel?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-fit items-center justify-center rounded-[18px] bg-gold px-9 py-4 font-body text-[16px] font-semibold text-white glow-gold transition-opacity hover:opacity-90 disabled:opacity-60"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
