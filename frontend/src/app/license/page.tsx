import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Licenses | Design By Chris",
};

const credits = [
  {
    title: "Fonts",
    body: "This site pairs the free, open-licensed Google Fonts Playfair Display for headings and Instrument Serif for body text.",
  },
  {
    title: "Photography",
    body: "Imagery placeholders are used throughout; replace with licensed photography from Unsplash, Pexels, or your own assets before launch.",
  },
];

export default function LicensePage() {
  return (
    <>
      <PageBanner title="Licenses" breadcrumb="Home / Licenses" />

      <section className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 py-20">
        {credits.map((c) => (
          <div key={c.title} className="rounded-[40px] bg-cream px-10 py-12">
            <h2 className="font-heading text-[32px] text-ivory">{c.title}</h2>
            <p className="mt-4 font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
              {c.body}
            </p>
          </div>
        ))}
      </section>
    </>
  );
}
