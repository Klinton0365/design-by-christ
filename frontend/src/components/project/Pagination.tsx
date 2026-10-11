import Link from "next/link";

export default function Pagination({
  pages = 3,
  currentPage,
  basePath,
  query,
  onPageChange,
}: {
  pages?: number;
  currentPage?: number;
  basePath?: string;
  query?: Record<string, string>;
  onPageChange?: (page: number) => void;
}) {
  const totalPages = pages;
  const active = currentPage ?? 1;
  const isInteractive = !!basePath || !!onPageChange;

  if (isInteractive && totalPages <= 1) return null;

  const hrefFor = (page: number) => {
    const params = new URLSearchParams(query);
    params.set("page", String(page));
    return `${basePath}?${params.toString()}`;
  };

  const renderControl = (page: number, label: string, ariaLabel?: string) => {
    const className = `flex h-[52px] w-[52px] items-center justify-center rounded-full font-body text-[16px] font-medium text-ivory ${
      page === active ? "bg-cream" : "border border-gold"
    }`;
    const content =
      label === "next" ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="#CA9A3E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        label
      );

    if (onPageChange) {
      return (
        <button
          key={label}
          type="button"
          aria-label={ariaLabel}
          onClick={() => onPageChange(page)}
          className={className}
        >
          {content}
        </button>
      );
    }

    if (basePath) {
      return (
        <Link key={label} href={hrefFor(page)} aria-label={ariaLabel} className={className}>
          {content}
        </Link>
      );
    }

    return (
      <button key={label} type="button" aria-label={ariaLabel} className={className}>
        {content}
      </button>
    );
  };

  return (
    <div className="mt-16 flex items-center justify-center gap-5">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) =>
        renderControl(p, String(p).padStart(2, "0"))
      )}
      {isInteractive
        ? active < totalPages && renderControl(active + 1, "next", "Next page")
        : renderControl(active + 1, "next", "Next page")}
    </div>
  );
}
