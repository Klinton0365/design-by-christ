import Link from "next/link";
import { adminApiFetch } from "@/lib/admin-api";
import EditServiceForm from "./EditServiceForm";
import ImageGallery from "./ImageGallery";
import { deleteServiceImageAction, uploadServiceImagesAction } from "../../actions";

type Service = {
  title: string;
  slug: string;
  summary: string;
  description: string;
  image_url: string | null;
  is_published: boolean;
  sort_order: number;
  images: { id: number; image_url: string }[];
};

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: service } = await adminApiFetch<{ data: Service }>(`/api/admin/services/${slug}`);

  const uploadAction = uploadServiceImagesAction.bind(null, slug);
  const deleteAction = deleteServiceImageAction.bind(null, slug);

  return (
    <div className="flex max-w-[640px] flex-col gap-10">
      <div>
        <h1 className="font-heading text-[32px] text-ivory">Edit Service</h1>
        <Link href="/admin/services" className="font-body text-[14px] text-body hover:text-gold">
          ← Back to Services
        </Link>
      </div>

      <EditServiceForm service={service} />

      <hr className="border-border" />

      <ImageGallery images={service.images} uploadAction={uploadAction} deleteAction={deleteAction} />
    </div>
  );
}
