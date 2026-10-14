export const TZ = "America/New_York";
export const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function todayNY() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function addDaysISO(iso: string, days: number) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  const yy = dt.getUTCFullYear();
  const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(dt.getUTCDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

export function formatDayHeading(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(Date.UTC(y, m - 1, d, 16)));
}

export type DateRangeKey = "today" | "next3" | "next7" | "custom";

export const DATE_RANGE_CHIPS: { key: DateRangeKey; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "next3", label: "Next 3 days" },
  { key: "next7", label: "Next week" },
  { key: "custom", label: "Dates" },
];

export type DateRangeState = {
  key: DateRangeKey;
  start: string;
  end: string;
};

export type DateRangeQuery = {
  range?: string;
  start?: string;
  end?: string;
  date?: string;
};

export function rangeForPreset(key: Exclude<DateRangeKey, "custom">, today = todayNY()) {
  if (key === "today") return { start: today, end: today };
  if (key === "next3") return { start: today, end: addDaysISO(today, 2) };
  return { start: today, end: addDaysISO(today, 6) };
}

function validISO(raw?: string | null) {
  return raw && ISO_DATE.test(raw) ? raw : null;
}

function ordered(start: string, end: string) {
  return start <= end ? { start, end } : { start: end, end: start };
}

function matchingPreset(start: string, end: string, today: string): Exclude<DateRangeKey, "custom"> | null {
  for (const key of ["today", "next3", "next7"] as const) {
    const p = rangeForPreset(key, today);
    if (p.start === start && p.end === end) return key;
  }
  return null;
}

export function parseDateRange(
  sp: DateRangeQuery,
  defaultKey: Exclude<DateRangeKey, "custom"> = "today",
): DateRangeState {
  const today = todayNY();
  const start = validISO(sp.start);
  const end = validISO(sp.end);
  const date = validISO(sp.date);
  const raw = sp.range;

  if (raw === "today" || raw === "next3" || raw === "next7") {
    const p = rangeForPreset(raw, today);
    return { key: raw, start: p.start, end: p.end };
  }

  if (start && end) {
    const span = ordered(start, end);
    if (raw === "custom") return { key: "custom", ...span };
    const match = matchingPreset(span.start, span.end, today);
    if (match) return { key: match, ...span };
    return { key: "custom", ...span };
  }

  if (date && !raw && !start && !end) {
    if (date === today) return { key: "today", start: date, end: date };
    return { key: "custom", start: date, end: date };
  }

  const p = rangeForPreset(defaultKey, today);
  return { key: defaultKey, start: p.start, end: p.end };
}

/** Build /admin?start=&end= for a day or inclusive span. Today with no extras is a clean pathname. */
export function spanHref(
  pathname: string,
  start: string,
  end: string,
  keep: Record<string, string | undefined> = {},
) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(keep)) {
    if (v) params.set(k, v);
  }
  const span = ordered(start, end);
  const today = todayNY();
  if (span.start !== today || span.end !== today) {
    params.set("start", span.start);
    params.set("end", span.end);
  }
  const q = params.toString();
  return q ? `${pathname}?${q}` : pathname;
}

export function rangeHref(
  pathname: string,
  key: DateRangeKey,
  keep: Record<string, string | undefined> = {},
  current?: { start: string; end: string },
) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(keep)) {
    if (v) params.set(k, v);
  }
  params.set("range", key);
  if (key === "custom") {
    const start = current?.start || todayNY();
    const end = current?.end || start;
    const span = ordered(start, end);
    params.set("start", span.start);
    params.set("end", span.end);
  } else {
    const r = rangeForPreset(key);
    params.set("start", r.start);
    params.set("end", r.end);
  }
  const q = params.toString();
  return q ? `${pathname}?${q}` : pathname;
}
