import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import ServiceCard from "@/components/services/ServiceCard";
import HowWeWork from "@/components/services/HowWeWork";
import ContactCta from "@/components/home/ContactCta";

export const metadata: Metadata = {
  title: "Services | Design By Chris",
};

const services = [
  { title: "Project Plan", highlighted: false },
  { title: "Interior Work", highlighted: false },
  { title: "Retail Design", highlighted: false },
  { title: "2d/3d Art Work", highlighted: false },
  { title: "Interior Work", highlighted: true },
  { title: "Decoration Work", highlighted: false },
];

const body =
  "There are many variations of the passages of lorem Ipsum available, majority.";

export default function ServicesPage() {
  return (
    <>
      <PageBanner title="Services" breadcrumb="Home / Services" />

      <section className="mx-auto max-w-[1160px] px-6 py-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={i} title={s.title} body={body} highlighted={s.highlighted} />
          ))}
        </div>
      </section>

      <HowWeWork />

      <ContactCta />
    </>
  );
}
