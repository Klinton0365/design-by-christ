import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import CategoryTabs from "@/components/project/CategoryTabs";
import Pagination from "@/components/project/Pagination";
import AnimatedText from "@/components/AnimatedText";
import { getProjects } from "@/lib/api";

export const metadata: Metadata = {
  title: "Our Project | Design By Chris",
};

export default async function ProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const projects = await getProjects();
  const categories = Array.from(new Set(projects.map((p) => p.category))).sort();
  const visibleProjects = category ? projects.filter((p) => p.category === category) : projects;

  return (
    <>
      <PageBanner title="Our Project" breadcrumb="Home / Project" />

      <section className="mx-auto max-w-[1200px] px-6 py-20">
        <CategoryTabs categories={categories} active={category ?? null} />

        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2">
          {visibleProjects.map((project, i) => (
            <Link
              key={project.id}
              href={`/project/${project.slug}`}
              className="flex flex-col gap-6"
            >
              <div className="relative h-[350px] w-full overflow-hidden bg-placeholder sm:h-[522px]">
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
                  <AnimatedText
                    as="h3"
                    delay={i * 0.1}
                    className="font-heading text-[25px] text-ivory"
                  >
                    {project.title}
                  </AnimatedText>
                  <AnimatedText
                    as="p"
                    delay={i * 0.1}
                    className="font-body text-[22px] text-body"
                  >
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

        {visibleProjects.length === 0 && (
          <p className="mt-16 text-center font-body text-[18px] text-body">
            No projects in this category yet.
          </p>
        )}

        <Pagination />
      </section>
    </>
  );
}
