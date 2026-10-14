"use client";


import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  LogOut,
  Loader2,
  RefreshCw,
  ClipboardPlus,
  Copy,
  Check,
  ChevronRight,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Wrench,
  FileText,
  KeyRound,
  ExternalLink,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";
import { DateRangeBar } from "@/components/admin/DateRangeBar";
import { Logo } from "@/components/Logo";
import { StatusBadge } from "@/components/StatusBadge";
import {
  formatDayHeading,
  parseDateRange,
  todayNY,
  type DateRangeState,
} from "@/lib/date-range";
import type { Lead, LeadStatus, TicketOverviewRow, TicketStatus } from "@/lib/types";


type TicketRow = TicketOverviewRow;
type StaffRow = { email: string; full_name: string | null; role: string };


const FIELD_APP = "https://keepers-field.vercel.app";
const LEAD_STATUSES: LeadStatus[] = ["new", "contacted", "quoted", "won", "lost"];
const TICKET_STATUSES: TicketStatus[] = [
  "requested",
  "contacted",
  "scheduled",
  "in_progress",
  "completed",
  "cancelled",
];
const OPEN_STATUSES: TicketStatus[] = [
  "requested",
  "contacted",
  "scheduled",
  "in_progress",
];
type ListFilter = "open" | TicketStatus | "all";


function contactName(first: string | null, last: string | null) {
  if (!first && !last) return null;
  return [first, last].filter(Boolean).join(" ");
}


function ticketName(t: TicketRow) {
  return (
    contactName(t.primary_contact_first_name, t.primary_contact_last_name) ||
    (t.billing_contact_first_name
      ? `${contactName(t.billing_contact_first_name, t.billing_contact_last_name)}${
          t.billing_contact_company ? ` (${t.billing_contact_company})` : ""
        }`
      : null) ||
    "No name on file"
  );
}


function ticketAddress(t: TicketRow) {
  if (t.location_formatted_address?.trim()) return t.location_formatted_address.trim();
  return [t.location_line1, t.location_city, t.location_state, t.location_zip]
    .filter(Boolean)
    .join(", ");
}


function hasStreet(t: TicketRow) {
  return Boolean((t.location_formatted_address || t.location_line1 || "").trim());
}


function formatShortDate(iso: string | null) {
  if (!iso) return null;
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}


export function Dashboard() {
  const supabase = useMemo(() => createClient(), []);
  const searchParams = useSearchParams();
  const dateRange = useMemo(
    () =>
      parseDateRange({
        range: searchParams.get("range") ?? undefined,
        start: searchParams.get("start") ?? undefined,
        end: searchParams.get("end") ?? undefined,
      }),
    [searchParams],
  );
  const [tab, setTab] = useState<"leads" | "tickets">("tickets");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [tickets, setTickets] = useState<TicketRow[]>([]);
  const [staff, setStaff] = useState<StaffRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [convertingId, setConvertingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<TicketRow | null>(null);
  const [listFilter, setListFilter] = useState<ListFilter>("open");


  const ticketedLeadIds = useMemo(
    () => new Set(tickets.map((t) => t.lead_id).filter(Boolean)),
    [tickets]
  );


  const load = useCallback(async () => {
    setLoading(true);
    const [leadsRes, ticketsRes, staffRes] = await Promise.all([
      supabase.from("leads").select("*").order("created_at", { ascending: false }),
      supabase
        .from("ticket_overview")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase.from("admins").select("email, full_name, role").order("email"),
    ]);


    const nextTickets = (ticketsRes.data as TicketRow[]) ?? [];
    setLeads((leadsRes.data as Lead[]) ?? []);
    setTickets(nextTickets);
    setStaff((staffRes.data as StaffRow[]) ?? []);
    setSelectedTicket((prev) =>
      prev ? nextTickets.find((t) => t.id === prev.id) ?? prev : prev
    );
    setLoading(false);
  }, [supabase]);


  useEffect(() => {
    load();
  }, [load]);


  async function updateLeadStatus(id: string, status: LeadStatus) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    await supabase.from("leads").update({ status }).eq("id", id);
  }


  async function updateTicket(id: string, patch: Record<string, unknown>) {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
    setSelectedTicket((prev) =>
      prev && prev.id === id ? { ...prev, ...patch } : prev
    );
    const { error } = await supabase.from("tickets").update(patch).eq("id", id);
    if (error) {
      alert(error.message);
      await load();
    }
  }


  async function convertToTicket(lead: Lead) {
    setConvertingId(lead.id);
    const { error } = await supabase.rpc("convert_lead_to_ticket", {
      p_lead_id: lead.id,
    });
    if (error) {
      console.error(error);
      alert(`Couldn't convert this lead: ${error.message}`);
    }
    await load();
    setConvertingId(null);
    setTab("tickets");
    setListFilter("open");
  }


  function copyAccessInfo(t: TicketRow) {
    const text = `Ticket ${t.ticket_number} / Access code ${t.access_code}`;
    navigator.clipboard?.writeText(text);
    setCopiedId(t.id);
    setTimeout(() => setCopiedId(null), 1500);
  }


  async function signOut() {
    await supabase.auth.signOut();
  }


  const newLeadCount = leads.filter((l) => l.status === "new").length;
  const openTicketCount = tickets.filter((t) => OPEN_STATUSES.includes(t.status)).length;
  const onRouteCount = tickets.filter((t) =>
    ["scheduled", "in_progress"].includes(t.status)
  ).length;


  const visibleTickets = tickets.filter((t) => {
    if (listFilter === "all") return true;
    if (listFilter === "open") return OPEN_STATUSES.includes(t.status);
    return t.status === listFilter;
  });


  return (
    <div className="min-h-screen bg-pool-50/40">
      <header className="border-b border-pool-100 bg-white">
        <div className="container-page flex h-20 items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <button
              onClick={load}
              className="flex items-center gap-2 rounded-full border border-pool-100 px-4 py-2 text-xs font-semibold text-pool-900/70 hover:bg-pool-50"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </button>
            <button
              onClick={signOut}
              className="flex items-center gap-2 rounded-full border border-pool-100 px-4 py-2 text-xs font-semibold text-pool-900/70 hover:bg-pool-50"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </header>


      <div className="container-page py-10">
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <StatCard label="New Leads" value={newLeadCount} />
          <StatCard label="Open service requests" value={openTicketCount} />
          <StatCard label="On the route" value={onRouteCount} />
        </div>


        <div className="mb-6 flex gap-2">
          <TabButton active={tab === "tickets"} onClick={() => setTab("tickets")}>
            Service list ({tickets.length})
          </TabButton>
          <TabButton active={tab === "leads"} onClick={() => setTab("leads")}>
            Leads ({leads.length})
          </TabButton>
        </div>


        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-6 w-6 animate-spin text-pool-400" />
          </div>
        ) : tab === "leads" ? (
          <div className="overflow-x-auto rounded-2xl border border-pool-100 bg-white">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="border-b border-pool-100 text-xs uppercase tracking-wide text-pool-900/50">
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Contact</th>
                  <th className="px-5 py-3">Interested In</th>
                  <th className="px-5 py-3">Message</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Received</th>
                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-pool-50 last:border-0">
                    <td className="px-5 py-4 font-medium text-pool-950">
                      {lead.full_name}
                    </td>
                    <td className="px-5 py-4 text-pool-900/70">
                      <div>{lead.phone}</div>
                      <div className="text-xs text-pool-900/50">{lead.email}</div>
                    </td>
                    <td className="px-5 py-4 text-pool-900/70">
                      {lead.service_interest || "—"}
                    </td>
                    <td className="max-w-xs px-5 py-4 text-pool-900/70">
                      <span className="line-clamp-2">{lead.message}</span>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          updateLeadStatus(lead.id, e.target.value as LeadStatus)
                        }
                        className="rounded-lg border border-pool-100 px-2 py-1.5 text-xs font-semibold capitalize"
                      >
                        {LEAD_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4 text-xs text-pool-900/50">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">
                      {ticketedLeadIds.has(lead.id) ? (
                        <span className="text-xs font-semibold text-emerald-600">
                          Ticket created
                        </span>
                      ) : (
                        <button
                          onClick={() => convertToTicket(lead)}
                          disabled={convertingId === lead.id}
                          className="flex items-center gap-1.5 rounded-full bg-pool-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-pool-600 disabled:opacity-60"
                        >
                          {convertingId === lead.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <ClipboardPlus className="h-3.5 w-3.5" />
                          )}
                          Create Ticket
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center text-pool-900/50">
                      No leads yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <ServiceList
            tickets={visibleTickets}
            dateRange={dateRange}
            filter={listFilter}
            onFilter={setListFilter}
            counts={{
              open: openTicketCount,
              all: tickets.length,
              requested: tickets.filter((t) => t.status === "requested").length,
              contacted: tickets.filter((t) => t.status === "contacted").length,
              scheduled: tickets.filter((t) => t.status === "scheduled").length,
              in_progress: tickets.filter((t) => t.status === "in_progress").length,
              completed: tickets.filter((t) => t.status === "completed").length,
            }}
            onOpen={setSelectedTicket}
          />
        )}
      </div>


      {selectedTicket && (
        <TicketDetailPanel
          ticket={selectedTicket}
          staff={staff}
          copiedId={copiedId}
          onCopyAccess={copyAccessInfo}
          onUpdate={updateTicket}
          onReload={load}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
}


function lastNameKey(t: TicketRow) {
  return (
    t.primary_contact_last_name ||
    t.billing_contact_last_name ||
    ""
  ).toLowerCase();
}


function groupTickets(tickets: TicketRow[], start: string, end: string) {
  const dated: TicketRow[] = [];
  const unscheduled: TicketRow[] = [];
  for (const t of tickets) {
    if (!t.scheduled_date) {
      unscheduled.push(t);
      continue;
    }
    if (t.scheduled_date >= start && t.scheduled_date <= end) dated.push(t);
  }
  const byDay = new Map<string, TicketRow[]>();
  for (const t of dated) {
    const date = t.scheduled_date as string;
    const list = byDay.get(date) || [];
    list.push(t);
    byDay.set(date, list);
  }
  const days = [...byDay.keys()].sort().map((date) => ({
    date,
    tickets: byDay
      .get(date)!
      .slice()
      .sort((a, b) => lastNameKey(a).localeCompare(lastNameKey(b))),
  }));
  unscheduled.sort((a, b) => lastNameKey(a).localeCompare(lastNameKey(b)));
  return { days, unscheduled };
}


function ServiceList({
  tickets,
  dateRange,
  filter,
  onFilter,
  counts,
  onOpen,
}: {
  tickets: TicketRow[];
  dateRange: DateRangeState;
  filter: ListFilter;
  onFilter: (f: ListFilter) => void;
  counts: Record<string, number>;
  onOpen: (t: TicketRow) => void;
}) {
  const chips: { id: ListFilter; label: string }[] = [
    { id: "open", label: `Open (${counts.open})` },
    { id: "requested", label: `Requested (${counts.requested})` },
    { id: "contacted", label: `Contacted (${counts.contacted})` },
    { id: "scheduled", label: `Scheduled (${counts.scheduled})` },
    { id: "in_progress", label: `In progress (${counts.in_progress})` },
    { id: "completed", label: `Completed (${counts.completed})` },
    { id: "all", label: `All (${counts.all})` },
  ];
  const { days, unscheduled } = groupTickets(tickets, dateRange.start, dateRange.end);
  const today = todayNY();
  const total = days.reduce((n, g) => n + g.tickets.length, 0) + unscheduled.length;

  return (
    <div>
      <DateRangeBar pathname="/admin" state={dateRange} />
      <div className="mb-4 flex flex-wrap gap-2">
        {chips.map((c) => (
          <button
            key={c.id}
            onClick={() => onFilter(c.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              filter === c.id
                ? "bg-pool-950 text-white"
                : "bg-white text-pool-900/60 ring-1 ring-pool-100 hover:bg-pool-50"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p className="mb-3 text-sm text-pool-900/60">
        {dateRange.start === dateRange.end
          ? formatDayHeading(dateRange.start)
          : `${formatDayHeading(dateRange.start)} – ${formatDayHeading(dateRange.end)}`}
        {" · "}
        {total} ticket{total === 1 ? "" : "s"}
      </p>
      {days.length === 0 && unscheduled.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-pool-100 bg-white px-5 py-12 text-center text-pool-900/50">
          Nothing in this list — convert a lead, or switch filters.
        </div>
      ) : (
        <div className="space-y-6">
          {days.map((g) => (
            <section key={g.date}>
              <h2 className={`mb-2 text-sm font-semibold ${g.date === today ? "text-pool-700" : "text-pool-950"}`}>
                {formatDayHeading(g.date)}
                {g.date === today ? " · Today" : ""}
                <span className="ml-2 font-normal text-pool-900/50">
                  {g.tickets.length} ticket{g.tickets.length === 1 ? "" : "s"}
                </span>
              </h2>
              <ol className="space-y-2">
                {g.tickets.map((t) => (
                  <li key={t.id}>
                    <TicketListRow ticket={t} onOpen={onOpen} />
                  </li>
                ))}
              </ol>
            </section>
          ))}
          {unscheduled.length > 0 ? (
            <section>
              <h2 className="mb-2 text-sm font-semibold text-pool-950">
                Unscheduled
                <span className="ml-2 font-normal text-pool-900/50">
                  {unscheduled.length} ticket{unscheduled.length === 1 ? "" : "s"}
                </span>
              </h2>
              <ol className="space-y-2">
                {unscheduled.map((t) => (
                  <li key={t.id}>
                    <TicketListRow ticket={t} onOpen={onOpen} />
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
        </div>
      )}
    </div>
  );
}


function TicketListRow({
  ticket: t,
  onOpen,
}: {
  ticket: TicketRow;
  onOpen: (t: TicketRow) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(t)}
      className="flex w-full items-center gap-3 rounded-2xl border border-pool-100 bg-white p-4 text-left shadow-sm hover:bg-pool-50/60"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-bold text-pool-950">
            {t.ticket_number}
          </span>
          <StatusBadge status={t.status} audience="office" />
          {t.scheduled_date ? (
            <span className="text-xs font-semibold text-pool-700">
              {formatShortDate(t.scheduled_date)}
            </span>
          ) : null}
        </div>
        <p className="mt-1 truncate font-medium text-pool-950">{ticketName(t)}</p>
        <p className="truncate text-sm text-pool-900/60">
          {ticketAddress(t) || "No address on file"}
        </p>
        <p className="truncate text-sm text-pool-900/50">
          {t.service_note || t.description || "—"}
        </p>
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-pool-900/30" />
    </button>
  );
}


function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-pool-100 bg-white px-6 py-5">
      <p className="text-3xl font-bold text-pool-950">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-pool-900/50">
        {label}
      </p>
    </div>
  );
}


function TicketDetailPanel({
  ticket: t,
  staff,
  copiedId,
  onCopyAccess,
  onUpdate,
  onReload,
  onClose,
}: {
  ticket: TicketRow;
  staff: StaffRow[];
  copiedId: string | null;
  onCopyAccess: (t: TicketRow) => void;
  onUpdate: (id: string, patch: Record<string, unknown>) => void;
  onReload: () => Promise<void>;
  onClose: () => void;
}) {
  const supabase = useMemo(() => createClient(), []);
  const billTo = t.billing_contact_first_name
    ? contactName(t.billing_contact_first_name, t.billing_contact_last_name)
    : null;
  const [date, setDate] = useState(t.scheduled_date ?? "");
  const [order, setOrder] = useState("");
  const [tech, setTech] = useState("");
  const [line1, setLine1] = useState(t.location_line1 ?? "");
  const [city, setCity] = useState(t.location_city ?? "");
  const [zip, setZip] = useState(t.location_zip ?? "");
  const [notes, setNotes] = useState(t.internal_notes ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);


  useEffect(() => {
    setDate(t.scheduled_date ?? "");
    setLine1(t.location_line1 ?? "");
    setCity(t.location_city ?? "");
    setZip(t.location_zip ?? "");
    setNotes(t.internal_notes ?? "");
    setError(null);
  }, [t.id, t.scheduled_date, t.location_line1, t.location_city, t.location_zip, t.internal_notes]);


  const techs = staff.filter((s) =>
    ["technician", "subcontractor", "owner", "office"].includes(s.role)
  );


  async function saveAddress(next?: { line1?: string; city?: string; zip?: string }) {
    const street = (next?.line1 ?? line1).trim();
    const nextCity = (next?.city ?? city).trim();
    const nextZip = (next?.zip ?? zip).trim();
    const formatted = [street, nextCity, "NJ", nextZip].filter(Boolean).join(", ");
    if (t.location_id) {
      const { error: locErr } = await supabase
        .from("locations")
        .update({
          line1: street || null,
          city: nextCity || null,
          zip: nextZip || null,
          state: "NJ",
          formatted_address: formatted || null,
        })
        .eq("id", t.location_id);
      if (locErr) throw locErr;
    } else {
      const { data, error: insErr } = await supabase
        .from("locations")
        .insert({
          line1: street || null,
          city: nextCity || null,
          zip: nextZip || null,
          state: "NJ",
          formatted_address: formatted || null,
        })
        .select("id")
        .single();
      if (insErr || !data) throw insErr ?? new Error("Could not save address.");
      const { error: tickErr } = await supabase
        .from("tickets")
        .update({ location_id: data.id })
        .eq("id", t.id);
      if (tickErr) throw tickErr;
    }
  }


  async function putOnRoute() {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      if (!date) {
        throw new Error("Pick a date to put this on the route.");
      }
      if (!line1.trim() && !hasStreet(t)) {
        throw new Error("Add a street address before putting this on the route.");
      }
      await saveAddress();
      const routeOrder = order.trim() ? Number(order.replace(/[^\d]/g, "")) : null;
      const { data, error: rpcErr } = await supabase.rpc("schedule_website_ticket", {
        p_ticket_id: t.id,
        p_date: date,
        p_route_order: Number.isFinite(routeOrder as number) ? routeOrder : null,
        p_technician_email: tech || null,
      });
      if (rpcErr) throw rpcErr;
      const jobId = (data as { job_id?: string } | null)?.job_id;
      setNotice(
        jobId
          ? "On the Field calendar. Open the stop from the link below."
          : "Scheduled on the Field calendar."
      );
      await onReload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not schedule this stop.");
    } finally {
      setBusy(false);
    }
  }


  async function saveNotes() {
    await onUpdate(t.id, { internal_notes: notes.trim() || null });
  }


  function changeStatus(next: TicketStatus) {
    if (next === "scheduled") {
      setError("Pick a date and tap Put on Field calendar — that marks it Scheduled.");
      return;
    }
    onUpdate(t.id, {
      status: next,
      ...(next === "completed" && !t.completed_date
        ? { completed_date: new Date().toISOString().slice(0, 10) }
        : {}),
    });
  }


  const fieldHref = t.field_job_id
    ? `${FIELD_APP}/office/jobs/${t.field_job_id}`
    : t.scheduled_date
      ? `${FIELD_APP}/office/day/${t.scheduled_date}`
      : `${FIELD_APP}/office`;


  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-pool-950/40" />
      <div className="relative flex h-full w-full max-w-md flex-col overflow-y-auto bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-pool-100 px-6 py-5">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wide text-pool-900/50">
              {t.ticket_number}
            </p>
            <select
              value={t.status}
              onChange={(e) => changeStatus(e.target.value as TicketStatus)}
              className="mt-1.5 rounded-lg border border-pool-100 px-2 py-1 text-xs font-semibold capitalize"
            >
              {TICKET_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-pool-900/50 hover:bg-pool-50">
            <X className="h-4 w-4" />
          </button>
        </div>


        <div className="flex-1 space-y-6 px-6 py-6">
          {t.status === "requested" ? (
            <button
              type="button"
              onClick={() => changeStatus("contacted")}
              className="w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Mark contacted
            </button>
          ) : null}


          <section>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-pool-900/40">
              Contact
            </h3>
            <div className="rounded-xl border border-pool-100 p-4">
              <p className="font-medium text-pool-950">{ticketName(t)}</p>
              {t.primary_contact_phone && (
                <a
                  href={`tel:${t.primary_contact_phone}`}
                  className="mt-1.5 flex items-center gap-2 text-sm text-pool-900/70 hover:text-pool-600"
                >
                  <Phone className="h-3.5 w-3.5 text-pool-400" />
                  {t.primary_contact_phone}
                </a>
              )}
              {t.primary_contact_email && (
                <a
                  href={`mailto:${t.primary_contact_email}`}
                  className="mt-1 flex items-center gap-2 text-sm text-pool-900/70 hover:text-pool-600"
                >
                  <Mail className="h-3.5 w-3.5 text-pool-400" />
                  {t.primary_contact_email}
                </a>
              )}
              {billTo && (
                <p className="mt-2 border-t border-pool-50 pt-2 text-xs text-pool-900/50">
                  Bill to: {billTo}
                  {t.billing_contact_company ? ` (${t.billing_contact_company})` : ""}
                </p>
              )}
            </div>
          </section>


          <section>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-pool-900/40">
              Location
            </h3>
            <div className="space-y-2">
              <label className="block">
                <span className="mb-1 flex items-center gap-1.5 text-xs text-pool-900/50">
                  <MapPin className="h-3 w-3" /> Street
                </span>
                <AddressAutocomplete
                  value={line1}
                  onChange={setLine1}
                  onSelect={(picked) => {
                    const nextLine1 = picked.line1 || line1;
                    const nextCity = picked.city || city;
                    const nextZip = picked.zip || zip;
                    setLine1(nextLine1);
                    if (picked.city) setCity(picked.city);
                    if (picked.zip) setZip(picked.zip);
                    saveAddress({ line1: nextLine1, city: nextCity, zip: nextZip }).catch((e) => setError(e.message));
                  }}
                  onBlur={() => {
                    if (line1 !== (t.location_line1 ?? "")) saveAddress().catch((e) => setError(e.message));
                  }}
                  placeholder="Start typing street — Google fills town + zip"
                  className="w-full rounded-lg border border-pool-100 px-3 py-2 text-sm"
                  autoComplete="street-address"
                />
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onBlur={() => {
                    if (city !== (t.location_city ?? "")) saveAddress().catch((e) => setError(e.message));
                  }}
                  placeholder="City"
                  className="w-full rounded-lg border border-pool-100 px-3 py-2 text-sm"
                />
                <input
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  onBlur={() => {
                    if (zip !== (t.location_zip ?? "")) saveAddress().catch((e) => setError(e.message));
                  }}
                  placeholder="ZIP"
                  className="w-full rounded-lg border border-pool-100 px-3 py-2 text-sm"
                />
              </div>
            </div>
          </section>


          <section>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-pool-900/40">
              Service
            </h3>
            <div className="flex items-start gap-2 text-sm text-pool-900/70">
              <Wrench className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pool-400" />
              {t.service_note || "—"}
            </div>
            {t.description && (
              <p className="mt-2 text-sm text-pool-900/60">{t.description}</p>
            )}
          </section>


          <section className="rounded-2xl border border-pool-200 bg-pool-50/50 p-4">
            <h3 className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-pool-900/50">
              <Calendar className="h-3 w-3" /> Put on Field calendar
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <label className="col-span-2 block">
                <span className="mb-1 block text-xs text-pool-900/50">Date</span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border border-pool-100 bg-white px-2 py-1.5 text-sm"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-pool-900/50">Stop #</span>
                <input
                  inputMode="numeric"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  placeholder="optional"
                  className="w-full rounded-lg border border-pool-100 bg-white px-2 py-1.5 text-sm"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-pool-900/50">Tech</span>
                <select
                  value={tech}
                  onChange={(e) => setTech(e.target.value)}
                  className="w-full rounded-lg border border-pool-100 bg-white px-2 py-1.5 text-sm"
                >
                  <option value="">Unassigned</option>
                  {techs.map((s) => (
                    <option key={s.email} value={s.email}>
                      {s.full_name || s.email}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button
              type="button"
              disabled={busy}
              onClick={putOnRoute}
              className="mt-3 w-full rounded-xl bg-pool-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {busy ? "Saving…" : t.field_job_id ? "Update Field stop" : "Put on Field calendar"}
            </button>
            {t.field_job_id ? (
              <a
                href={fieldHref}
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-pool-700 hover:underline"
              >
                Open in Keepers Field <ExternalLink className="h-3 w-3" />
              </a>
            ) : null}
            <p className="mt-2 text-xs text-pool-900/50">
              Company: Pool Keepers. Completed Field jobs are left alone — a new stop is created if you schedule again.
            </p>
          </section>


          {error ? (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          ) : null}
          {notice ? (
            <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{notice}</p>
          ) : null}


          <section>
            <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-pool-900/40">
              <FileText className="h-3 w-3" /> Internal note
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={saveNotes}
              rows={3}
              placeholder="Office only — not shown to the customer"
              className="w-full rounded-lg border border-pool-100 px-3 py-2 text-sm"
            />
          </section>


          <section>
            <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-pool-900/40">
              <KeyRound className="h-3 w-3" /> Access Code
            </h3>
            <button
              onClick={() => onCopyAccess(t)}
              className="flex items-center gap-1.5 rounded-lg border border-pool-100 px-3 py-2 font-mono text-sm text-pool-900/70 hover:bg-pool-50"
            >
              {copiedId === t.id ? (
                <Check className="h-3.5 w-3.5 text-emerald-600" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {t.access_code}
            </button>
          </section>


          <p className="text-xs text-pool-900/30">
            Created {new Date(t.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}


function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
        active ? "bg-pool-950 text-white" : "bg-white text-pool-900/60 hover:bg-pool-50"
      }`}
    >
      {children}
    </button>
  );
}
