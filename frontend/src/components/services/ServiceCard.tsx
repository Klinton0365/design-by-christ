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
      className={`flex flex-col items-center gap-8 rounded-[30px] px-6 py-8 text-center ${
        highlighted ? "bg-cream" : ""
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <h3 className="font-heading text-[25px] text-dark">{title}</h3>
        <p className="font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
          {body}
        </p>
      </div>
      <Link
        href="/services/1"
        className="inline-flex items-center gap-3 font-body text-[18px] font-semibold tracking-wide text-body hover:text-dark"
      >
        Read More
        <span aria-hidden className="inline-block h-[13px] w-[15px] border-2 border-gold" />
      </Link>
    </div>
  );
}
