import Link from "next/link";
import { adminApiFetch } from "@/lib/admin-api";
import EditServiceForm from "./EditServiceForm";

type Service = {
  title: string;
  slug: string;
  summary: string;
  description: string;
  image_url: string | null;
  detail_image_url: string | null;
  is_published: boolean;
  sort_order: number;
};

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: service } = await adminApiFetch<{ data: Service }>(`/api/admin/services/${slug}`);

  return (
    <div className="flex max-w-[640px] flex-col gap-6">
      <div>
        <h1 className="font-heading text-[32px] text-ivory">Edit Service</h1>
        <Link href="/admin/services" className="font-body text-[14px] text-body hover:text-gold">
          ← Back to Services
        </Link>
      </div>

      <EditServiceForm service={service} />
    </div>
  );
}
