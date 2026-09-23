import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import ImageTextSplit from "@/components/ImageTextSplit";
import QuoteBlock from "@/components/QuoteBlock";
import TeamStrip from "@/components/TeamStrip";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "About Us | Interno",
};

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About Us" breadcrumb="Home / About Us" />

      <ImageTextSplit
        heading="What We Do"
        body="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout that it has a more-or-less normal."
        buttonLabel="Our Concept"
        buttonHref="/services"
        imageSide="right"
      />

      <QuoteBlock
        quote="I like an interior that defies labeling. I don't really want someone to walk into a room and know that I did it"
        attribution="- BUNNY WILLIAMS"
      />

      <ImageTextSplit
        heading="The End Result"
        body="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout that it has a more-or-less normal."
        buttonLabel="Our Portfolio"
        buttonHref="/project"
        imageSide="left"
      />

      <TeamStrip />

      <section className="mx-auto flex max-w-[800px] flex-col items-center gap-14 px-6 py-20 text-center">
        <h2 className="font-heading text-[36px] text-dark sm:text-[50px]">
          Creative project? Let&apos;s have a productive talk.
        </h2>
        <ContactForm />
      </section>
    </>
  );
}
