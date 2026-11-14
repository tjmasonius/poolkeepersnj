"use client";

import { useId, useState } from "react";
import Link from "next/link";
import {
  CHLORINE_PRODUCTS,
  CYA_MIN_FC_RATIO,
  CYA_SLAM_RATIO,
  dryDoseLabel,
  formatMeasure,
  liquidDoseLabel,
  minimumFcForCya,
  slamFcForCya,
  chlorineDose,
  type ChlorineProduct,
} from "@/lib/pool-math";
import { useGallonsField } from "@/components/tools/useGallonsField";
import { GallonsField, NumberField, parseNumber } from "@/components/tools/fields";

export function ChlorineCalculator() {
  const id = useId();
  const { gallons, setGallons, source } = useGallonsField();
  const [current, setCurrent] = useState("");
  const [target, setTarget] = useState("");
  const [cya, setCya] = useState("");
  const [productId, setProductId] = useState<ChlorineProduct["id"]>("liquid-12.5");

  const gallonValue = parseNumber(gallons);
  const currentValue = parseNumber(current);
  const targetValue = parseNumber(target);
  const cyaValue = parseNumber(cya);
  const product = CHLORINE_PRODUCTS.find((item) => item.id === productId) ?? CHLORINE_PRODUCTS[1];
  const gallonsOk = gallonValue != null && gallonValue > 0 && gallonValue <= 500000;
  const currentOk = currentValue != null && currentValue >= 0 && currentValue <= 100;
  const targetOk = targetValue != null && targetValue >= 0 && targetValue <= 100;
  const cyaOk = cya.trim() === "" || (cyaValue != null && cyaValue >= 0 && cyaValue <= 300);
  const dose =
    gallonsOk && currentOk && targetOk && gallonValue != null && currentValue != null && targetValue != null
      ? chlorineDose(gallonValue, currentValue, targetValue, product.id)
      : null;
  const minimum = cyaValue != null && cyaValue >= 0 && cya.trim() !== "" ? minimumFcForCya(cyaValue) : null;
  const slam = minimum != null && cyaValue != null ? slamFcForCya(cyaValue) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr),minmax(0,0.9fr)]">
      <form
        className="space-y-5 rounded-3xl border border-pool-100 bg-white p-5 md:p-7"
        onSubmit={(event) => event.preventDefault()}
        noValidate
      >
        <GallonsField id={`${id}-gallons`} gallons={gallons} setGallons={setGallons} source={source} />
        <NumberField
          id={`${id}-current`}
          label="Current free chlorine"
          suffix="ppm"
          value={current}
          onChange={setCurrent}
          hint="Free chlorine (FC), not total chlorine. A FAS-DPD drop test is the reading this dose is built for."
        />
        <NumberField
          id={`${id}-target`}
          label="Target free chlorine"
          suffix="ppm"
          value={target}
          onChange={setTarget}
          hint="Everyday target should be at least about 7.5% of your CYA. Enter CYA below to calculate that floor."
        />
        <NumberField
          id={`${id}-cya`}
          label="CYA, optional"
          suffix="ppm"
          value={cya}
          onChange={setCya}
          hint="Cyanuric acid / stabilizer. Leave blank if you have not tested it."
        />
        {!cyaOk ? <p className="text-sm text-red-800">Enter CYA as a number from 0 to 300.</p> : null}
        {minimum != null && slam != null ? (
          <div className="rounded-2xl border border-pool-100 bg-pool-50 p-4 text-sm leading-relaxed text-pool-900">
            <p>
              <strong className="font-semibold text-pool-950">CYA guidance. </strong>
              Minimum everyday FC is about {(CYA_MIN_FC_RATIO * 100).toFixed(1)}% of CYA, which is{" "}
              {formatMeasure(minimum, 1)} ppm. A shock / SLAM hold is about {(CYA_SLAM_RATIO * 100).toFixed(0)}% of
              CYA, which is {formatMeasure(slam, 1)} ppm. SLAM is a treatment level, not the everyday target.
            </p>
            <button
              type="button"
              className="btn-secondary mt-3"
              onClick={() => setTarget(formatMeasure(minimum, 1))}
            >
              Use {formatMeasure(minimum, 1)} ppm as the target
            </button>
          </div>
        ) : null}
        <div>
          <label htmlFor={`${id}-product`} className="text-sm font-semibold text-pool-950">
            Product
          </label>
          <select
            id={`${id}-product`}
            className="input-field mt-2 text-base"
            value={productId}
            onChange={(event) => setProductId(event.target.value as ChlorineProduct["id"])}
          >
            {CHLORINE_PRODUCTS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs leading-relaxed text-pool-900/65">{product.sideEffect}</p>
        </div>
      </form>

      <div aria-live="polite" className="rounded-3xl border border-pool-100 bg-pool-50 p-5 md:p-7">
        <p className="section-eyebrow">Amount to add</p>
        {dose && gallonValue != null && currentValue != null && targetValue != null ? (
          <ChlorineResult
            gallons={gallonValue}
            current={currentValue}
            target={targetValue}
            dose={dose}
          />
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-pool-900/75">
            Enter gallons, current free chlorine, and a target. Then pick the product that matches the jug or bag.
          </p>
        )}
        <p className="mt-4 text-sm leading-relaxed text-pool-900/75">
          Shock note: breakpoint chlorination for combined chlorine is often figured at about 10 times the combined
          chlorine reading. A SLAM holds free chlorine near 40% of CYA until the water is clear and holds chlorine
          overnight. Use liquid chlorine for that kind of repeat dosing so you do not stack CYA or calcium. See{" "}
          <Link href="/learn/how-to-shock-a-pool" className="font-semibold text-pool-800 underline decoration-pool-300">
            how to shock a pool
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

function ChlorineResult({
  gallons,
  current,
  target,
  dose,
}: {
  gallons: number;
  current: number;
  target: number;
  dose: ReturnType<typeof chlorineDose>;
}) {
  if (dose.status === "above-target") {
    return (
      <div
        role="status"
        className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950"
      >
        <strong className="font-semibold">Above the target. </strong>
        Free chlorine is already {formatMeasure(Math.abs(dose.deltaPpm), 1)} ppm over your target. Do not add more.
        Sunlight will bring it down. Keep swimmers out while it is still up at a shock level.
      </div>
    );
  }

  if (dose.status === "at-target") {
    return (
      <p className="mt-4 text-sm leading-relaxed text-pool-900/80" role="status">
        Free chlorine already matches the target. Add none.
      </p>
    );
  }

  const label =
    dose.fluidOunces != null
      ? liquidDoseLabel(dose.fluidOunces)
      : dose.dryOunces != null
        ? dryDoseLabel(dose.dryOunces)
        : null;
  if (!label) return null;

  const formula =
    dose.product.form === "liquid" && dose.fluidOunces != null
      ? `Fluid ounces = ${formatMeasure(gallons, 0)} × ${formatMeasure(dose.deltaPpm, 2)} ÷ (${dose.product.percent} × 80) = ${formatMeasure(dose.fluidOunces, 2)}.`
      : dose.dryOunces != null
        ? `Ounces by weight = ${formatMeasure(gallons, 0)} × ${formatMeasure(dose.deltaPpm, 2)} × 8.34 ÷ (${dose.product.percent} × 10,000) × 16 = ${formatMeasure(dose.dryOunces, 2)}.`
        : "";

  return (
    <>
      <p className="mt-3 text-4xl font-extrabold tracking-tight text-pool-950">{label.primary}</p>
      <p className="mt-2 text-sm text-pool-900/75">
        of {dose.product.label}
        {label.detail ? ` (${label.detail})` : ""} to raise FC from {formatMeasure(current, 2)} ppm to{" "}
        {formatMeasure(target, 2)} ppm.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-pool-900/80">{formula}</p>
      <p className="mt-3 text-sm leading-relaxed text-pool-900/75">{dose.product.sideEffect}</p>
      <Link href={`/tools/salt?gallons=${Math.round(gallons)}`} className="btn-secondary mt-6">
        Check salt for this volume
      </Link>
    </>
  );
}
