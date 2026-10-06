import Link from "next/link";
import { requireAdmin } from "@/lib/admin-api";
import { logoutAction } from "../actions";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin" },
  { label: "Leads", href: "/admin/leads" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <div className="flex min-h-screen bg-base">
      <aside className="flex w-[240px] shrink-0 flex-col justify-between border-r border-border bg-surface px-6 py-8">
        <div className="flex flex-col gap-10">
          <div>
            <p className="font-heading text-[22px] text-ivory">Design By Chris</p>
            <p className="font-body text-[14px] text-body">Admin Panel</p>
          </div>

          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 font-body text-[16px] text-body transition-colors hover:bg-base hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <p className="truncate font-body text-[14px] text-body">{admin.email}</p>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full rounded-xl border border-border px-4 py-3 text-left font-body text-[16px] text-body transition-colors hover:border-gold hover:text-gold"
            >
              Log out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 px-10 py-10">{children}</main>
    </div>
  );
}
