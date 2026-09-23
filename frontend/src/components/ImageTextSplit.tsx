import Button from "@/components/Button";

type ImageTextSplitProps = {
  heading: string;
  body: string;
  buttonLabel: string;
  buttonHref: string;
  imageSide?: "left" | "right";
};

export default function ImageTextSplit({
  heading,
  body,
  buttonLabel,
  buttonHref,
  imageSide = "right",
}: ImageTextSplitProps) {
  const image = (
    <div className="h-[320px] w-full rounded-[70px] bg-placeholder sm:h-[377px]" />
  );

  const text = (
    <div className="flex flex-1 flex-col items-start gap-8">
      <div className="flex flex-col gap-6">
        <h2 className="font-heading text-[36px] text-ivory sm:text-[50px]">
          {heading}
        </h2>
        <p className="max-w-[500px] font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
          {body}
        </p>
      </div>
      <Button href={buttonHref}>{buttonLabel}</Button>
    </div>
  );

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-14">
      <div className="flex flex-col items-center gap-10 sm:flex-row sm:gap-[90px]">
        {imageSide === "left" ? (
          <>
            <div className="w-full sm:w-[45%]">{image}</div>
            {text}
          </>
        ) : (
          <>
            {text}
            <div className="w-full sm:w-[45%]">{image}</div>
          </>
        )}
      </div>
    </section>
  );
}
