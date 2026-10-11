"use server";

import { revalidatePath } from "next/cache";
import { adminApiFetch } from "@/lib/admin-api";

export async function updateLeadStatusAction(leadId: number, status: string) {
  await adminApiFetch(`/api/admin/leads/${leadId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  revalidatePath("/admin/leads");
}
