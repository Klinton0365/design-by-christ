const logos = ["01", "02", "03", "04", "05"];

export default function ClientLogos() {
  return (
    <section className="mx-auto max-w-[1090px] px-6 py-10">
      <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6 opacity-70">
        {logos.map((l) => (
          <div
            key={l}
            className="flex h-[60px] w-[130px] items-center justify-center rounded border border-border bg-surface font-body text-sm text-body"
          >
            client {l}
          </div>
        ))}
      </div>
    </section>
  );
}
