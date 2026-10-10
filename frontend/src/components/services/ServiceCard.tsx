"use client";

import Image from "next/image";
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

export default function ServiceCard({ services }: { services: Service[] }) {
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

  return <Carousel items={cards} />;
}
