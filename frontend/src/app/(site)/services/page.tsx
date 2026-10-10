import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import ServiceCard from "@/components/services/ServiceCard";
import HowWeWork from "@/components/services/HowWeWork";
import ContactCta from "@/components/home/ContactCta";
import { getServices } from "@/lib/api";

export const metadata: Metadata = {
  title: "Services | Design By Chris",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageBanner title="Services" breadcrumb="Home / Services" />

      <section className="py-20">
        <ServiceCard services={services} />
      </section>

      <HowWeWork />

      <ContactCta />
    </>
  );
}
