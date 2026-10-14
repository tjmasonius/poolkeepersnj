"use client";


import { useState, type FormEvent } from "react";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";
import { Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Service } from "@/lib/types";


export function QuoteForm({ services }: { services: Service[] }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");


  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");


    const form = new FormData(e.currentTarget);
    const payload = {
      full_name: String(form.get("full_name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      address: address.trim(),
      city: city.trim(),
      zip: zip.trim(),
      service_interest: String(form.get("service_interest") || "").trim(),
      message: String(form.get("message") || "").trim(),
      source: "website",
    };


    if (!payload.full_name || (!payload.email && !payload.phone)) {
      setStatus("error");
      setErrorMsg("Please provide your name and at least a phone or email.");
      return;
    }


    const supabase = createClient();
    const { error } = await supabase.from("leads").insert(payload);


    if (error) {
      setStatus("error");
      setErrorMsg(
        "Something went wrong submitting your request. Please call or email us directly."
      );
      return;
    }


    setStatus("done");
  }


  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        <h3 className="text-xl font-semibold text-pool-950">Request received</h3>
        <p className="max-w-sm text-sm text-pool-900/70">
          Thanks — we'll be in touch within one business day to confirm
          details and get you scheduled.
        </p>
      </div>
    );
  }


  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-pool-900/70">
            Full name *
          </label>
          <input name="full_name" required className="input-field" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-pool-900/70">
            Service interested in
          </label>
          <select name="service_interest" className="input-field">
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Not sure">Not sure yet</option>
          </select>
        </div>
      </div>


      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-pool-900/70">
            Email
          </label>
          <input type="email" name="email" className="input-field" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-pool-900/70">
            Phone
          </label>
          <input type="tel" name="phone" className="input-field" />
        </div>
      </div>


      <div className="grid gap-5 sm:grid-cols-[2fr,1fr,1fr]">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-pool-900/70">
            Street
          </label>
          <AddressAutocomplete
            name="address"
            value={address}
            onChange={setAddress}
            onSelect={(picked) => {
              setAddress(picked.line1 || address);
              if (picked.city) setCity(picked.city);
              if (picked.zip) setZip(picked.zip);
            }}
            className="input-field"
            placeholder="Start typing street — Google fills town + zip"
            autoComplete="street-address"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-pool-900/70">
            Town
          </label>
          <input name="city" value={city} onChange={(e) => setCity(e.target.value)} className="input-field" autoComplete="address-level2" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-pool-900/70">
            Zip
          </label>
          <input name="zip" value={zip} onChange={(e) => setZip(e.target.value)} className="input-field" autoComplete="postal-code" />
        </div>
      </div>


      <div>
        <label className="mb-1.5 block text-xs font-semibold text-pool-900/70">
          Tell us about your pool / what you need
        </label>
        <textarea name="message" rows={4} className="input-field resize-none" />
      </div>


      {status === "error" && (
        <p className="text-sm font-medium text-red-600">{errorMsg}</p>
      )}


      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        {status === "submitting" ? "Submitting..." : "Request My Quote"}
      </button>
    </form>
  );
}
