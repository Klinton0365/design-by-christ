import Link from "next/link";
import AnimatedText from "@/components/AnimatedText";

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

export default function Services() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 sm:py-28">
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
        {highlights.map((h, i) => (
          <div
            key={h.title}
            className="flex flex-col items-center gap-5 text-center"
          >
            <AnimatedText
              as="h3"
              delay={i * 0.1}
              className="font-heading text-[25px] text-ivory"
            >
              {h.title}
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={i * 0.1}
              className="font-body text-[18px] leading-relaxed text-body sm:text-[20px]"
            >
              {h.body}
            </AnimatedText>
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
    </section>
  );
}
