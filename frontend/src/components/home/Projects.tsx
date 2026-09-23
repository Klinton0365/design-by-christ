const projects = [
  { title: "Modern Kitchen", category: "Decor / Architecture" },
  { title: "Minimal Bedroom", category: "Decor / Architecture" },
  { title: "Cozy Living Room", category: "Decor / Architecture" },
  { title: "Elegant Bathroom", category: "Decor / Architecture" },
];

export default function Projects() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16">
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="font-heading text-[36px] text-ivory sm:text-[50px]">
          Follow Our Projects
        </h2>
        <p className="max-w-[700px] font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
          It is a long established fact that a reader will be distracted by
          the readable content of a page when looking at its layout.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {projects.map((p) => (
          <div key={p.title} className="flex flex-col gap-6">
            <div className="h-[350px] w-full rounded-[40px] bg-placeholder" />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-[25px] text-ivory">
                  {p.title}
                </h3>
                <p className="font-body text-[18px] text-body">
                  {p.category}
                </p>
              </div>
              <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-cream">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="#CA9A3E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
