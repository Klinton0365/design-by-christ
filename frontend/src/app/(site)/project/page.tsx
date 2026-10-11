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
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const { category, page } = await searchParams;
  const currentPage = Number(page) > 0 ? Number(page) : 1;
  const { projects, categories, totalPages } = await getProjects({
    category,
    page: currentPage,
  });

  return (
    <>
      <PageBanner
        title="Our Project"
        breadcrumb="Home / Project"
        image="/img/hero/Golden Hour Double-Height Luxury Living Room.png"
      />

      <section className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="mx-auto mb-16 flex max-w-[700px] flex-col items-center gap-3 text-center">
          <AnimatedText as="h2" className="font-heading text-[36px] text-ivory sm:text-[50px]">
            A Portfolio Built on Craft
          </AnimatedText>
          <AnimatedText as="p" className="font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
            Every space tells a different story. Browse the work below, or filter by category
            to see what we&apos;ve designed for homes, offices, and everything in between.
          </AnimatedText>
        </div>

        <CategoryTabs categories={categories} active={category ?? null} />

        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2">
          {projects.map((project, i) => (
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

        {projects.length === 0 && (
          <p className="mt-16 text-center font-body text-[18px] text-body">
            No projects in this category yet.
          </p>
        )}

        <Pagination
          basePath="/project"
          currentPage={currentPage}
          pages={totalPages}
          query={category ? { category } : undefined}
        />
      </section>
    </>
  );
}
