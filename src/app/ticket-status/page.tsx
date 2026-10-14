"use client";


import { useState, type FormEvent } from "react";
import { Loader2, Search, Calendar, Wrench } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { StatusBadge } from "@/components/StatusBadge";
import type { TicketStatus } from "@/lib/types";


interface TicketResult {
  ticket_number: string;
  status: TicketStatus;
  service_note: string | null;
  scheduled_date: string | null;
  completed_date: string | null;
  created_at: string;
}


export default function TicketStatusPage() {
  const [state, setState] = useState<"idle" | "loading" | "found" | "not-found">(
    "idle"
  );
  const [result, setResult] = useState<TicketResult | null>(null);


  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setResult(null);


    const form = new FormData(e.currentTarget);
    const ticketNumber = String(form.get("ticket_number") || "").trim();
    const accessCode = String(form.get("access_code") || "").trim();


    const supabase = createClient();
    const { data, error } = await supabase.rpc("get_ticket_status", {
      p_ticket_number: ticketNumber,
      p_access_code: accessCode,
    });


    if (error || !data || data.length === 0) {
      setState("not-found");
      return;
    }


    setResult(data[0]);
    setState("found");
  }


  return (
    <>
      <section className="bg-pool-950 py-20">
        <div className="container-page">
          <p className="section-eyebrow text-pool-300">Service Status</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold text-white md:text-5xl">
            Check your service ticket
          </h1>
          <p className="mt-4 max-w-xl text-pool-100/80">
            Enter the ticket number and access code from your confirmation
            email or text to see where things stand — requested, in touch,
            scheduled, in progress, or completed.
          </p>
        </div>
      </section>


      <section className="container-page py-20">
        <div className="mx-auto max-w-lg">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-pool-100 bg-white p-8 shadow-soft"
          >
            <div className="mb-5">
              <label className="mb-1.5 block text-xs font-semibold text-pool-900/70">
                Ticket number
              </label>
              <input
                name="ticket_number"
                required
                placeholder="PK-1001"
                className="input-field"
              />
            </div>
            <div className="mb-6">
              <label className="mb-1.5 block text-xs font-semibold text-pool-900/70">
                Access code
              </label>
              <input
                name="access_code"
                required
                placeholder="From your confirmation"
                className="input-field"
              />
            </div>
            <button
              type="submit"
              disabled={state === "loading"}
              className="btn-primary w-full disabled:opacity-60"
            >
              {state === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              {state === "loading" ? "Checking..." : "Check Status"}
            </button>
          </form>


          {state === "not-found" && (
            <p className="mt-5 rounded-xl bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
              We couldn't find a ticket matching that number and access code.
              Double-check them, or contact us directly.
            </p>
          )}


          {state === "found" && result && (
            <div className="mt-6 rounded-3xl border border-pool-100 bg-white p-8">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-pool-400">
                  Ticket {result.ticket_number}
                </p>
                <StatusBadge status={result.status} />
              </div>


              {result.service_note && (
                <div className="mt-5 flex items-center gap-3 text-sm text-pool-900/80">
                  <Wrench className="h-4 w-4 text-pool-500" />
                  {result.service_note}
                </div>
              )}
              {result.scheduled_date && (
                <div className="mt-3 flex items-center gap-3 text-sm text-pool-900/80">
                  <Calendar className="h-4 w-4 text-pool-500" />
                  Scheduled for{" "}
                  {new Date(result.scheduled_date + "T00:00:00").toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric", year: "numeric" }
                  )}
                </div>
              )}
              {result.completed_date && (
                <div className="mt-3 flex items-center gap-3 text-sm text-pool-900/80">
                  <Calendar className="h-4 w-4 text-pool-500" />
                  Completed{" "}
                  {new Date(result.completed_date + "T00:00:00").toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric", year: "numeric" }
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
