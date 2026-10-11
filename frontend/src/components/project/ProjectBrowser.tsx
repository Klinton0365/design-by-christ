"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/AnimatedText";
import CategoryTabs from "@/components/project/CategoryTabs";
import Pagination from "@/components/project/Pagination";
import { getProjects, type Project } from "@/lib/api";

export default function ProjectBrowser({
  initialProjects,
  categories,
  initialCategory,
  initialPage,
  initialTotalPages,
}: {
  initialProjects: Project[];
  categories: string[];
  initialCategory: string | null;
  initialPage: number;
  initialTotalPages: number;
}) {
  const [projects, setProjects] = useState(initialProjects);
  const [category, setCategory] = useState(initialCategory);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isPending, startTransition] = useTransition();

  function load(nextCategory: string | null, nextPage: number) {
    startTransition(async () => {
      const result = await getProjects({
        category: nextCategory ?? undefined,
        page: nextPage,
      });
      setProjects(result.projects);
      setTotalPages(result.totalPages);
      setCategory(nextCategory);
      setPage(nextPage);

      const params = new URLSearchParams();
      if (nextCategory) params.set("category", nextCategory);
      if (nextPage > 1) params.set("page", String(nextPage));
      const qs = params.toString();
      window.history.replaceState(null, "", qs ? `/project?${qs}` : "/project");
    });
  }

  return (
    <>
      <CategoryTabs categories={categories} active={category} onSelect={(cat) => load(cat, 1)} />

      <div
        className={`mt-16 grid grid-cols-1 gap-x-6 gap-y-14 transition-opacity duration-300 sm:grid-cols-2 ${
          isPending ? "opacity-50" : "opacity-100"
        }`}
      >
        {projects.map((project, i) => (
          <Link key={project.id} href={`/project/${project.slug}`} className="flex flex-col gap-6">
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
                <AnimatedText as="h3" delay={i * 0.1} className="font-heading text-[25px] text-ivory">
                  {project.title}
                </AnimatedText>
                <AnimatedText as="p" delay={i * 0.1} className="font-body text-[22px] text-body">
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

      <Pagination currentPage={page} pages={totalPages} onPageChange={(p) => load(category, p)} />
    </>
  );
}
