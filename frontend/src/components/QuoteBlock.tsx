export default function QuoteBlock({
  quote,
  attribution,
}: {
  quote: string;
  attribution: string;
}) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-14">
      <div className="relative flex flex-col items-center gap-6 rounded-[50px] bg-cream px-8 py-16 text-center sm:px-24">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-4 select-none font-heading text-[120px] italic leading-none text-gold/40 sm:text-[200px]"
        >
          &ldquo;
        </span>
        <p className="relative max-w-[750px] font-heading text-[26px] italic leading-snug text-dark sm:text-[35px]">
          {quote}
        </p>
        <p className="relative font-body text-[20px] tracking-wide text-body sm:text-[25px]">
          {attribution}
        </p>
      </div>
    </section>
  );
}
