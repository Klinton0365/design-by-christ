"use client";

import Image from "next/image";
import AnimatedText from "@/components/AnimatedText";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import type { Service } from "@/lib/api";

function ServiceDetail({ service }: { service: Service }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <p className="font-body text-[18px] leading-relaxed text-body sm:text-[20px]">
        {service.description}
      </p>
      {service.detail_image_url && (
        <div className="relative h-[320px] w-full overflow-hidden rounded-[30px] bg-placeholder sm:h-[420px]">
          <Image
            src={service.detail_image_url}
            alt={service.title}
            fill
            sizes="(min-width: 768px) 700px, 100vw"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}

export default function ServiceCarousel({ services }: { services: Service[] }) {
  const cards = services.map((service, index) => (
    <Card
      key={service.id}
      index={index}
      card={{
        title: service.title,
        category: "Our Service",
        src: service.image_url ?? undefined,
        content: <ServiceDetail service={service} />,
      }}
    />
  ));

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

      <Carousel items={cards} />
    </section>
  );
}
