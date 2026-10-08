import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import ServiceCard from "@/components/services/ServiceCard";
import HowWeWork from "@/components/services/HowWeWork";
import ContactCta from "@/components/home/ContactCta";
import { services, servicesBody } from "@/components/services/data";

export const metadata: Metadata = {
  title: "Services | Design By Chris",
};

export default function ServicesPage() {
  return (
    <>
      <PageBanner title="Services" breadcrumb="Home / Services" />

      <section className="mx-auto max-w-[1160px] px-6 py-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={i} title={s.title} body={servicesBody} highlighted={s.highlighted} />
          ))}
        </div>
      </section>

      <HowWeWork />

      <ContactCta />
    </>
  );
}
