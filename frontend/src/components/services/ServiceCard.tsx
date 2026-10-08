import Link from "next/link";

export default function ServiceCard({
  title,
  body,
  highlighted = false,
}: {
  title: string;
  body: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-8 rounded-[30px] px-6 py-8 text-center transition-colors duration-300 hover:bg-cream ${
        highlighted ? "bg-cream" : ""
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <h3 className="font-heading text-[25px] text-ivory">{title}</h3>
        <p className="font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
          {body}
        </p>
      </div>
      <Link
        href="/services/1"
        className="inline-flex items-center gap-3 font-body text-[18px] font-semibold tracking-wide text-body hover:text-ivory"
      >
        Read More
        <span aria-hidden className="inline-flex h-[15px] w-[15px] shrink-0 text-gold">
          <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Link>
    </div>
  );
}
