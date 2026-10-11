"use client";

import AnimatedText from "@/components/AnimatedText";
import { ExpandableGallery } from "@/components/ui/expandable-gallery";
import type { Service } from "@/lib/api";

export default function ServiceGallery({ services }: { services: Service[] }) {
  const items = services.map((service) => ({
    src: service.image_url ?? undefined,
    title: service.title,
    summary: service.summary,
  }));

  return (
    <section className="py-20">
      <div className="mx-auto flex max-w-[700px] flex-col items-center gap-3 px-6 text-center">
        <AnimatedText as="h2" className="font-heading text-[36px] text-ivory sm:text-[50px]">
          The Art of Elevated Living
        </AnimatedText>
        <AnimatedText as="p" className="font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
          From concept to completion, every service is considered, crafted, and built to last.
        </AnimatedText>
      </div>

      <div className="mx-auto mt-14 max-w-[1200px] px-6">
        <ExpandableGallery images={items} />
      </div>
    </section>
  );
}
