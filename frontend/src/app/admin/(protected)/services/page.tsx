import Link from "next/link";
import { adminApiFetch } from "@/lib/admin-api";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteServiceAction } from "./actions";

type Service = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  is_highlighted: boolean;
  is_published: boolean;
  sort_order: number;
};

export default async function AdminServicesPage() {
  const { data: services } = await adminApiFetch<{ data: Service[] }>("/api/admin/services");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-[32px] text-ivory">Services</h1>
          <p className="font-body text-[16px] text-body">
            {services.length} {services.length === 1 ? "service" : "services"}
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center rounded-[18px] bg-gold px-6 py-3 font-body text-[15px] font-semibold text-white glow-gold transition-opacity hover:opacity-90"
        >
          New Service
        </Link>
      </div>

      <div className="overflow-x-auto rounded-[20px] border border-border bg-surface">
        <table className="w-full min-w-[700px] text-left">
          <thead>
            <tr className="border-b border-border font-body text-[14px] uppercase tracking-wide text-body">
              <th className="px-5 py-4">Title</th>
              <th className="px-5 py-4">Highlighted</th>
              <th className="px-5 py-4">Published</th>
              <th className="px-5 py-4">Order</th>
              <th className="px-5 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => {
              const boundDelete = deleteServiceAction.bind(null, service.slug);
              return (
                <tr key={service.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-4 font-body text-[16px] text-ivory">
                    {service.title}
                  </td>
                  <td className="px-5 py-4 font-body text-[15px] text-body">
                    {service.is_highlighted ? "Yes" : "—"}
                  </td>
                  <td className="px-5 py-4 font-body text-[15px] text-body">
                    {service.is_published ? "Yes" : "No"}
                  </td>
                  <td className="px-5 py-4 font-body text-[15px] text-body">
                    {service.sort_order}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/admin/services/${service.slug}/edit`}
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
