import SocialIcons from "@/components/SocialIcons";

const members = [
  { name: null },
  { name: null },
  {
    name: "Nattasha Julie",
    location: "Design, Australia",
    phone: "+1 (378) 400-1234",
    email: "julie@email.com",
  },
  { name: null },
];

export default function TeamStrip({
  heading = "Meet Our Team",
  bg = "bg-cream",
}: {
  heading?: string;
  bg?: string;
}) {
  return (
    <section className={`${bg} py-16`}>
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-10 px-6">
        <h2 className="font-heading text-[36px] text-ivory sm:text-[50px]">
          {heading}
        </h2>
        <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-4">
          {members.map((m, i) =>
            m.name ? (
              <div
                key={i}
                className="flex h-[433px] flex-col items-center justify-center gap-6 border border-border bg-surface px-6 text-center"
              >
                <p className="font-heading text-[25px] text-ivory">
                  {m.name}
                  <br />
                  <span className="font-body text-[18px] text-body">
                    {m.location}
                  </span>
                </p>
                <SocialIcons iconClassName="h-3.5 w-3.5" className="gap-6" />
                <p className="font-body text-[18px] text-body">
                  {m.phone}
                  <br />
                  {m.email}
                </p>
              </div>
            ) : (
              <div
                key={i}
                className="h-[433px] rounded-[30px] bg-placeholder"
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
