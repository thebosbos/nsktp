"use client";

import { useTransition } from "react";
import { updateLeadStatus } from "@/lib/actions/leads";
import type { LeadStatus } from "@/lib/types";

const statuses: LeadStatus[] = ["new", "contacted", "closed"];
const statusLabels: Record<LeadStatus, string> = {
  new: "Nouvelle",
  contacted: "Contactée",
  closed: "Clôturée",
};

export default function LeadStatusForm({ id, status }: { id: string; status: LeadStatus }) {
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => startTransition(() => updateLeadStatus(formData))}
      style={{ display: "inline" }}
    >
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        disabled={pending}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className={`admin-badge admin-badge-${status}`}
        style={{ border: "none", cursor: "pointer" }}
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {statusLabels[s]}
          </option>
        ))}
      </select>
    </form>
  );
}
