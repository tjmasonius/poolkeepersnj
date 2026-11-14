"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadGallons, storeGallons } from "@/lib/pool-session";

export function useGallonsField(): {
  gallons: string;
  setGallons: (value: string) => void;
  source: "query" | "saved" | "typed" | "empty";
} {
  const params = useSearchParams();
  const fromQuery = params.get("gallons");
  const [gallons, setGallonsState] = useState("");
  const [source, setSource] = useState<"query" | "saved" | "typed" | "empty">("empty");

  useEffect(() => {
    const queryNumber = fromQuery == null ? NaN : Number(fromQuery);
    if (Number.isFinite(queryNumber) && queryNumber > 0) {
      const rounded = String(Math.round(queryNumber));
      setGallonsState(rounded);
      setSource("query");
      storeGallons(queryNumber);
      return;
    }
    const stored = loadGallons();
    if (stored) {
      setGallonsState(String(stored));
      setSource("saved");
    }
  }, [fromQuery]);

  const setGallons = (value: string) => {
    setGallonsState(value);
    setSource(value.trim() ? "typed" : "empty");
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed > 0) storeGallons(parsed);
  };

  return { gallons, setGallons, source };
}
