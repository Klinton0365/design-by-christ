import Link from "next/link";
import { adminApiFetch } from "@/lib/admin-api";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteFaqAction } from "./actions";

type Faq = {
  id: number;
  question: string;
  is_published: boolean;
  sort_order: number;
};

export default async function AdminFaqsPage() {
  const { data: faqs } = await adminApiFetch<{ data: Faq[] }>("/api/admin/faqs");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-[32px] text-ivory">FAQs</h1>
          <p className="font-body text-[16px] text-body">
            {faqs.length} {faqs.length === 1 ? "question" : "questions"}
          </p>
        </div>
        <Link
          href="/admin/faqs/new"
          className="inline-flex items-center rounded-[18px] bg-gold px-6 py-3 font-body text-[15px] font-semibold text-white glow-gold transition-opacity hover:opacity-90"
        >
          New FAQ
        </Link>
      </div>

      <div className="overflow-x-auto rounded-[20px] border border-border bg-surface">
        <table className="w-full min-w-[700px] text-left">
          <thead>
            <tr className="border-b border-border font-body text-[14px] uppercase tracking-wide text-body">
              <th className="px-5 py-4">Question</th>
              <th className="px-5 py-4">Published</th>
              <th className="px-5 py-4">Order</th>
              <th className="px-5 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => {
              const boundDelete = deleteFaqAction.bind(null, faq.id);
              return (
                <tr key={faq.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-4 font-body text-[16px] text-ivory">
                    {faq.question}
                  </td>
                  <td className="px-5 py-4 font-body text-[15px] text-body">
                    {faq.is_published ? "Yes" : "No"}
                  </td>
                  <td className="px-5 py-4 font-body text-[15px] text-body">
                    {faq.sort_order}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/admin/faqs/${faq.id}/edit`}
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
