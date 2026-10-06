export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-heading text-[32px] text-ivory">Dashboard</h1>
      <p className="font-body text-[16px] text-body">
        Visitor analytics and content metrics will appear here once Phase 4 is
        built. For now, head to{" "}
        <a href="/admin/leads" className="text-gold hover:underline">
          Leads
        </a>{" "}
        to see incoming enquiries.
      </p>
    </div>
  );
}
