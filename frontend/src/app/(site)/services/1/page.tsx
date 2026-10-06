import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import ImageTextSplit from "@/components/ImageTextSplit";
import Counter from "@/components/home/Counter";

export const metadata: Metadata = {
  title: "Service Single | Design By Chris",
};

const pointsA = [
  "We provide high quality design services.",
  "Project on time and Latest Design.",
  "Scientific Skills For getting a better result.",
  "Renovations",
  "Benefit of Service We are confident about our projects.",
];

const pointsB = [
  "Complete home redesign and interior planning.",
  "Modular kitchen and living space layouts.",
  "Custom furniture sourcing and staging.",
  "Lighting and material consultation.",
  "Ongoing support after project handover.",
];

function PointsList({ heading, points }: { heading: string; points: string[] }) {
  return (
    <div className="flex-1">
      <h3 className="font-heading text-[36px] text-ivory sm:text-[50px]">
        {heading}
      </h3>
      <ul className="mt-8 flex flex-col gap-5">
        {points.map((p, i) => (
          <li key={p} className="flex gap-4">
            <span className="font-heading text-[20px] text-gold">
              {i + 1}
            </span>
            <span className="font-body text-[20px] leading-relaxed text-body sm:text-[22px]">
              {p}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServiceSinglePage() {
  return (
    <>
      <PageBanner title="Service Single" breadcrumb="Home / Services Single" />

      <section className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-24">
          <h2 className="max-w-[450px] font-heading text-[36px] leading-tight text-ivory sm:text-[50px]">
            We set the trends of modern living Services.
          </h2>
          <div className="flex flex-col gap-6">
            <p className="font-body text-[22px] leading-relaxed text-gold sm:text-[25px]">
              It is a long established fact that a reader will be distracted
              by the readable content of a page when looking at its layout.
            </p>
            <p className="font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
              A wonderful serenity has taken possession of my entire soul,
              like these sweet mornings of spring which I enjoy with my
              whole heart.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-14">
        <div className="relative flex h-[280px] items-center justify-center rounded-[70px] bg-dark sm:h-[374px]">
          <div className="flex h-[132px] w-[132px] items-center justify-center rounded-full bg-surface glow-gold-sm">
            <div className="ml-1 h-0 w-0 border-y-[14px] border-l-[22px] border-y-transparent border-l-gold" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1030px] px-6 pb-20">
        <div className="flex flex-col gap-14 sm:flex-row">
          <PointsList heading="Use of Interior" points={pointsA} />
          <div className="hidden w-px bg-gold/25 sm:block" />
          <PointsList heading="Make An Art" points={pointsB} />
        </div>
      </section>

      <ImageTextSplit
        heading="We love design. That's how we got here."
        body="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        buttonLabel="Our Portfolio"
        buttonHref="/project"
        imageSide="left"
      />

      <Counter />
    </>
  );
}
