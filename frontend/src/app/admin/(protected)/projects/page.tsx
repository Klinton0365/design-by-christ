import Link from "next/link";
import { adminApiFetch } from "@/lib/admin-api";
import DeleteButton from "@/components/admin/DeleteButton";
import ToggleHomeButton from "@/components/admin/ToggleHomeButton";
import { deleteProjectAction, toggleShowOnHomeAction } from "./actions";

type Project = {
  id: number;
  title: string;
  slug: string;
  category: string;
  is_published: boolean;
  show_on_home: boolean;
  sort_order: number;
  images: { id: number; image_url: string; is_cover: boolean }[];
};

export default async function AdminProjectsPage() {
  const { data: projects } = await adminApiFetch<{ data: Project[] }>("/api/admin/projects");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-[32px] text-ivory">Projects</h1>
          <p className="font-body text-[16px] text-body">
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center rounded-[18px] bg-gold px-6 py-3 font-body text-[15px] font-semibold text-white glow-gold transition-opacity hover:opacity-90"
        >
          New Project
        </Link>
      </div>

      <div className="overflow-x-auto rounded-[20px] border border-border bg-surface">
        <table className="w-full min-w-[700px] text-left">
          <thead>
            <tr className="border-b border-border font-body text-[14px] uppercase tracking-wide text-body">
              <th className="px-5 py-4">Cover</th>
              <th className="px-5 py-4">Title</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Published</th>
              <th className="px-5 py-4">Homepage</th>
              <th className="px-5 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const cover = project.images.find((i) => i.is_cover) ?? project.images[0];
              const boundDelete = deleteProjectAction.bind(null, project.slug);
              return (
                <tr key={project.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-4">
                    {cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={cover.image_url}
                        alt=""
                        className="h-[48px] w-[64px] rounded-lg object-cover"
                      />
                    ) : (
                      <span className="flex h-[48px] w-[64px] items-center justify-center rounded-lg bg-base font-body text-[12px] text-body">
                        None
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 font-body text-[16px] text-ivory">
                    {project.title}
                  </td>
                  <td className="px-5 py-4 font-body text-[15px] text-body">
                    {project.category}
                  </td>
                  <td className="px-5 py-4 font-body text-[15px] text-body">
                    {project.is_published ? "Yes" : "No"}
                  </td>
                  <td className="px-5 py-4">
                    <ToggleHomeButton
                      slug={project.slug}
                      showOnHome={project.show_on_home}
                      action={toggleShowOnHomeAction}
                    />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/admin/projects/${project.slug}/edit`}
                        className="font-body text-[14px] text-gold hover:underline"
                      >
                        Edit
                      </Link>
                      <DeleteButton action={boundDelete} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
