"use client";

import Link from "next/link";

export function GallonsField({
  id,
  gallons,
  setGallons,
  source,
}: {
  id: string;
  gallons: string;
  setGallons: (value: string) => void;
  source: "query" | "saved" | "typed" | "empty";
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-pool-950">
        Pool volume (gallons)
      </label>
      <input
        id={id}
        className="input-field mt-2 text-base"
        inputMode="decimal"
        autoComplete="off"
        value={gallons}
        onChange={(event) => setGallons(event.target.value)}
      />
      <p className="mt-2 text-xs leading-relaxed text-pool-900/65">
        {source === "query"
          ? "Carried over from your volume result."
          : source === "saved"
            ? "Filled from the volume saved in this browser tab."
            : "Use the volume calculator if you do not know the gallons yet."}{" "}
        <Link href="/tools/pool-volume" className="font-semibold text-pool-800 underline decoration-pool-300">
          Calculate volume
        </Link>
      </p>
    </div>
  );
}

export function NumberField({
  id,
  label,
  suffix,
  value,
  onChange,
  hint,
}: {
  id: string;
  label: string;
  suffix: string;
  value: string;
  onChange: (value: string) => void;
  hint: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-pool-950">
        {label} ({suffix})
      </label>
      <input
        id={id}
        className="input-field mt-2 text-base"
        inputMode="decimal"
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <p className="mt-2 text-xs leading-relaxed text-pool-900/65">{hint}</p>
    </div>
  );
}

export function parseNumber(raw: string): number | null {
  if (raw.trim() === "") return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}
