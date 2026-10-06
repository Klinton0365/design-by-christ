import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const ADMIN_TOKEN_COOKIE = "admin_token";

export class AdminApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
  }
}

export async function getAdminToken() {
  const store = await cookies();
  return store.get(ADMIN_TOKEN_COOKIE)?.value ?? null;
}

export async function adminApiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = await getAdminToken();

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new AdminApiError(body?.message ?? "Request failed.", res.status);
  }

  return body as T;
}

export type AdminUser = { id: number; name: string; email: string };

export async function requireAdmin(): Promise<AdminUser> {
  const token = await getAdminToken();

  if (!token) {
    redirect("/admin/login");
  }

  try {
    return await adminApiFetch<AdminUser>("/api/admin/me");
  } catch {
    redirect("/admin/login");
  }
}

export async function adminLogin(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new AdminApiError(body?.message ?? "Invalid credentials.", res.status);
  }

  return body as { token: string; user: { id: number; name: string; email: string } };
}
