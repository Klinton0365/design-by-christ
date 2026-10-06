import { adminApiFetch } from "@/lib/admin-api";

type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  project_type: string | null;
  subject: string | null;
  message: string | null;
  source: string;
  status: string;
  page_path: string | null;
  created_at: string;
};

type LeadsResponse = { data: Lead[] };

const SOURCE_LABELS: Record<string, string> = {
  contact_simple: "Contact page",
  contact_full: "Contact page",
  enquiry_modal: "Walkthrough enquiry",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function AdminLeadsPage() {
  const { data: leads } = await adminApiFetch<LeadsResponse>("/api/admin/leads");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-[32px] text-ivory">Leads</h1>
        <p className="font-body text-[16px] text-body">
          {leads.length} {leads.length === 1 ? "lead" : "leads"} captured so
          far.
        </p>
      </div>

      {leads.length === 0 ? (
        <p className="font-body text-[16px] text-body">
          No leads yet — once someone submits the contact form or the
          walkthrough enquiry, they&apos;ll show up here.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-[20px] border border-border bg-surface">
          <table className="w-full min-w-[800px] text-left">
            <thead>
              <tr className="border-b border-border font-body text-[14px] uppercase tracking-wide text-body">
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Source</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Received</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-4 font-body text-[16px] text-ivory">
                    {lead.name}
                  </td>
                  <td className="px-5 py-4 font-body text-[15px] text-body">
                    <div className="flex flex-col">
                      <span>{lead.email}</span>
                      {lead.phone && <span>{lead.phone}</span>}
                    </div>
                  </td>
                  <td className="px-5 py-4 font-body text-[15px] text-body">
                    {lead.project_type ?? lead.subject ?? "—"}
                  </td>
                  <td className="px-5 py-4 font-body text-[15px] text-body">
                    {SOURCE_LABELS[lead.source] ?? lead.source}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-base px-3 py-1 font-body text-[13px] uppercase tracking-wide text-gold">
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-body text-[15px] text-body">
                    {formatDate(lead.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
