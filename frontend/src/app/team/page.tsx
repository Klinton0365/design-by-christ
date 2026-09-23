import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Our Professional | Design By Chris",
};

const members = [
  "Charlotte Levi",
  "Nattasha Julie",
  "John Smith",
  "Nora Owen",
  "Sofia Carter",
  "Avery Jackson",
  "Luna James",
  "Gianna Mateo",
];

export default function TeamPage() {
  return (
    <>
      <PageBanner title="Our Professional" breadcrumb="Home / Team" />

      <section className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {members.map((name, i) => (
            <Link
              key={name}
              href={`/team/${i + 1}`}
              className="flex flex-col items-center gap-4 text-center"
            >
              <div className="h-[280px] w-full rounded-[30px] bg-placeholder sm:h-[433px]" />
              <p className="font-heading text-[22px] text-ivory sm:text-[25px]">
                {name}
                <br />
                <span className="font-body text-[16px] text-body sm:text-[18px]">
                  Design, Australia
                </span>
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
