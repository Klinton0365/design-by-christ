import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import SocialIcons from "@/components/SocialIcons";
import TeamStrip from "@/components/TeamStrip";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Professional Single | Design By Chris",
};

const skills = [
  { label: "Project Design", value: 65 },
  { label: "Team Management", value: 95 },
  { label: "Client Satisfaction", value: 75 },
];

const faqs = [
  {
    question: "Website & Mobile App Design?",
    answer:
      "Lorem ipsum dolor sit amet, adipiscing from Aliquam eu sem turpis maximus.",
  },
  { question: "How to Easy Successful Projects?" },
  { question: "International Trade Experience?" },
];

export default function TeamSinglePage() {
  return (
    <>
      <PageBanner title="Professional Single" breadcrumb="Home / Team Single" />

      <section className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="flex flex-col items-center gap-14 sm:flex-row">
          <div className="h-[420px] w-full rounded-[50px] bg-placeholder sm:h-[689px] sm:w-[590px]" />

          <div className="flex flex-1 flex-col gap-10">
            <div className="flex flex-col gap-3">
              <h1 className="font-heading text-[44px] text-ivory sm:text-[50px]">
                John Smith
              </h1>
              <p className="font-body text-[22px] text-body">Designer</p>
            </div>
            <p className="font-body text-[20px] leading-relaxed text-body sm:text-[22px]">
              Lorem ipsum dolor sit amet, adipiscing Aliquam eu sem vitae
              turpis dignissim maximus. Contrary to popular belief, there are
              many variations of passages of Lorem Ipsum available.
            </p>
            <div className="flex flex-col gap-6 font-body text-[20px] text-body">
              <p>info@yourdomain.com</p>
              <p>+1 (378) 400-1234</p>
              <p>www.yourdomain.com</p>
            </div>
            <SocialIcons />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-20">
        <div className="flex flex-col items-center gap-16">
          <div className="w-full text-center">
            <h2 className="font-heading text-[36px] text-ivory sm:text-[50px]">
              Short Biography
            </h2>
            <p className="mx-auto mt-6 max-w-[1000px] font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
              Lorem ipsum dolor sit amet, adipiscing Aliquam eu sem vitae
              turpis dignissim maximus. There are many variations of passages
              of Lorem Ipsum available, but the majority have suffered
              alteration in some form.
            </p>
          </div>

          <div className="flex w-full flex-col gap-16 sm:flex-row">
            <div className="flex flex-1 flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-[25px] text-ivory">
                  Simplicity and Functionality
                </h3>
                <p className="font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
                  Lorem ipsum dolor sit amet, adipiscing Aliquam eu sem vitae
                  turpis dignissim maximus.
                </p>
              </div>
              <div className="flex flex-col gap-6">
                {skills.map((skill) => (
                  <div key={skill.label} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between font-body text-[18px] text-body">
                      <span>{skill.label}</span>
                      <span className="text-[14px]">{skill.value}%</span>
                    </div>
                    <div className="h-[5px] w-full rounded-full bg-cream">
                      <div
                        className="h-[5px] rounded-full bg-gold"
                        style={{ width: `${skill.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-[25px] text-ivory">
                  Question And Answer
                </h3>
                <p className="font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
                  Lorem ipsum dolor sit amet, adipiscing Aliquam eu sem vitae
                  turpis dignissim maximus.
                </p>
              </div>
              <div className="flex flex-col gap-5">
                {faqs.map((f, i) => (
                  <div
                    key={f.question}
                    className={`flex flex-col gap-3 rounded-[18px] px-6 py-5 ${
                      i === 0 ? "bg-cream" : "border border-gold bg-surface"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-body text-[18px] font-semibold text-ivory">
                        {f.question}
                      </span>
                      <span
                        className={`flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full ${
                          i === 0 ? "bg-surface" : "bg-cream"
                        } font-body text-[24px] font-light text-ivory`}
                      >
                        +
                      </span>
                    </div>
                    {f.answer && (
                      <p className="font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
                        {f.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TeamStrip heading="Our Team Members" />

      <section className="mx-auto flex max-w-[800px] flex-col items-center gap-10 px-6 py-20 text-center">
        <h2 className="font-heading text-[36px] text-ivory sm:text-[50px]">
          Contact Me
        </h2>
        <ContactForm variant="full" />
      </section>
    </>
  );
}
