"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminApiFetch, AdminApiError } from "@/lib/admin-api";

export type ServiceFormState = { error: string | null };

function buildPayload(formData: FormData) {
  const payload = new FormData();
  payload.set("title", String(formData.get("title") ?? ""));
  payload.set("slug", String(formData.get("slug") ?? ""));
  payload.set("summary", String(formData.get("summary") ?? ""));
  payload.set("description", String(formData.get("description") ?? ""));
  payload.set("sort_order", String(formData.get("sort_order") ?? "0"));
  payload.set("is_highlighted", formData.get("is_highlighted") === "1" ? "1" : "0");
  payload.set("is_published", formData.get("is_published") === "1" ? "1" : "0");

  const image = formData.get("image");
  if (image instanceof File && image.size > 0) {
    payload.set("image", image);
  }

  return payload;
}

export async function createServiceAction(
  _prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  try {
    await adminApiFetch("/api/admin/services", {
      method: "POST",
      body: buildPayload(formData),
    });
  } catch (err) {
    return {
      error: err instanceof AdminApiError ? err.message : "Could not create the service.",
    };
  }

  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function updateServiceAction(
  slug: string,
  _prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  const payload = buildPayload(formData);
  payload.set("_method", "PUT");

  try {
    await adminApiFetch(`/api/admin/services/${slug}`, {
      method: "POST",
      body: payload,
    });
  } catch (err) {
    return {
      error: err instanceof AdminApiError ? err.message : "Could not update the service.",
    };
  }

  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function deleteServiceAction(slug: string) {
  await adminApiFetch(`/api/admin/services/${slug}`, { method: "DELETE" });
  revalidatePath("/admin/services");
}
