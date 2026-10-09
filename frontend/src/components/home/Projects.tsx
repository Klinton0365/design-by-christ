import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/AnimatedText";
import { getProjects } from "@/lib/api";

export default async function Projects() {
  const projects = await getProjects({ home: true });

  if (projects.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16">
      <div className="flex flex-col items-center gap-3 text-center">
        <AnimatedText as="h2" className="font-heading text-[36px] text-ivory sm:text-[50px]">
          Follow Our Projects
        </AnimatedText>
        <AnimatedText
          as="p"
          className="max-w-[700px] font-body text-[18px] leading-relaxed text-body sm:text-[22px]"
        >
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </AnimatedText>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Link key={project.id} href={`/project/${project.slug}`} className="flex flex-col gap-6">
            <div className="relative h-[350px] w-full overflow-hidden rounded-[40px] bg-placeholder">
              {project.cover_image_url && (
                <Image
                  src={project.cover_image_url}
                  alt={project.title}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <AnimatedText as="h3" delay={i * 0.1} className="font-heading text-[25px] text-ivory">
                  {project.title}
                </AnimatedText>
                <AnimatedText as="p" delay={i * 0.1} className="font-body text-[18px] text-body">
                  {project.category}
                </AnimatedText>
              </div>
              <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full bg-cream">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="#CA9A3E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
