import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import ClientLogos from "@/components/home/ClientLogos";
import WalkthroughScroll from "@/components/walkthrough/WalkthroughScroll";
import ServiceCard from "@/components/services/ServiceCard";
import { services, servicesBody } from "@/components/services/data";
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

      <section className="mx-auto max-w-[1160px] px-6 py-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={i} title={s.title} body={servicesBody} highlighted={s.highlighted} />
          ))}
        </div>
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
