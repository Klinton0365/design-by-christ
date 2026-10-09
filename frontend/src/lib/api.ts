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

export type ProjectImage = {
  id: number;
  image_url: string;
  is_cover: boolean;
  sort_order: number;
};

export type Project = {
  id: number;
  title: string;
  slug: string;
  category: string;
  client: string | null;
  tags: string[];
  project_date: string | null;
  external_link: string | null;
  description: string;
  cover_image_url: string | null;
  images: ProjectImage[];
  created_at: string;
};

// Public marketing content changes rarely, so pages are revalidated hourly
// (ISR) rather than refetched on every request.
const CONTENT_REVALIDATE_SECONDS = 3600;

export async function getProjects(options: { category?: string; home?: boolean } = {}) {
  const params = new URLSearchParams();
  if (options.category) params.set("category", options.category);
  if (options.home) params.set("home", "1");
  const qs = params.size > 0 ? `?${params.toString()}` : "";

  const { data } = await apiFetch<{ data: Project[] }>(`/api/projects${qs}`, {
    next: { revalidate: CONTENT_REVALIDATE_SECONDS },
  });
  return data;
}

export async function getProject(slug: string) {
  const { data } = await apiFetch<{ data: Project }>(`/api/projects/${encodeURIComponent(slug)}`, {
    next: { revalidate: CONTENT_REVALIDATE_SECONDS },
  });
  return data;
}
