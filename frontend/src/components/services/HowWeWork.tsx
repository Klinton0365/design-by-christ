const steps = [
  {
    number: "01",
    title: "Concept & Details",
    body: "It is a long established fact that a reader will be distracted. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    number: "02",
    title: "Idea for Work",
    body: "It is a long established fact that a reader will be distracted. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    number: "03",
    title: "Design",
    body: "It is a long established fact that a reader will be distracted. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    number: "04",
    title: "Perfection",
    body: "It is a long established fact that a reader will be distracted. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

export default function HowWeWork() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-14">
      <div className="rounded-[70px] bg-cream px-6 py-20 sm:px-16">
        <div className="mx-auto flex max-w-[800px] flex-col items-center gap-3 text-center">
          <h2 className="font-heading text-[36px] text-dark sm:text-[50px]">
            How We Work
          </h2>
          <p className="font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
            It is a long established fact will be distracted. Lorem Ipsum is
            simply dummy text of the printing and typesetting industry.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-14">
          {steps.map((step, i) => {
            const image = (
              <div className="h-[300px] w-full rounded-[80px] bg-placeholder sm:h-[453px] sm:w-[453px]" />
            );
            const text = (
              <div className="flex flex-1 flex-col items-start gap-8">
                <span className="font-heading text-[80px] leading-none text-gold sm:text-[120px]">
                  {step.number}
                </span>
                <div className="flex flex-col gap-3">
                  <h3 className="font-heading text-[28px] text-dark sm:text-[35px]">
                    {step.title}
                  </h3>
                  <p className="max-w-[456px] font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
                    {step.body}
                  </p>
                </div>
              </div>
            );
            return (
              <div
                key={step.number}
                className="flex flex-col items-center gap-8 sm:flex-row sm:gap-12"
              >
                {i % 2 === 0 ? (
                  <>
                    {image}
                    {text}
                  </>
                ) : (
                  <>
                    {text}
                    {image}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
