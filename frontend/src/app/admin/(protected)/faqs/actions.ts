"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminApiFetch, AdminApiError } from "@/lib/admin-api";

export type FaqFormState = { error: string | null };

function buildPayload(formData: FormData) {
  return {
    question: String(formData.get("question") ?? ""),
    answer: String(formData.get("answer") ?? ""),
    sort_order: Number(formData.get("sort_order") ?? 0),
    is_published: formData.get("is_published") === "1",
  };
}

export async function createFaqAction(
  _prevState: FaqFormState,
  formData: FormData
): Promise<FaqFormState> {
  try {
    await adminApiFetch("/api/admin/faqs", {
      method: "POST",
      body: JSON.stringify(buildPayload(formData)),
    });
  } catch (err) {
    return {
      error: err instanceof AdminApiError ? err.message : "Could not create the FAQ.",
    };
  }

  revalidatePath("/admin/faqs");
  revalidatePath("/contact");
  redirect("/admin/faqs");
}

export async function updateFaqAction(
  id: number,
  _prevState: FaqFormState,
  formData: FormData
): Promise<FaqFormState> {
  try {
    await adminApiFetch(`/api/admin/faqs/${id}`, {
      method: "PUT",
      body: JSON.stringify(buildPayload(formData)),
    });
  } catch (err) {
    return {
      error: err instanceof AdminApiError ? err.message : "Could not update the FAQ.",
    };
  }

  revalidatePath("/admin/faqs");
  revalidatePath("/contact");
  redirect("/admin/faqs");
}

export async function deleteFaqAction(id: number) {
  await adminApiFetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
  revalidatePath("/admin/faqs");
  revalidatePath("/contact");
}
