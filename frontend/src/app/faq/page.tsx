import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ's | Interno",
};

const set1 = [
  { question: "What is the Hipcouch Interior Design Service?" },
  {
    question: "So, how exactly does this work?",
    answer:
      "Lorem ipsum dolor sit amet, adipiscing Aliquam eu sem vitae turpmaximus.posuere in.Contrary popular belief. There are many variations of passages of Lorem Ipsum available, but the majority randomised.",
  },
  { question: "What cities do you currently operate in?" },
  { question: "Hipcouch Interior Design Service?" },
  { question: "What kind of interior designers do you have?" },
];

const set2 = [
  { question: "How long does it take?" },
  {
    question: "Can I use my existing furnishings?",
    answer:
      "Lorem ipsum dolor sit amet, adipiscing Aliquam eu sem vitae turpmaximus.posuere in.Contrary popular belief. There are many variations of passages of Lorem Ipsum available, but the majority randomised.",
  },
  { question: "What do I put into redesigning my interior?" },
  { question: "What do your services cost?" },
  { question: "Do you offer free consultations?" },
];

export default function FaqPage() {
  return (
    <>
      <PageBanner title="Faq's" breadcrumb="Home / Faq" />

      <FaqAccordion heading="Every Question Answered" items={set1} imageSide="right" />
      <FaqAccordion heading="Project related questions" items={set2} imageSide="left" />
    </>
  );
}
