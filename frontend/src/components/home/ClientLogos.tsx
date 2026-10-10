import Image from "next/image";
import AnimatedText from "@/components/AnimatedText";

const logos = [
  { name: "Aurelia Studio", mark: "/img/logos/mark-1.svg" },
  { name: "Nova Haus", mark: "/img/logos/mark-2.svg" },
  { name: "Lumen & Co", mark: "/img/logos/mark-3.svg" },
  { name: "Meridian Interiors", mark: "/img/logos/mark-4.svg" },
  { name: "Onyx Living", mark: "/img/logos/mark-5.svg" },
  { name: "Vera & Co", mark: "/img/logos/mark-6.svg" },
];

function LogoMark({ name, mark }: { name: string; mark: string }) {
  return (
    <span className="flex h-10 shrink-0 items-center" title={name}>
      <Image
        src={mark}
        alt={name}
        width={120}
        height={32}
        className="h-7 w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-8"
      />
    </span>
  );
}

export default function ClientLogos() {
  const loop = [...logos, ...logos];

  return (
    <section className="border-y border-divider bg-surface/40 py-12 sm:py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col items-center gap-8 xl:flex-row xl:items-center xl:gap-16">
          <AnimatedText
            as="h2"
            className="shrink-0 text-center font-heading text-[28px] text-ivory xl:text-left xl:text-[32px]"
          >
            Trusted By Homeowners &amp; Studios
          </AnimatedText>

          <div className="relative w-full overflow-hidden">
            <div className="marquee-track flex w-max items-center gap-14">
              {loop.map((logo, i) => (
                <LogoMark key={`${logo.name}-${i}`} name={logo.name} mark={logo.mark} />
              ))}
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-base to-transparent sm:w-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-base to-transparent sm:w-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
