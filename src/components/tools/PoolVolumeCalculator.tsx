"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import {
  GALLONS_PER_CUBIC_FOOT,
  KIDNEY_FILL_FACTOR,
  SHAPE_COPY,
  SHAPES,
  averageDepthFeet,
  combineFeetAndInches,
  formatMeasure,
  poolVolume,
  type PoolShape,
} from "@/lib/pool-math";
import { storeGallons } from "@/lib/pool-session";

type DepthMode = "constant" | "split";
type Parsed =
  | { state: "empty" }
  | { state: "error"; message: string }
  | { state: "ok"; feet: number };

function parseMeasure(feetRaw: string, inchesRaw: string): Parsed {
  const feetBlank = feetRaw.trim() === "";
  const inchesBlank = inchesRaw.trim() === "";
  if (feetBlank && inchesBlank) return { state: "empty" };
  const feet = feetBlank ? 0 : Number(feetRaw);
  const inches = inchesBlank ? 0 : Number(inchesRaw);
  if (!Number.isFinite(feet) || !Number.isFinite(inches)) {
    return { state: "error", message: "Use numbers only." };
  }
  try {
    return { state: "ok", feet: combineFeetAndInches(feet, inches) };
  } catch (error) {
    return {
      state: "error",
      message: error instanceof Error ? error.message : "Check this measurement.",
    };
  }
}

function MeasureFields({
  legend,
  feet,
  inches,
  onFeet,
  onInches,
  feetId,
  inchesId,
  error,
}: {
  legend: string;
  feet: string;
  inches: string;
  onFeet: (value: string) => void;
  onInches: (value: string) => void;
  feetId: string;
  inchesId: string;
  error?: string;
}) {
  const errorId = `${feetId}-error`;
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-pool-950">{legend}</legend>
      <div className="mt-2 grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={feetId} className="text-xs font-medium text-pool-800">
            Feet
          </label>
          <input
            id={feetId}
            className="input-field mt-1 text-base"
            inputMode="decimal"
            autoComplete="off"
            value={feet}
            onChange={(event) => onFeet(event.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
          />
        </div>
        <div>
          <label htmlFor={inchesId} className="text-xs font-medium text-pool-800">
            Inches
          </label>
          <input
            id={inchesId}
            className="input-field mt-1 text-base"
            inputMode="decimal"
            autoComplete="off"
            value={inches}
            onChange={(event) => onInches(event.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
          />
        </div>
      </div>
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-red-800">
          {error}
        </p>
      ) : (
        <p className="mt-2 text-xs text-pool-900/60">Inches are added to feet. 6 ft 6 in is 6.5 feet.</p>
      )}
    </fieldset>
  );
}

export function PoolVolumeCalculator() {
  const id = useId();
  const [shape, setShape] = useState<PoolShape>("rectangle");
  const [depthMode, setDepthMode] = useState<DepthMode>("constant");
  const [lengthFt, setLengthFt] = useState("");
  const [lengthIn, setLengthIn] = useState("");
  const [widthFt, setWidthFt] = useState("");
  const [widthIn, setWidthIn] = useState("");
  const [depthFt, setDepthFt] = useState("");
  const [depthIn, setDepthIn] = useState("");
  const [shallowFt, setShallowFt] = useState("");
  const [shallowIn, setShallowIn] = useState("");
  const [deepFt, setDeepFt] = useState("");
  const [deepIn, setDeepIn] = useState("");

  const length = parseMeasure(lengthFt, lengthIn);
  const width = parseMeasure(widthFt, widthIn);
  const constantDepth = parseMeasure(depthFt, depthIn);
  const shallow = parseMeasure(shallowFt, shallowIn);
  const deep = parseMeasure(deepFt, deepIn);

  let result: ReturnType<typeof poolVolume> | null = null;
  if (length.state === "ok" && (shape === "round" || width.state === "ok")) {
    let depth: number | null = null;
    if (depthMode === "constant" && constantDepth.state === "ok") depth = constantDepth.feet;
    if (depthMode === "split" && shallow.state === "ok" && deep.state === "ok") {
      depth = averageDepthFeet(shallow.feet, deep.feet);
    }
    if (depth != null) {
      result = poolVolume({
        shape,
        lengthOrDiameterFeet: length.feet,
        widthFeet: shape === "round" || width.state !== "ok" ? 0 : width.feet,
        averageDepthFeet: depth,
      });
    }
  }

  const gallonsExact = result?.gallons ?? null;
  useEffect(() => {
    if (gallonsExact != null) storeGallons(gallonsExact);
  }, [gallonsExact]);

  const roundedGallons = result ? Math.round(result.gallons) : null;
  const lengthLegend = shape === "round" ? "Diameter" : "Length";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr),minmax(0,0.9fr)]">
      <form
        className="space-y-6 rounded-3xl border border-pool-100 bg-white p-5 md:p-7"
        onSubmit={(event) => event.preventDefault()}
        noValidate
      >
        <fieldset>
          <legend className="text-sm font-semibold text-pool-950">Shape</legend>
          <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4" role="radiogroup" aria-label="Pool shape">
            {SHAPES.map((option) => {
              const selected = shape === option;
              return (
                <label
                  key={option}
                  className={`cursor-pointer rounded-2xl border px-3 py-3 text-center text-sm font-semibold focus-within:ring-2 focus-within:ring-pool-400 ${
                    selected
                      ? "border-pool-500 bg-pool-50 text-pool-950"
                      : "border-pool-100 text-pool-800"
                  }`}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    name={`${id}-shape`}
                    value={option}
                    checked={selected}
                    onChange={() => setShape(option)}
                  />
                  {SHAPE_COPY[option].label}
                </label>
              );
            })}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-pool-900/70">{SHAPE_COPY[shape].assumption}</p>
        </fieldset>

        <MeasureFields
          legend={lengthLegend}
          feet={lengthFt}
          inches={lengthIn}
          onFeet={setLengthFt}
          onInches={setLengthIn}
          feetId={`${id}-length-ft`}
          inchesId={`${id}-length-in`}
          error={length.state === "error" ? length.message : undefined}
        />

        {shape !== "round" ? (
          <MeasureFields
            legend="Width"
            feet={widthFt}
            inches={widthIn}
            onFeet={setWidthFt}
            onInches={setWidthIn}
            feetId={`${id}-width-ft`}
            inchesId={`${id}-width-in`}
            error={width.state === "error" ? width.message : undefined}
          />
        ) : null}

        <fieldset>
          <legend className="text-sm font-semibold text-pool-950">Depth</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {(
              [
                ["constant", "One depth"],
                ["split", "Shallow and deep"],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className={`cursor-pointer rounded-2xl border px-3 py-3 text-sm font-semibold focus-within:ring-2 focus-within:ring-pool-400 ${
                  depthMode === value
                    ? "border-pool-500 bg-pool-50 text-pool-950"
                    : "border-pool-100 text-pool-800"
                }`}
              >
                <input
                  type="radio"
                  className="sr-only"
                  name={`${id}-depth`}
                  value={value}
                  checked={depthMode === value}
                  onChange={() => setDepthMode(value)}
                />
                {label}
              </label>
            ))}
          </div>
          <p className="mt-3 text-sm text-pool-900/70">
            A shallow end and a deep end use the average, (shallow + deep) ÷ 2, which assumes a straight slope.
          </p>
        </fieldset>

        {depthMode === "constant" ? (
          <MeasureFields
            legend="Water depth"
            feet={depthFt}
            inches={depthIn}
            onFeet={setDepthFt}
            onInches={setDepthIn}
            feetId={`${id}-depth-ft`}
            inchesId={`${id}-depth-in`}
            error={constantDepth.state === "error" ? constantDepth.message : undefined}
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            <MeasureFields
              legend="Shallow depth"
              feet={shallowFt}
              inches={shallowIn}
              onFeet={setShallowFt}
              onInches={setShallowIn}
              feetId={`${id}-shallow-ft`}
              inchesId={`${id}-shallow-in`}
              error={shallow.state === "error" ? shallow.message : undefined}
            />
            <MeasureFields
              legend="Deep depth"
              feet={deepFt}
              inches={deepIn}
              onFeet={setDeepFt}
              onInches={setDeepIn}
              feetId={`${id}-deep-ft`}
              inchesId={`${id}-deep-in`}
              error={deep.state === "error" ? deep.message : undefined}
            />
          </div>
        )}
      </form>

      <div aria-live="polite" className="rounded-3xl border border-pool-100 bg-pool-50 p-5 md:p-7">
        <p className="section-eyebrow">Volume</p>
        {result && roundedGallons != null ? (
          <>
            <p className="mt-3 text-4xl font-extrabold tracking-tight text-pool-950">
              {formatMeasure(roundedGallons, 0)}
              <span className="ml-2 text-lg font-semibold text-pool-800">gallons</span>
            </p>
            <p className="mt-2 text-sm text-pool-900/75">
              {formatMeasure(Math.round(result.liters), 0)} liters ·{" "}
              {formatMeasure(result.cubicFeet, 0)} cubic feet · average depth{" "}
              {formatMeasure(result.averageDepthFeet, 2)} ft
            </p>
            <p className="mt-4 text-sm leading-relaxed text-pool-900/80">
              {formulaLine(shape, length, width, result.averageDepthFeet, result.cubicFeet, result.gallons)}
            </p>
            {roundedGallons > 80000 ? (
              <p className="mt-3 text-sm text-pool-900/80">
                That is larger than a typical residential pool around here. Measure again before you dose.
              </p>
            ) : null}
            {roundedGallons < 500 ? (
              <p className="mt-3 text-sm text-pool-900/80">
                This is spa-sized or smaller. The same formulas apply. Confirm the measurements.
              </p>
            ) : null}
            <div className="mt-6 flex flex-col gap-3">
              <Link href={`/tools/salt?gallons=${roundedGallons}`} className="btn-primary">
                Use {formatMeasure(roundedGallons, 0)} gal for salt
              </Link>
              <Link href={`/tools/chlorine?gallons=${roundedGallons}`} className="btn-secondary">
                Use {formatMeasure(roundedGallons, 0)} gal for chlorine
              </Link>
            </div>
            <p className="mt-3 text-xs text-pool-900/60">
              Gallons are rounded to the nearest gallon for dosing. This browser tab also remembers the volume for the other calculators.
            </p>
          </>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-pool-900/75">
            Enter the measurements to see gallons and liters. For a kidney pool, use the longest length and the widest width.
          </p>
        )}
      </div>
    </div>
  );
}

function formulaLine(
  shape: PoolShape,
  length: Parsed,
  width: Parsed,
  depth: number,
  cubicFeet: number,
  gallons: number,
): string {
  if (length.state !== "ok") return "";
  const depthText = formatMeasure(depth, 2);
  const cubicText = formatMeasure(cubicFeet, 1);
  const gallonText = formatMeasure(gallons, 0);
  const factor = formatMeasure(GALLONS_PER_CUBIC_FOOT, 4);
  if (shape === "round") {
    return `Cubic feet = π × (${formatMeasure(length.feet, 2)} ÷ 2)² × ${depthText} = ${cubicText}. Gallons = cubic feet × ${factor} = ${gallonText}.`;
  }
  if (width.state !== "ok") return "";
  if (shape === "oval") {
    return `Cubic feet = π × (${formatMeasure(length.feet, 2)} ÷ 2) × (${formatMeasure(width.feet, 2)} ÷ 2) × ${depthText} = ${cubicText}. Gallons = cubic feet × ${factor} = ${gallonText}.`;
  }
  if (shape === "kidney") {
    return `Cubic feet = ${formatMeasure(length.feet, 2)} × ${formatMeasure(width.feet, 2)} × ${depthText} × ${KIDNEY_FILL_FACTOR} = ${cubicText}. Gallons = cubic feet × ${factor} = ${gallonText}.`;
  }
  return `Cubic feet = ${formatMeasure(length.feet, 2)} × ${formatMeasure(width.feet, 2)} × ${depthText} = ${cubicText}. Gallons = cubic feet × ${factor} = ${gallonText}.`;
}
