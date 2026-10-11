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
  let slug: string;

  try {
    const result = await adminApiFetch<{ data: { slug: string } }>("/api/admin/services", {
      method: "POST",
      body: buildPayload(formData),
    });
    slug = result.data.slug;
  } catch (err) {
    return {
      error: err instanceof AdminApiError ? err.message : "Could not create the service.",
    };
  }

  revalidatePath("/admin/services");
  revalidatePath("/");
  revalidatePath("/services");
  redirect(`/admin/services/${slug}/edit`);
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
  revalidatePath(`/admin/services/${slug}/edit`);
  revalidatePath("/");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function deleteServiceAction(slug: string) {
  await adminApiFetch(`/api/admin/services/${slug}`, { method: "DELETE" });
  revalidatePath("/admin/services");
  revalidatePath("/");
  revalidatePath("/services");
}

export async function uploadServiceImagesAction(
  slug: string,
  formData: FormData
): Promise<{ error: string | null }> {
  const payload = new FormData();
  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  files.forEach((file) => payload.append("images[]", file));

  try {
    await adminApiFetch(`/api/admin/services/${slug}/images`, {
      method: "POST",
      body: payload,
    });
  } catch (err) {
    return {
      error:
        err instanceof AdminApiError
          ? err.message
          : "Could not upload the image(s). Try smaller images or fewer at once.",
    };
  }

  revalidatePath(`/admin/services/${slug}/edit`);
  revalidatePath("/");
  revalidatePath("/services");
  return { error: null };
}

export async function deleteServiceImageAction(slug: string, imageId: number) {
  await adminApiFetch(`/api/admin/services/${slug}/images/${imageId}`, { method: "DELETE" });
  revalidatePath(`/admin/services/${slug}/edit`);
  revalidatePath("/");
  revalidatePath("/services");
}
