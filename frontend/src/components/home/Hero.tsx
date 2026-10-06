import Button from "@/components/Button";
import HeroBeforeAfter from "./HeroBeforeAfter";

export default function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[420px] w-full overflow-hidden rounded-bl-[60px] sm:h-[600px] sm:rounded-bl-[140px] lg:h-[760px] xl:h-[820px] xl:rounded-bl-[291px]">
        <HeroBeforeAfter />
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="flex max-w-[567px] flex-col items-start gap-6">
            <h1 className="font-heading text-[40px] leading-[1.2] text-[#292F36] sm:text-[60px] lg:text-[85px]">
              Let Your Home Be Unique
            </h1>
            <p className="max-w-[553px] font-body text-[18px] leading-relaxed text-[#4D5053] sm:text-[22px]">
              There are many variations of the passages of lorem Ipsum from
              available, variations of the passages.
            </p>
            <span className="pointer-events-auto">
              <Button href="/contact">Get Started</Button>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
