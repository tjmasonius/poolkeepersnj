"use client";

import { useEffect, useId, useRef, useState } from "react";

export type ParsedAddress = {
  line1: string;
  city: string;
  state: string;
  zip: string;
  formatted: string;
  lat: number | null;
  lng: number | null;
};

type Suggestion = {
  placeId: string;
  text: string;
  mainText: string;
  secondaryText: string;
};

function newSessionToken() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  name,
  required,
  placeholder = "Street",
  className,
  id,
  autoComplete = "street-address",
  onBlur,
}: {
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (address: ParsedAddress) => void;
  name?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  id?: string;
  autoComplete?: string;
  onBlur?: () => void;
}) {
  const [uncontrolled, setUncontrolled] = useState("");
  const isControlled = value !== undefined;
  const text = isControlled ? value : uncontrolled;
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [highlight, setHighlight] = useState(0);
  const sessionTokenRef = useRef(newSessionToken());
  const debounceRef = useRef<number | null>(null);
  const skipSearchRef = useRef(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  function setText(next: string) {
    if (!isControlled) setUncontrolled(next);
    onChange?.(next);
  }

  useEffect(() => {
    const q = text.trim();
    if (skipSearchRef.current) {
      skipSearchRef.current = false;
      return;
    }
    if (q.length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(async () => {
      try {
        const res = await fetch("/api/places/autocomplete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: q, sessionToken: sessionTokenRef.current }),
        });
        if (!res.ok) {
          setSuggestions([]);
          setOpen(false);
          return;
        }
        const data = await res.json();
        const list = (data.suggestions ?? []) as Suggestion[];
        setSuggestions(list);
        setHighlight(0);
        setOpen(list.length > 0);
      } catch {
        setSuggestions([]);
        setOpen(false);
      }
    }, 200);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [text]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  async function pick(s: Suggestion) {
    skipSearchRef.current = true;
    setOpen(false);
    setSuggestions([]);
    setText(s.mainText || s.text);
    try {
      const res = await fetch("/api/places/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placeId: s.placeId, sessionToken: sessionTokenRef.current }),
      });
      if (res.ok) {
        const data = (await res.json()) as ParsedAddress;
        if (data.line1) {
          skipSearchRef.current = true;
          setText(data.line1);
        }
        onSelect?.(data);
      } else {
        onSelect?.({
          line1: s.mainText || s.text,
          city: "",
          state: "",
          zip: "",
          formatted: s.text,
          lat: null,
          lng: null,
        });
      }
    } catch {
      onSelect?.({
        line1: s.mainText || s.text,
        city: "",
        state: "",
        zip: "",
        formatted: s.text,
        lat: null,
        lng: null,
      });
    }
    sessionTokenRef.current = newSessionToken();
  }

  return (
    <div ref={wrapRef} className="relative">
      <input
        id={id}
        name={name}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={className}
        value={text}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        onChange={(e) => setText(e.target.value)}
        onFocus={() => {
          if (suggestions.length) setOpen(true);
        }}
        onBlur={() => {
          window.setTimeout(() => onBlur?.(), 180);
        }}
        onKeyDown={(e) => {
          if (!open || !suggestions.length) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlight((h) => Math.min(h + 1, suggestions.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlight((h) => Math.max(h - 1, 0));
          } else if (e.key === "Enter") {
            e.preventDefault();
            void pick(suggestions[highlight]);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
      />
      {open && suggestions.length > 0 ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
        >
          {suggestions.map((s, i) => (
            <li key={s.placeId} role="option" aria-selected={i === highlight}>
              <button
                type="button"
                className={`block w-full px-3 py-2 text-left text-sm ${
                  i === highlight ? "bg-slate-100" : ""
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setHighlight(i)}
                onClick={() => void pick(s)}
              >
                <span className="block font-medium text-slate-900">{s.mainText}</span>
                {s.secondaryText ? (
                  <span className="block text-xs text-slate-500">{s.secondaryText}</span>
                ) : null}
              </button>
            </li>
          ))}
          <li className="border-t border-slate-100 px-3 py-1.5 text-right text-[10px] tracking-wide text-slate-400">
            Powered by Google
          </li>
        </ul>
      ) : null}
    </div>
  );
}
