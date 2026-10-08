import Link from "next/link";
import { adminApiFetch } from "@/lib/admin-api";
import EditProjectForm from "./EditProjectForm";
import ImageGallery from "./ImageGallery";
import {
  deleteProjectImageAction,
  setCoverImageAction,
  uploadProjectImagesAction,
} from "../../actions";
import { getProjectCategories } from "../../categories";

type Project = {
  title: string;
  slug: string;
  category: string;
  client: string | null;
  tags: string[];
  project_date: string | null;
  external_link: string | null;
  description: string;
  is_published: boolean;
  sort_order: number;
  images: { id: number; image_url: string; is_cover: boolean }[];
};

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [{ data: project }, categories] = await Promise.all([
    adminApiFetch<{ data: Project }>(`/api/admin/projects/${slug}`),
    getProjectCategories(),
  ]);

  const uploadAction = uploadProjectImagesAction.bind(null, slug);
  const setCoverAction = setCoverImageAction.bind(null, slug);
  const deleteAction = deleteProjectImageAction.bind(null, slug);

  return (
    <div className="flex max-w-[640px] flex-col gap-10">
      <div>
        <h1 className="font-heading text-[32px] text-ivory">Edit Project</h1>
        <Link href="/admin/projects" className="font-body text-[14px] text-body hover:text-gold">
          ← Back to Projects
        </Link>
      </div>

      <EditProjectForm project={project} categories={categories} />

      <hr className="border-border" />

      <ImageGallery
        images={project.images}
        uploadAction={uploadAction}
        setCoverAction={setCoverAction}
        deleteAction={deleteAction}
      />
    </div>
  );
}
