import { adminApiFetch } from "@/lib/admin-api";

type Subscriber = {
  id: number;
  email: string;
  created_at: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function AdminNewsletterPage() {
  const { data: subscribers } = await adminApiFetch<{ data: Subscriber[] }>(
    "/api/admin/newsletter-subscribers"
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-[32px] text-ivory">Newsletter</h1>
        <p className="font-body text-[16px] text-body">
          {subscribers.length} {subscribers.length === 1 ? "subscriber" : "subscribers"}
        </p>
      </div>

      {subscribers.length === 0 ? (
        <p className="font-body text-[16px] text-body">
          No subscribers yet — once someone signs up on the contact page,
          they&apos;ll show up here.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-[20px] border border-border bg-surface">
          <table className="w-full min-w-[500px] text-left">
            <thead>
              <tr className="border-b border-border font-body text-[14px] uppercase tracking-wide text-body">
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Subscribed</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-4 font-body text-[16px] text-ivory">
                    {subscriber.email}
                  </td>
                  <td className="px-5 py-4 font-body text-[15px] text-body">
                    {formatDate(subscriber.created_at)}
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
