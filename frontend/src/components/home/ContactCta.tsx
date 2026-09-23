import Button from "@/components/Button";

export default function ContactCta() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-20">
      <div className="flex flex-col items-center gap-8 rounded-[70px] bg-dark px-8 py-20 text-center sm:px-24">
        <div className="flex flex-col items-center gap-3">
          <h2 className="font-heading text-[36px] text-white sm:text-[50px]">
            Wanna join the interno?
          </h2>
          <p className="max-w-[450px] font-body text-[18px] text-white sm:text-[22px]">
            It is a long established fact will be distracted.
          </p>
        </div>
        <Button href="/contact" variant="gold">
          Contact With Us
        </Button>
      </div>
    </section>
  );
}
