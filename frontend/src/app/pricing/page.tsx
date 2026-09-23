import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Pricing & Plan | Design By Chris",
};

const plans = [
  {
    title: "Design advices",
    price: "$29",
    features: [
      "General living space advices",
      "Rennovation advices",
      "Interior design advices",
      "Furniture reorganization",
      "Up to 5 hours meetings",
    ],
    highlighted: false,
  },
  {
    title: "Complete interior",
    price: "$39",
    features: [
      "Complete home redesign",
      "Interior and exterior works",
      "Modular interior planning",
      "Kitchen design",
      "Garages organization",
    ],
    highlighted: true,
  },
  {
    title: "Furniture design",
    price: "$59",
    features: [
      "Furniture for living room",
      "Furniture refurbishment",
      "Sofas and armchairs",
      "Tables and chairs",
      "Kitchens",
    ],
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <PageBanner title="Pricing & Plan" breadcrumb="Home / Pricing" />

      <section className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`flex flex-col items-center gap-7 rounded-[33px] bg-cream px-6 py-14 text-center ${
                plan.highlighted
                  ? "glow-gold"
                  : "border border-border"
              }`}
            >
              <div className="flex flex-col items-center gap-9">
                <div className="flex flex-col items-center gap-2">
                  <h3 className="font-heading text-[25px] text-ivory">
                    {plan.title}
                  </h3>
                  <p className="font-heading text-[25px] text-ivory">
                    {plan.price} /month
                  </p>
                </div>
                {plan.highlighted && (
                  <span className="rounded-[18px] bg-dark px-8 py-2.5 font-body text-[16px] font-semibold text-white">
                    Most Popular Plan
                  </span>
                )}
                <hr className="w-full border-gold" />
              </div>

              <ul className="flex flex-col gap-2 font-body text-[18px] text-body">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`inline-flex items-center gap-2.5 rounded-[18px] px-9 py-6 font-body text-[18px] font-semibold text-white glow-gold transition-opacity hover:opacity-90 ${
                  plan.highlighted ? "bg-dark" : "bg-gold"
                }`}
              >
                Get Started
                <span
                  aria-hidden
                  className={`inline-block h-[13px] w-[15px] border-2 ${
                    plan.highlighted ? "border-gold" : "border-dark"
                  }`}
                />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
