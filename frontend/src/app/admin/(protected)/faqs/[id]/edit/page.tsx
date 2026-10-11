import Link from "next/link";
import { adminApiFetch } from "@/lib/admin-api";
import EditFaqForm from "./EditFaqForm";

type Faq = {
  id: number;
  question: string;
  answer: string | null;
  is_published: boolean;
  sort_order: number;
};

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: faq } = await adminApiFetch<{ data: Faq }>(`/api/admin/faqs/${id}`);

  return (
    <div className="flex max-w-[640px] flex-col gap-6">
      <div>
        <h1 className="font-heading text-[32px] text-ivory">Edit FAQ</h1>
        <Link href="/admin/faqs" className="font-body text-[14px] text-body hover:text-gold">
          ← Back to FAQs
        </Link>
      </div>

      <EditFaqForm faq={faq} />
    </div>
  );
}
