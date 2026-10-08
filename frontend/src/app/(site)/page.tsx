import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import ClientLogos from "@/components/home/ClientLogos";
import WalkthroughScroll from "@/components/walkthrough/WalkthroughScroll";
import Services from "@/components/home/Services";
import AboutUs from "@/components/home/AboutUs";
import Projects from "@/components/home/Projects";
import Counter from "@/components/home/Counter";
import BlogPreview from "@/components/home/BlogPreview";
import ContactCta from "@/components/home/ContactCta";

export default function Home() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <AboutUs />
      <Services />
      {/* <hr className="mx-6 my-0 border-t border-divider sm:mx-auto sm:max-w-[1200px]" /> */}
      <WalkthroughScroll />
      <Projects />
      <Counter />
      <Testimonials />
      <BlogPreview />
      <ContactCta />
    </>
  );
}
