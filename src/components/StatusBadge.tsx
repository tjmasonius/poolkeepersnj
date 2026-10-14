import type { TicketStatus } from "@/lib/types";


const STYLES: Record<TicketStatus, string> = {
  requested: "bg-slate-100 text-slate-700 border-slate-200",
  contacted: "bg-sky-50 text-sky-800 border-sky-200",
  scheduled: "bg-amber-50 text-amber-700 border-amber-200",
  in_progress: "bg-pool-50 text-pool-700 border-pool-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};


const OFFICE_LABELS: Record<TicketStatus, string> = {
  requested: "Requested",
  contacted: "Contacted",
  scheduled: "Scheduled",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};


const PUBLIC_LABELS: Record<TicketStatus, string> = {
  requested: "Requested",
  contacted: "We've been in touch",
  scheduled: "Scheduled",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};


export function StatusBadge({
  status,
  audience = "public",
}: {
  status: TicketStatus;
  audience?: "public" | "office";
}) {
  const labels = audience === "office" ? OFFICE_LABELS : PUBLIC_LABELS;
  const style = STYLES[status] ?? STYLES.requested;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${style}`}
    >
      {labels[status] ?? status}
    </span>
  );
}
