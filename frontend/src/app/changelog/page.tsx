import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Changelog | Interno",
};

const entries = [{ version: "V.1", description: "Initial site release." }];

export default function ChangelogPage() {
  return (
    <>
      <PageBanner title="Changelog" breadcrumb="Home / Changelog" />

      <section className="mx-auto max-w-[1200px] px-6 py-20">
        {entries.map((e) => (
          <div
            key={e.version}
            className="flex flex-col items-center gap-3 rounded-[70px] bg-cream px-10 py-16 text-center sm:flex-row sm:justify-center sm:gap-4"
          >
            <span className="font-heading text-[40px] text-dark sm:text-[50px]">
              {e.version}
            </span>
            <span className="font-body text-[18px] text-body sm:text-[22px]">
              {e.description}
            </span>
          </div>
        ))}
      </section>
    </>
  );
}
