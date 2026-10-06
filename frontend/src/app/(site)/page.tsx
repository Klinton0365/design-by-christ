import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import ClientLogos from "@/components/home/ClientLogos";
import WalkthroughScroll from "@/components/walkthrough/WalkthroughScroll";
import ServicesAbout from "@/components/home/ServicesAbout";
import Projects from "@/components/home/Projects";
import Counter from "@/components/home/Counter";
import BlogPreview from "@/components/home/BlogPreview";
import ContactCta from "@/components/home/ContactCta";

export default function Home() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <WalkthroughScroll />
      <ServicesAbout />
      <Projects />
      <Counter />
      <Testimonials />
      <BlogPreview />
      <ContactCta />
    </>
  );
}
