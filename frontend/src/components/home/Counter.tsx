const stats = [
  { value: "12", label: "Years Of Experience" },
  { value: "85", label: "Success Project" },
  { value: "15", label: "Active Project" },
  { value: "95", label: "Happy Customers" },
];

export default function Counter() {
  return (
    <section className="bg-cream py-16">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-start justify-center gap-x-16 gap-y-10 px-6">
        {stats.map((s, i) => (
          <div key={s.label} className="flex items-start gap-16">
            <div className="flex flex-col items-center gap-4">
              <span className="font-heading text-[64px] leading-none text-gold sm:text-[85px]">
                {s.value}
              </span>
              <span className="font-body text-[20px] text-body sm:text-[22px]">
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
