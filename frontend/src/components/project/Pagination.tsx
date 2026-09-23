export default function Pagination({ pages = 3 }: { pages?: number }) {
  return (
    <div className="mt-16 flex items-center justify-center gap-5">
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          className={`flex h-[52px] w-[52px] items-center justify-center rounded-full font-body text-[16px] font-medium text-ivory ${
            p === 1 ? "bg-cream" : "border border-gold"
          }`}
        >
          {String(p).padStart(2, "0")}
        </button>
      ))}
      <button
        type="button"
        aria-label="Next page"
        className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-gold"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="#CA9A3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
