import CountUp from "./CountUp";

const stats = [
  { value: 12, label: "Years Of Experience" },
  { value: 85, label: "Success Project" },
  { value: 15, label: "Active Project" },
  { value: 95, label: "Happy Customers" },
];

export default function Counter() {
  return (
    <section className="bg-cream py-16">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-start justify-center gap-x-16 gap-y-10 px-6">
        {stats.map((s, i) => (
          <div key={s.label} className="flex items-start gap-16">
            <div className="flex flex-col items-center gap-4">
              <CountUp
                from={0}
                to={s.value}
                duration={1.5}
                delay={i * 0.1}
                separator=","
                className="font-heading text-[64px] leading-none text-gold sm:text-[85px]"
              />
              <span className="font-body text-[16px] text-body sm:text-[18px]">
                {s.label}
              </span>
            </div>
            {i < stats.length - 1 && (
              <span className="mt-[18px] hidden h-[36px] w-px rotate-90 bg-gold sm:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
