"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";
import { Loader2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { formatUsdFromCents } from "@/lib/format";

type PackageRow = {
  slug: string;
  name: string;
  kind: string;
  amount_cents: number;
  visit_count: number;
};

type AddonRow = {
  slug: string;
  name: string;
  opening_amount_cents: number | null;
  closing_amount_cents: number | null;
};

function packageKind(pkg?: PackageRow | null) {
  if (!pkg) return "opening";
  if (pkg.kind === "combo" || pkg.slug === "combo") return "combo";
  if (pkg.kind === "closing" || pkg.slug === "closing") return "closing";
  return "opening";
}

function addonAvailable(addon: AddonRow, kind: string) {
  if (kind === "opening") return addon.opening_amount_cents != null;
  if (kind === "closing") return addon.closing_amount_cents != null;
  return addon.opening_amount_cents != null || addon.closing_amount_cents != null;
}

function addonSeasonTotal(addon: AddonRow, kind: string) {
  let total = 0;
  if (kind === "opening" || kind === "combo") {
    total += addon.opening_amount_cents ?? 0;
  }
  if (kind === "closing" || kind === "combo") {
    total += addon.closing_amount_cents ?? 0;
  }
  return total;
}

function addonBreakdown(addon: AddonRow, kind: string) {
  const parts: string[] = [];
  if ((kind === "opening" || kind === "combo") && addon.opening_amount_cents != null) {
    parts.push(`Opening ${formatUsdFromCents(addon.opening_amount_cents)}`);
  }
  if ((kind === "closing" || kind === "combo") && addon.closing_amount_cents != null) {
    parts.push(`Closing ${formatUsdFromCents(addon.closing_amount_cents)}`);
  }
  return parts.join(" + ");
}

export function CheckoutForm({
  initialPackage,
  canceled,
}: {
  initialPackage?: string;
  canceled?: boolean;
}) {
  const [packages, setPackages] = useState<PackageRow[]>([]);
  const [addons, setAddons] = useState<AddonRow[]>([]);
  const [packageSlug, setPackageSlug] = useState(initialPackage || "opening");
  const [addonSlugs, setAddonSlugs] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [line1, setLine1] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  useEffect(() => {
    fetch("/api/packages")
      .then((r) => r.json())
      .then((data) => {
        const pkgs = (data.packages ?? []) as PackageRow[];
        const ads = (data.addons ?? []) as AddonRow[];
        setPackages(pkgs);
        setAddons(ads);
        if (initialPackage && pkgs.some((p) => p.slug === initialPackage)) {
          setPackageSlug(initialPackage);
        } else if (pkgs[0]) {
          setPackageSlug(pkgs[0].slug);
        }
        setLoaded(true);
      })
      .catch(() => {
        setErrorMsg("Could not load packages. Please refresh or call us.");
        setLoaded(true);
      });
  }, [initialPackage]);

  const selected = packages.find((p) => p.slug === packageSlug);
  const kind = packageKind(selected);
  const visibleAddons = addons.filter((a) => a.slug !== "waterfall" && addonAvailable(a, kind));

  useEffect(() => {
    setAddonSlugs((prev) =>
      prev.filter((slug) => {
        const addon = addons.find((a) => a.slug === slug);
        return addon ? addonAvailable(addon, kind) : false;
      })
    );
  }, [kind, addons]);

  const previewTotal = useMemo(() => {
    let total = selected?.amount_cents ?? 0;
    for (const slug of addonSlugs) {
      const addon = addons.find((a) => a.slug === slug);
      if (addon && addonAvailable(addon, kind)) {
        total += addonSeasonTotal(addon, kind);
      }
    }
    return total;
  }, [selected, addonSlugs, addons, kind]);

  function toggleAddon(slug: string) {
    setAddonSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = new FormData(e.currentTarget);
    const payload = {
      package_slug: packageSlug,
      addon_slugs: addonSlugs.filter((slug) => {
        const addon = addons.find((a) => a.slug === slug);
        return addon ? addonAvailable(addon, kind) : false;
      }),
      customer_name: String(form.get("customer_name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      line1: line1.trim(),
      city: city.trim(),
      zip: zip.trim(),
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setStatus("error");
        setErrorMsg(data.error || "Could not start checkout.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setStatus("error");
      setErrorMsg(
        "Something went wrong. Please call us at " + siteConfig.phone + "."
      );
    }
  }

  if (!loaded) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-pool-500" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      {canceled && (
        <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          Checkout was canceled. You can try again below.
        </p>
      )}

      <div>
        <p className="mb-3 text-xs font-semibold text-pool-900/70">Package</p>
        <div className="grid gap-3">
          {packages.map((pkg) => (
            <label
              key={pkg.slug}
              className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 ${
                packageSlug === pkg.slug
                  ? "border-pool-400 bg-pool-50"
                  : "border-pool-100 bg-white"
              }`}
            >
              <input
                type="radio"
                name="package_slug"
                value={pkg.slug}
                checked={packageSlug === pkg.slug}
                onChange={() => setPackageSlug(pkg.slug)}
                className="mt-1"
              />
              <span className="flex-1">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold text-pool-950">{pkg.name}</span>
                  <span className="text-sm font-semibold text-pool-900">
                    {formatUsdFromCents(pkg.amount_cents)}
                  </span>
                </span>
                {(pkg.kind === "combo" || pkg.slug === "combo") ? (
                  <span className="mt-1 block text-xs text-emerald-700">
                    10% off the $650 opening + closing base. Heater and
                    waterfall included. Spa stays full price, billed per season.
                  </span>
                ) : (
                  <span className="mt-1 block text-xs text-pool-900/60">
                    Includes heater
                    {pkg.kind === "closing" || pkg.slug === "closing"
                      ? " and waterfall"
                      : " cleaning"}
                    . Spa is extra.
                  </span>
                )}
              </span>
            </label>
          ))}
        </div>
      </div>

      {visibleAddons.length > 0 ? (
        <div>
          <p className="mb-3 text-xs font-semibold text-pool-900/70">
            Spa add-on (full price, billed per season)
          </p>
          <div className="grid gap-3">
            {visibleAddons.map((addon) => {
              const seasonTotal = addonSeasonTotal(addon, kind);
              const breakdown = addonBreakdown(addon, kind);
              const showBreakdown = kind === "combo" || breakdown.includes("+");
              return (
                <label
                  key={addon.slug}
                  className="flex cursor-pointer items-start gap-3 rounded-2xl border border-pool-100 p-4"
                >
                  <input
                    type="checkbox"
                    checked={addonSlugs.includes(addon.slug)}
                    onChange={() => toggleAddon(addon.slug)}
                    className="mt-1"
                  />
                  <span className="flex-1">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-pool-950">
                        {addon.name}
                      </span>
                      <span className="text-sm font-semibold text-pool-900">
                        {formatUsdFromCents(seasonTotal)}
                      </span>
                    </span>
                    {showBreakdown && breakdown && (
                      <span className="mt-1 block text-xs text-pool-900/60">
                        {breakdown}
                      </span>
                    )}
                    {kind !== "combo" && breakdown && !showBreakdown && (
                      <span className="mt-1 block text-xs text-pool-900/60">
                        {breakdown}
                      </span>
                    )}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="rounded-xl bg-pool-50 px-4 py-3 text-sm text-pool-900/70">
          No add-ons are priced for this package.
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold text-pool-900/70">
            Full name *
          </label>
          <input name="customer_name" required className="input-field" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-pool-900/70">
            Email *
          </label>
          <input type="email" name="email" required className="input-field" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-pool-900/70">
            Phone *
          </label>
          <input type="tel" name="phone" required className="input-field" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold text-pool-900/70">
            Street *
          </label>
          <AddressAutocomplete
            name="line1"
            required
            value={line1}
            onChange={setLine1}
            onSelect={(picked) => {
              setLine1(picked.line1 || line1);
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
            Town *
          </label>
          <input name="city" required value={city} onChange={(e) => setCity(e.target.value)} className="input-field" autoComplete="address-level2" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-pool-900/70">
            Zip *
          </label>
          <input name="zip" required value={zip} onChange={(e) => setZip(e.target.value)} className="input-field" autoComplete="postal-code" />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl bg-pool-50 px-4 py-3 text-sm">
        <span className="font-medium text-pool-900/70">Price</span>
        <span className="text-lg font-bold text-pool-950">
          {formatUsdFromCents(previewTotal)}
        </span>
      </div>
      <p className="text-xs text-pool-900/55">
        Final total is calculated on the server from the price list. You will
        confirm it on the Stripe payment page.
      </p>

      {status === "error" && (
        <p className="text-sm font-medium text-red-600">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting" || !selected}
        className="btn-primary w-full disabled:opacity-60"
      >
        {status === "submitting" && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        {status === "submitting" ? "Redirecting to payment..." : "Pay with Stripe"}
      </button>

      <p className="text-xs leading-relaxed text-pool-900/55">
        {siteConfig.legalName} &middot; NJ HIC License #{siteConfig.hicLicense}.{" "}
        {siteConfig.njContractorNotice}
      </p>
    </form>
  );
}
