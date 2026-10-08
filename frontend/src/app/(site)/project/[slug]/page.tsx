import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import AnimatedText from "@/components/AnimatedText";
import { ApiError, getProject } from "@/lib/api";

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

async function fetchProject(slug: string) {
  try {
    return await getProject(slug);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      notFound();
    }
    throw err;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProject(slug);
  return { title: `${project.title} | Design By Chris` };
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await fetchProject(slug);

  const info = [
    { label: "Client", value: project.client ?? "—" },
    { label: "Category", value: project.category },
    { label: "Tags", value: project.tags.length > 0 ? project.tags.join(", ") : "—" },
    { label: "Date", value: formatDate(project.project_date) },
    { label: "Link", value: project.external_link ?? "—" },
  ];

  return (
    <>
      <PageBanner title={project.title} breadcrumb={`Home / Project / ${project.title}`} />

      <section className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="flex flex-col gap-10 sm:flex-row sm:gap-10">
          <div className="flex w-full max-w-[500px] flex-col gap-6 rounded-[70px] bg-cream px-10 py-14">
            {info.map((row) => (
              <div key={row.label} className="flex justify-between gap-6">
                <span className="font-heading text-[20px] text-body sm:text-[22px]">
                  {row.label}
                </span>
                <span className="font-body text-[20px] text-body sm:text-[22px]">
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <AnimatedText as="h2" className="font-heading text-[36px] text-ivory sm:text-[50px]">
              {project.title}
            </AnimatedText>
            <AnimatedText as="p" className="font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
              {project.description}
            </AnimatedText>
          </div>
        </div>

        <div className="relative mt-14 flex h-[420px] items-center justify-center overflow-hidden rounded-[70px] bg-placeholder sm:h-[799px]">
          {project.cover_image_url && (
            <Image
              src={project.cover_image_url}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div className="relative flex h-[132px] w-[132px] items-center justify-center rounded-full bg-surface glow-gold-sm">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
              <circle cx="10" cy="10" r="7" stroke="#CA9A3E" strokeWidth="2" />
              <path d="M15 15l6 6" stroke="#CA9A3E" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {project.images.length > 1 && (
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {project.images
              .filter((image) => image.image_url !== project.cover_image_url)
              .map((image) => (
                <div key={image.id} className="relative h-[180px] overflow-hidden rounded-[30px]">
                  <Image
                    src={image.image_url}
                    alt={project.title}
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </div>
              ))}
          </div>
        )}
      </section>
    </>
  );
}
