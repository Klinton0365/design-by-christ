"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminApiFetch, AdminApiError } from "@/lib/admin-api";

export type BlogPostFormState = { error: string | null };

function buildPayload(formData: FormData) {
  const payload = new FormData();
  payload.set("title", String(formData.get("title") ?? ""));
  payload.set("slug", String(formData.get("slug") ?? ""));
  payload.set("excerpt", String(formData.get("excerpt") ?? ""));
  payload.set("body", String(formData.get("body") ?? ""));
  payload.set("author_name", String(formData.get("author_name") ?? "Chris"));
  payload.set("pull_quote", String(formData.get("pull_quote") ?? ""));
  payload.set("pull_quote_attribution", String(formData.get("pull_quote_attribution") ?? ""));
  payload.set("published_at", String(formData.get("published_at") ?? ""));
  payload.set("is_published", formData.get("is_published") === "1" ? "1" : "0");
  payload.set("show_on_home", formData.get("show_on_home") === "1" ? "1" : "0");

  const tagsRaw = String(formData.get("tags") ?? "");
  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  tags.forEach((tag) => payload.append("tags[]", tag));

  const coverImage = formData.get("cover_image");
  if (coverImage instanceof File && coverImage.size > 0) {
    payload.set("cover_image", coverImage);
  }

  return payload;
}

export async function createBlogPostAction(
  _prevState: BlogPostFormState,
  formData: FormData
): Promise<BlogPostFormState> {
  try {
    await adminApiFetch("/api/admin/blog-posts", {
      method: "POST",
      body: buildPayload(formData),
    });
  } catch (err) {
    return {
      error: err instanceof AdminApiError ? err.message : "Could not create the post.",
    };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/blog");
}

export async function updateBlogPostAction(
  slug: string,
  _prevState: BlogPostFormState,
  formData: FormData
): Promise<BlogPostFormState> {
  const payload = buildPayload(formData);
  payload.set("_method", "PUT");

  try {
    await adminApiFetch(`/api/admin/blog-posts/${slug}`, {
      method: "POST",
      body: payload,
    });
  } catch (err) {
    return {
      error: err instanceof AdminApiError ? err.message : "Could not update the post.",
    };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  redirect("/admin/blog");
}

export async function deleteBlogPostAction(slug: string) {
  await adminApiFetch(`/api/admin/blog-posts/${slug}`, { method: "DELETE" });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
}

export async function toggleShowOnHomeAction(slug: string, nextValue: boolean) {
  await adminApiFetch(`/api/admin/blog-posts/${slug}/home`, {
    method: "PATCH",
    body: JSON.stringify({ show_on_home: nextValue }),
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
}
