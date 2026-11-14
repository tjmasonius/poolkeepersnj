export const GALLONS_STORAGE_KEY = "poolkeepersnj.gallons";

export function storeGallons(gallons: number): void {
  if (typeof window === "undefined") return;
  if (!Number.isFinite(gallons) || gallons <= 0) return;
  try {
    window.sessionStorage.setItem(GALLONS_STORAGE_KEY, String(Math.round(gallons)));
  } catch {
    // Private mode and blocked storage should not break the calculator.
  }
}

export function loadGallons(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(GALLONS_STORAGE_KEY);
    if (!raw) return null;
    const value = Number(raw);
    if (!Number.isFinite(value) || value <= 0) return null;
    return value;
  } catch {
    return null;
  }
}
