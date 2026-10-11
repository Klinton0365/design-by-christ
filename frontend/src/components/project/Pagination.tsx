import Link from "next/link";

export default function Pagination({
  pages = 3,
  currentPage,
  basePath,
  query,
}: {
  pages?: number;
  currentPage?: number;
  basePath?: string;
  query?: Record<string, string>;
}) {
  const totalPages = pages;
  const active = currentPage ?? 1;
  const isInteractive = !!basePath;

  if (isInteractive && totalPages <= 1) return null;

  const hrefFor = (page: number) => {
    const params = new URLSearchParams(query);
    params.set("page", String(page));
    return `${basePath}?${params.toString()}`;
  };

  return (
    <div className="mt-16 flex items-center justify-center gap-5">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
        const className = `flex h-[52px] w-[52px] items-center justify-center rounded-full font-body text-[16px] font-medium text-ivory ${
          p === active ? "bg-cream" : "border border-gold"
        }`;
        const label = String(p).padStart(2, "0");

        return isInteractive ? (
          <Link key={p} href={hrefFor(p)} className={className}>
            {label}
          </Link>
        ) : (
          <button key={p} type="button" className={className}>
            {label}
          </button>
        );
      })}
      {isInteractive ? (
        active < totalPages && (
          <Link
            href={hrefFor(active + 1)}
            aria-label="Next page"
            className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-gold"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="#CA9A3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        )
      ) : (
        <button
          type="button"
          aria-label="Next page"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-gold"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="#CA9A3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
