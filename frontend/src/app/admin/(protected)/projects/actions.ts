"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminApiFetch, AdminApiError } from "@/lib/admin-api";

export type ProjectFormState = { error: string | null };

function buildPayload(formData: FormData) {
  const payload = new FormData();
  payload.set("title", String(formData.get("title") ?? ""));
  payload.set("slug", String(formData.get("slug") ?? ""));
  payload.set("category", String(formData.get("category") ?? ""));
  payload.set("client", String(formData.get("client") ?? ""));
  payload.set("project_date", String(formData.get("project_date") ?? ""));
  payload.set("external_link", String(formData.get("external_link") ?? ""));
  payload.set("description", String(formData.get("description") ?? ""));
  payload.set("sort_order", String(formData.get("sort_order") ?? "0"));
  payload.set("is_published", formData.get("is_published") === "1" ? "1" : "0");

  const tagsRaw = String(formData.get("tags") ?? "");
  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  tags.forEach((tag) => payload.append("tags[]", tag));

  return payload;
}

export async function createProjectAction(
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  let slug: string;

  try {
    const result = await adminApiFetch<{ data: { slug: string } }>("/api/admin/projects", {
      method: "POST",
      body: buildPayload(formData),
    });
    slug = result.data.slug;
  } catch (err) {
    return {
      error: err instanceof AdminApiError ? err.message : "Could not create the project.",
    };
  }

  revalidatePath("/admin/projects");
  redirect(`/admin/projects/${slug}/edit`);
}

export async function updateProjectAction(
  slug: string,
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const payload = buildPayload(formData);
  payload.set("_method", "PUT");

  try {
    await adminApiFetch(`/api/admin/projects/${slug}`, {
      method: "POST",
      body: payload,
    });
  } catch (err) {
    return {
      error: err instanceof AdminApiError ? err.message : "Could not update the project.",
    };
  }

  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${slug}/edit`);
  return { error: null };
}

export async function deleteProjectAction(slug: string) {
  await adminApiFetch(`/api/admin/projects/${slug}`, { method: "DELETE" });
  revalidatePath("/admin/projects");
}

export async function uploadProjectImagesAction(
  slug: string,
  formData: FormData
): Promise<{ error: string | null }> {
  const payload = new FormData();
  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  files.forEach((file) => payload.append("images[]", file));

  try {
    await adminApiFetch(`/api/admin/projects/${slug}/images`, {
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

  revalidatePath(`/admin/projects/${slug}/edit`);
  return { error: null };
}

export async function setCoverImageAction(slug: string, imageId: number) {
  const payload = new FormData();
  payload.set("_method", "PATCH");
  payload.set("is_cover", "1");

  await adminApiFetch(`/api/admin/projects/${slug}/images/${imageId}`, {
    method: "POST",
    body: payload,
  });

  revalidatePath(`/admin/projects/${slug}/edit`);
}

export async function deleteProjectImageAction(slug: string, imageId: number) {
  await adminApiFetch(`/api/admin/projects/${slug}/images/${imageId}`, { method: "DELETE" });
  revalidatePath(`/admin/projects/${slug}/edit`);
}
