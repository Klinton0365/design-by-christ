import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import CategoryTabs from "@/components/project/CategoryTabs";
import Pagination from "@/components/project/Pagination";

export const metadata: Metadata = {
  title: "Our Project | Design By Chris",
};

const projects = [
  "Minimal Bedroom",
  "Minimal Bedroom",
  "Classic Minimal Bedroom",
  "Modern Bedroom",
  "Minimal Bedroom table",
  "System Table",
  "Modern Medroom",
  "Modern Bedroom",
];

export default function ProjectPage() {
  return (
    <>
      <PageBanner title="Our Project" breadcrumb="Home / Project" />

      <section className="mx-auto max-w-[1200px] px-6 py-20">
        <CategoryTabs />

        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2">
          {projects.map((title, i) => (
            <Link
              key={i}
              href={`/project/${i + 1}`}
              className="flex flex-col gap-6"
            >
              <div className="h-[350px] w-full bg-placeholder sm:h-[522px]" />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-[25px] text-ivory">
                    {title}
                  </h3>
                  <p className="font-body text-[22px] text-body">
                    Decor / Architecture
                  </p>
                </div>
                <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-cream">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="#CA9A3E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Pagination />
      </section>
    </>
  );
}
