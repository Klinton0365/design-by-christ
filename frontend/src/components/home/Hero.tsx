import Button from "@/components/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream pb-24 pt-[220px]">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-14 px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-[560px] flex-col items-start gap-7 text-left">
          <p className="font-body text-[18px] tracking-wide text-gold">
            Interior Design Studio
          </p>
          <h1 className="font-heading text-[56px] leading-[1.15] text-dark sm:text-[70px]">
            We Create Spaces That Feel Like Home
          </h1>
          <p className="font-body text-[22px] leading-relaxed text-body">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
          <Button href="/project">Our Projects</Button>
        </div>

        <div className="relative h-[420px] w-full max-w-[560px] overflow-hidden rounded-[70px] bg-placeholder sm:h-[520px]">
          <div className="absolute inset-0 flex items-center justify-center font-body text-sm text-white/70">
            hero image
          </div>
        </div>
      </div>
    </section>
  );
}
