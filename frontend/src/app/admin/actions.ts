"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_TOKEN_COOKIE, adminApiFetch } from "@/lib/admin-api";

export async function logoutAction() {
  try {
    await adminApiFetch("/api/admin/logout", { method: "POST" });
  } catch {
    // Token may already be invalid/expired — still clear the local cookie below.
  }

  const store = await cookies();
  store.delete(ADMIN_TOKEN_COOKIE);

  redirect("/admin/login");
}
