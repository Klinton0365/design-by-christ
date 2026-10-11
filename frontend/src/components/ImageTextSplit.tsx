import Image from "next/image";
import Button from "@/components/Button";
import AnimatedText from "@/components/AnimatedText";

type ImageTextSplitProps = {
  heading: string;
  body: string;
  buttonLabel: string;
  buttonHref: string;
  imageSide?: "left" | "right";
  image?: string;
};

export default function ImageTextSplit({
  heading,
  body,
  buttonLabel,
  buttonHref,
  imageSide = "right",
  image,
}: ImageTextSplitProps) {
  const imageBlock = (
    <div className="relative h-[320px] w-full overflow-hidden rounded-[70px] bg-placeholder sm:h-[377px]">
      {image && (
        <Image
          src={image}
          alt={heading}
          fill
          sizes="(min-width: 640px) 45vw, 100vw"
          className="object-cover"
        />
      )}
    </div>
  );

  const text = (
    <div className="flex flex-1 flex-col items-start gap-8">
      <div className="flex flex-col gap-6">
        <AnimatedText as="h2" className="font-heading text-[36px] text-ivory sm:text-[50px]">
          {heading}
        </AnimatedText>
        <AnimatedText as="p" className="max-w-[500px] font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
          {body}
        </AnimatedText>
      </div>
      <Button href={buttonHref}>{buttonLabel}</Button>
    </div>
  );

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-14">
      <div className="flex flex-col items-center gap-10 sm:flex-row sm:gap-[90px]">
        {imageSide === "left" ? (
          <>
            <div className="w-full sm:w-[45%]">{imageBlock}</div>
            {text}
          </>
        ) : (
          <>
            {text}
            <div className="w-full sm:w-[45%]">{imageBlock}</div>
          </>
        )}
      </div>
    </section>
  );
}
