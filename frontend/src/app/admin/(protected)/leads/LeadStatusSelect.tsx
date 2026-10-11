"use client";

import { useTransition } from "react";
import { updateLeadStatusAction } from "./actions";

const STATUSES = [
  { value: "new", label: "New" },
  { value: "follow-up", label: "Follow-up" },
  { value: "closed", label: "Closed" },
];

export default function LeadStatusSelect({
  leadId,
  status,
}: {
  leadId: number;
  status: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={isPending}
      onChange={(e) => startTransition(() => updateLeadStatusAction(leadId, e.target.value))}
      className="rounded-full border border-border bg-base px-3 py-1 font-body text-[13px] uppercase tracking-wide text-gold focus:outline-none focus:ring-2 focus:ring-gold disabled:opacity-60"
    >
      {STATUSES.map((s) => (
        <option key={s.value} value={s.value} className="bg-surface text-body normal-case">
          {s.label}
        </option>
      ))}
    </select>
  );
}
