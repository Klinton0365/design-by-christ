import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import ServiceCard from "@/components/services/ServiceCard";
import HowWeWork from "@/components/services/HowWeWork";
import ContactCta from "@/components/home/ContactCta";

export const metadata: Metadata = {
  title: "Services | Design By Chris",
};

export default function ServicesPage() {
  return (
    <>
      <PageBanner title="Services" breadcrumb="Home / Services" />

      <ServiceCard />

      <HowWeWork />

      <ContactCta />
    </>
  );
}
