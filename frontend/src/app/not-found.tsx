import Button from "@/components/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-[1200px] flex-col items-center gap-14 px-6 py-32 sm:flex-row sm:items-center sm:justify-between sm:py-40">
      <div className="flex flex-col items-start gap-6 text-left">
        <span className="text-gold-shimmer font-heading text-[140px] leading-none sm:text-[220px]">
          404
        </span>
        <p className="max-w-[500px] font-heading text-[28px] leading-snug text-ivory sm:text-[35px]">
          We are sorry, but the page you requested was not found
        </p>
        <Button href="/">Back To Home</Button>
      </div>
      <div className="glow-gold h-[300px] w-full rounded-bl-[150px] bg-placeholder sm:h-[500px] sm:w-[420px]" />
    </section>
  );
}
