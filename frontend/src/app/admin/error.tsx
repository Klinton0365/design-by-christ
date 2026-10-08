"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-base px-6 text-center">
      <p className="font-heading text-[28px] text-ivory">Something went wrong</p>
      <p className="max-w-[420px] font-body text-[16px] text-body">
        {error.message.toLowerCase().includes("body exceeded")
          ? "That upload was too large. Try a smaller file, or fewer images at once."
          : "That action couldn't be completed. Please try again."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center justify-center rounded-[18px] bg-dark px-6 py-3 font-body text-[14px] font-semibold text-white glow-gold transition-opacity hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
