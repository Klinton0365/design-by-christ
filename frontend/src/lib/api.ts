const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...init?.headers,
    },
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(
      body?.message ?? "Something went wrong. Please try again.",
      res.status,
      body?.errors
    );
  }

  return body as T;
}

export type LeadSource = "contact_simple" | "contact_full" | "enquiry_modal";

export type CreateLeadPayload = {
  name: string;
  email: string;
  phone?: string;
  project_type?: string;
  subject?: string;
  message?: string;
  source: LeadSource;
  page_path?: string;
};

export type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  project_type: string | null;
  subject: string | null;
  message: string | null;
  source: LeadSource;
  status: string;
  page_path: string | null;
  created_at: string;
};

export function createLead(payload: CreateLeadPayload) {
  return apiFetch<{ data: Lead }>("/api/leads", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
