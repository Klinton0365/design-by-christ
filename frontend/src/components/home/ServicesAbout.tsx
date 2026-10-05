import Link from "next/link";
import Button from "@/components/Button";

const highlights = [
  {
    title: "Project Plan",
    body: "There are many variations of the passages of lorem Ipsum from available, majority.",
  },
  {
    title: "Interior Work",
    body: "There are many variations of the passages of lorem Ipsum from available, majority.",
  },
  {
    title: "Realization",
    body: "There are many variations of the passages of lorem Ipsum from available, majority.",
  },
];

export default function ServicesAbout() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 sm:py-28">
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
        {highlights.map((h) => (
          <div
            key={h.title}
            className="flex flex-col items-center gap-5 text-center"
          >
            <h3 className="font-heading text-[25px] text-ivory">{h.title}</h3>
            <p className="font-body text-[18px] leading-relaxed text-body sm:text-[20px]">
              {h.body}
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2.5 font-body text-[18px] font-semibold tracking-wide text-body hover:text-gold"
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
        ))}
      </div>

      <hr className="my-16 border-t border-divider sm:my-20" />

      <div className="flex flex-col items-center gap-14 sm:flex-row sm:items-stretch sm:gap-16">
        <div className="flex w-full flex-col items-start gap-8 sm:max-w-[460px]">
          <h2 className="font-heading text-[36px] leading-tight text-ivory sm:text-[48px]">
            We Create The Art Of Stylish Living Stylishly
          </h2>
          <p className="font-body text-[18px] leading-relaxed text-body sm:text-[20px]">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>

          <div className="flex items-center gap-4">
            <span className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full bg-cream">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold" fill="none">
                <path
                  d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2 2z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div className="flex flex-col">
              <span className="font-heading text-[25px] text-ivory">
                +1 (378) 400-1234
              </span>
              <span className="font-body text-[18px] text-body">
                Call Us Anytime
              </span>
            </div>
          </div>

          <Button href="/contact">Get Free Estimate</Button>
        </div>

        <div className="h-[460px] w-full rounded-[40px] rounded-tl-[160px] bg-placeholder sm:h-[560px] sm:rounded-tl-[220px] lg:rounded-tl-[280px]" />
      </div>
    </section>
  );
}
