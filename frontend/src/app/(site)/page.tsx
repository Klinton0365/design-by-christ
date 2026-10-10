import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import ClientLogos from "@/components/home/ClientLogos";
import WalkthroughScroll from "@/components/walkthrough/WalkthroughScroll";
import ServiceCard from "@/components/services/ServiceCard";
import { getServices } from "@/lib/api";
import AboutUs from "@/components/home/AboutUs";
import Projects from "@/components/home/Projects";
import Counter from "@/components/home/Counter";
import BlogPreview from "@/components/home/BlogPreview";
import ContactCta from "@/components/home/ContactCta";

export default async function Home() {
  const services = await getServices();

  return (
    <>
      <Hero />
      <ClientLogos />
      <AboutUs />

      <section className="py-20">
        <ServiceCard services={services} />
      </section>

      <WalkthroughScroll />
      <Projects />
      <Counter />
      <Testimonials />
      <BlogPreview />
      <ContactCta />
    </>
  );
}
