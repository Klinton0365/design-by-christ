import { adminApiFetch } from "@/lib/admin-api";

type ProjectCategoryRow = { category: string };

/**
 * There's no separate categories table — the dropdown on the project form
 * is populated from whatever category values already exist across projects,
 * so a brand-new category typed there becomes selectable for future
 * projects automatically.
 */
export async function getProjectCategories(): Promise<string[]> {
  const { data } = await adminApiFetch<{ data: ProjectCategoryRow[] }>("/api/admin/projects");
  return Array.from(new Set(data.map((p) => p.category))).sort();
}
