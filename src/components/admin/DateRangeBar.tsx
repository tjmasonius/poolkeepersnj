"use client";

import { type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ISO_DATE, spanHref, type DateRangeState } from "@/lib/date-range";

export function DateRangeBar({
  pathname,
  state,
  keep = {},
  extra,
}: {
  pathname: string;
  state: DateRangeState;
  keep?: Record<string, string | undefined>;
  extra?: ReactNode;
}) {
  const router = useRouter();

  function go(start: string, end: string) {
    if (!ISO_DATE.test(start) || !ISO_DATE.test(end)) return;
    router.replace(spanHref(pathname, start, end, keep), { scroll: false });
  }

  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-end gap-3">
        <label className="min-w-0 flex-1">
          <span className="mb-1 block text-xs text-pool-900/50">From</span>
          <input
            type="date"
            value={state.start}
            onChange={(e) => go(e.target.value, state.end)}
            className="w-full rounded-lg border border-pool-100 bg-white px-2 py-1.5 text-sm"
          />
        </label>
        <label className="min-w-0 flex-1">
          <span className="mb-1 block text-xs text-pool-900/50">To</span>
          <input
            type="date"
            value={state.end}
            onChange={(e) => go(state.start, e.target.value)}
            className="w-full rounded-lg border border-pool-100 bg-white px-2 py-1.5 text-sm"
          />
        </label>
        {extra}
      </div>
    </div>
  );
}
