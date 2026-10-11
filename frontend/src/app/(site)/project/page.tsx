import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import ProjectBrowser from "@/components/project/ProjectBrowser";
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

        <ProjectBrowser
          initialProjects={projects}
          categories={categories}
          initialCategory={category ?? null}
          initialPage={currentPage}
          initialTotalPages={totalPages}
        />
      </section>
    </>
  );
}
