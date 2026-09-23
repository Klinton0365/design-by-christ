const testimonials = [
  {
    name: "Nattasha Mith",
    location: "Sydney, USA",
    quote:
      "Lorem Ipsum is simply dummy text of the typesetting industry. Ipsum has been scrambled it to make a type specimen.",
  },
  {
    name: "Raymond Galario",
    location: "Sydney, Australia",
    quote:
      "Lorem Ipsum is simply dummy text of the typesetting industry. Ipsum has been scrambled it to make a type specimen.",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16">
      <div className="rounded-[70px] bg-cream px-6 py-16 sm:px-16">
        <h2 className="mx-auto max-w-[550px] text-center font-heading text-[36px] leading-tight text-dark sm:text-[50px]">
          What the People Thinks About Us
        </h2>
        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:justify-center">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex w-full max-w-[370px] flex-col gap-6 rounded-[30px] bg-white p-8"
            >
              <div className="flex items-center gap-6">
                <div className="h-[77px] w-[77px] shrink-0 rounded-full bg-placeholder" />
                <p className="font-heading text-[22px] leading-snug text-dark">
                  {t.name}
                  <br />
                  <span className="font-body text-[16px] text-body">
                    {t.location}
                  </span>
                </p>
              </div>
              <p className="font-body text-[18px] leading-relaxed text-body">
                {t.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
