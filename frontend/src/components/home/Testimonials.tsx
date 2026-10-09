import AnimatedText from "@/components/AnimatedText";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const testimonials = [
  {
    name: "Nattasha Mith",
    designation: "Sydney, USA",
    quote:
      "From the cabinetry down to the lighting fixtures, every piece of furnishing was chosen with real intention. Our kitchen finally feels like the heart of the home.",
    src: "/img/testimonial/pexels-alvin-aristo-256416321-12564075.jpg",
  },
  {
    name: "Raymond Galario",
    designation: "Sydney, Australia",
    quote:
      "They reworked our living room with warm wood tones and furniture that actually fits how we live. Guests always ask who designed the space.",
    src: "/img/testimonial/pexels-denniz-futalan-339724-16316172.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16">
      <div className="rounded-[70px] bg-cream px-6 py-16 sm:px-16">
        <AnimatedText
          as="h2"
          className="mx-auto max-w-[550px] text-center font-heading text-[36px] leading-tight text-ivory sm:text-[50px]"
        >
          What People Think About Us
        </AnimatedText>

        <div className="mt-12">
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}
