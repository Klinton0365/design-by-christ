import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import QuoteBlock from "@/components/QuoteBlock";
import ContactForm from "@/components/ContactForm";
import BlogSidebar from "@/components/blog/BlogSidebar";

export const metadata: Metadata = {
  title: "Blog Details | Design By Chris",
};

const points = [
  "Contrary to popular belief, there are many variations of passages of Lorem Ipsum available, but the majority have suffered.",
  "Contrary to popular belief, there are many variations of passages of Lorem Ipsum available, but the majority have suffered.",
  "Contrary to popular belief, there are many variations of passages of Lorem Ipsum available, but the majority have suffered.",
];

const tags = ["Kitchan", "Bedroom"];

export default function BlogDetailsPage() {
  return (
    <>
      <PageBanner title="Design Sprints Are Great" breadcrumb="Home / Blog Details" />

      <section className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="flex flex-col gap-14 lg:flex-row lg:gap-14">
          <article className="flex flex-1 flex-col gap-12">
            <div className="flex flex-col gap-6">
              <h2 className="font-heading text-[36px] text-ivory sm:text-[50px]">
                Design sprints are great
              </h2>
              <p className="font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
                Lorem ipsum dolor sit amet, adipiscing Aliquam eu sem vitae
                turpis dignissim maximus. Contrary to popular belief, there
                are many variations of passages of Lorem Ipsum available, but
                the majority have suffered.
              </p>
              <ul className="flex flex-col gap-5">
                {points.map((p, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-heading text-[20px] text-gold">
                      {i + 1}
                    </span>
                    <span className="font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-[280px] w-full rounded-[50px] bg-placeholder sm:h-[365px]" />

            <div className="flex flex-wrap items-center gap-4 border-t border-divider pt-8">
              <span className="font-heading text-[20px] text-ivory">Tags</span>
              {tags.map((t, i) => (
                <span
                  key={t}
                  className={`rounded-[10px] px-6 py-3 font-body text-[18px] ${
                    i === 0 ? "bg-dark text-white" : "bg-cream text-ivory"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>

            <QuoteBlock
              quote="The details are not the details. They make the design."
              attribution="— Charles Eames"
            />

            <div className="flex flex-col gap-6">
              <h2 className="font-heading text-[36px] text-ivory sm:text-[50px]">
                Let&apos;s Get Solution for Building Construction Work
              </h2>
              <div className="h-[280px] w-full rounded-[50px] bg-placeholder sm:h-[539px]" />
              <div className="flex flex-wrap items-center justify-between gap-3 font-body text-[16px] text-body">
                <span>26 December, 2022</span>
                <span>Interior / Design / Home / Decore</span>
              </div>
              <p className="font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
                Lorem ipsum dolor sit amet, adipiscing Aliquam eu sem vitae
                turpis dignissim maximus. Contrary to popular belief, there
                are many variations of passages of Lorem Ipsum available, but
                the majority have suffered alteration in some form.
              </p>
            </div>

            <div className="flex flex-col gap-10">
              <h3 className="font-heading text-[25px] text-ivory">
                Leave a Reply
              </h3>
              <ContactForm variant="full" />
            </div>
          </article>

          <BlogSidebar />
        </div>
      </section>
    </>
  );
}
