import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import ClientLogos from "@/components/home/ClientLogos";
import Projects from "@/components/home/Projects";
import Counter from "@/components/home/Counter";
import BlogPreview from "@/components/home/BlogPreview";
import ContactCta from "@/components/home/ContactCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Testimonials />
      <ClientLogos />
      <Projects />
      <Counter />
      <BlogPreview />
      <ContactCta />
    </>
  );
}
