import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Project Details | Design By Chris",
};

const info = [
  { label: "Client", value: "Your client name" },
  { label: "Category", value: "Interiors interior, Home" },
  { label: "Tags", value: "Bedroom, Decor" },
  { label: "Date", value: "23.02.2022" },
  { label: "Link", value: "example.com" },
];

export default function ProjectDetailsPage() {
  return (
    <>
      <PageBanner title="Project Details" breadcrumb="Home / Project Details" />

      <section className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="flex flex-col gap-10 sm:flex-row sm:gap-10">
          <div className="flex w-full max-w-[500px] flex-col gap-6 rounded-[70px] bg-cream px-10 py-14">
            {info.map((row) => (
              <div key={row.label} className="flex justify-between gap-6">
                <span className="font-heading text-[20px] text-body sm:text-[22px]">
                  {row.label}
                </span>
                <span className="font-body text-[20px] text-body sm:text-[22px]">
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <h2 className="font-heading text-[36px] text-ivory sm:text-[50px]">
              Minimal Look Bedrooms
            </h2>
            <p className="font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              sem vitae turpis dignissim maximus. Aliquam sollicitudin tellus
              massa, vel maximus purus posuere in. Praesent at nibh in mi
              fringilla mattis.
            </p>
          </div>
        </div>

        <div className="relative mt-14 flex h-[420px] items-center justify-center rounded-[70px] bg-placeholder sm:h-[799px]">
          <div className="flex h-[132px] w-[132px] items-center justify-center rounded-full bg-surface glow-gold-sm">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
              <circle cx="10" cy="10" r="7" stroke="#CA9A3E" strokeWidth="2" />
              <path d="M15 15l6 6" stroke="#CA9A3E" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}
