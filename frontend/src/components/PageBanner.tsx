import Image from "next/image";
import AnimatedText from "@/components/AnimatedText";

export default function PageBanner({
  title,
  breadcrumb,
  image,
}: {
  title: string;
  breadcrumb: string;
  image?: string;
}) {
  return (
    <section>
      <div className="relative h-[280px] overflow-hidden sm:h-[356px]">
        {image ? (
          <>
            <Image src={image} alt="" fill sizes="100vw" priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-gold-deep/80 via-gold/55 to-dark/70" />
          </>
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-gold-light via-gold to-gold-deep" />
        )}
      </div>
      <div className="glow-gold relative z-10 mx-auto -mt-[95px] w-[90%] max-w-[504px] rounded-[37px] bg-surface px-8 py-10 text-center sm:-mt-[110px]">
        <AnimatedText as="h1" className="font-heading text-[36px] text-ivory sm:text-[50px]">
          {title}
        </AnimatedText>
        <AnimatedText as="p" className="mt-2 font-body text-[18px] text-body sm:text-[22px]">
          {breadcrumb}
        </AnimatedText>
      </div>
    </section>
  );
}
