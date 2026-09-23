import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Interno",
};

const details = [
  { label: "info@yourdomain.com" },
  { label: "+1 (378) 400-1234" },
  { label: "www.yourdomain.com" },
];

export default function ContactPage() {
  return (
    <>
      <PageBanner title="Contact Us" breadcrumb="Home / Contact" />

      <section className="mx-auto flex max-w-[1200px] flex-col items-center gap-20 px-6 py-20">
        <h2 className="max-w-[680px] text-center font-heading text-[36px] text-dark sm:text-[50px]">
          We love meeting new people and helping them.
        </h2>

        <div className="flex w-full flex-col items-start gap-14 sm:flex-row sm:gap-14">
          <div className="flex w-full max-w-[349px] flex-col gap-12 rounded-[50px] bg-cream px-8 py-16">
            {details.map((d) => (
              <div key={d.label} className="flex items-center gap-4">
                <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-white">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#CDA274" strokeWidth="2" />
                  </svg>
                </span>
                <span className="font-body text-[20px] text-body">
                  {d.label}
                </span>
              </div>
            ))}
          </div>

          <ContactForm variant="full" />
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-20">
        <div className="h-[300px] w-full rounded-[70px] bg-dark sm:h-[420px]" />
      </section>
    </>
  );
}
