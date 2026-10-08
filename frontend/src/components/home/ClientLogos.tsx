import AnimatedText from "@/components/AnimatedText";

const logos = [
  "Aurelia Studio",
  "Nova Haus",
  "Lumen & Co",
  "Meridian Interiors",
  "Onyx Living",
  "Vera & Co",
];

export default function ClientLogos() {
  const loop = [...logos, ...logos];

  return (
    <section className="border-y border-divider bg-surface/40 py-12">
      <AnimatedText
        as="p"
        className="mb-8 text-center font-body text-[14px] uppercase tracking-[0.35em] text-body/70"
      >
        Trusted By Homeowners &amp; Studios
      </AnimatedText>

      <div className="relative mx-auto max-w-[1200px] overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-10 px-6">
          {loop.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex h-[64px] w-[190px] shrink-0 items-center justify-center rounded-xl border border-border bg-surface px-6 opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <span className="font-heading text-[19px] tracking-wide text-gold">
                {name}
              </span>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-base to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-base to-transparent sm:w-28" />
      </div>
    </section>
  );
}
