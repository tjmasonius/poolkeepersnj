"use client";

import { useId, useState } from "react";
import Link from "next/link";
import {
  DEFAULT_SALT_TARGET_PPM,
  SALT_BAG_POUNDS,
  WATER_POUNDS_PER_GALLON,
  formatMeasure,
  saltDose,
} from "@/lib/pool-math";
import { useGallonsField } from "@/components/tools/useGallonsField";
import { GallonsField, NumberField, parseNumber } from "@/components/tools/fields";

export function SaltCalculator() {
  const id = useId();
  const { gallons, setGallons, source } = useGallonsField();
  const [current, setCurrent] = useState("");
  const [target, setTarget] = useState(String(DEFAULT_SALT_TARGET_PPM));

  const gallonValue = parseNumber(gallons);
  const currentValue = parseNumber(current);
  const targetValue = parseNumber(target);
  const gallonsOk = gallonValue != null && gallonValue > 0 && gallonValue <= 500000;
  const currentOk = currentValue != null && currentValue >= 0 && currentValue <= 20000;
  const targetOk = targetValue != null && targetValue >= 0 && targetValue <= 20000;
  const dose =
    gallonsOk && currentOk && targetOk && gallonValue != null && currentValue != null && targetValue != null
      ? saltDose(gallonValue, currentValue, targetValue)
      : null;

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
          label="Current salt"
          suffix="ppm"
          value={current}
          onChange={setCurrent}
          hint="Use a salt test or a meter, not only the number on the cell. A scaled or cold cell can read low."
        />
        <NumberField
          id={`${id}-target`}
          label="Target salt"
          suffix="ppm"
          value={target}
          onChange={setTarget}
          hint={`Starts at ${DEFAULT_SALT_TARGET_PPM} ppm, a common midpoint. Change it to the number in your generator manual.`}
        />
      </form>

      <div aria-live="polite" className="rounded-3xl border border-pool-100 bg-pool-50 p-5 md:p-7">
        <p className="section-eyebrow">Salt to add</p>
        {dose && gallonValue != null && currentValue != null && targetValue != null ? (
          <SaltResult gallons={gallonValue} current={currentValue} target={targetValue} dose={dose} />
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-pool-900/75">
            Enter gallons, the salt reading you have now, and the target from the generator manual.
          </p>
        )}
      </div>
    </div>
  );
}

function SaltResult({
  gallons,
  current,
  target,
  dose,
}: {
  gallons: number;
  current: number;
  target: number;
  dose: ReturnType<typeof saltDose>;
}) {
  if (dose.status === "above-target") {
    return (
      <div
        role="status"
        className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950"
      >
        <strong className="font-semibold">Above the target. </strong>
        Salt is about {formatMeasure(Math.abs(dose.deltaPpm), 0)} ppm over {formatMeasure(target, 0)} ppm.
        Do not add salt. Salt does not evaporate. The usual way to lower it is to drain some water and refill.
        A reading a little over the manual&apos;s range is common. Check that manual before you drain.
      </div>
    );
  }

  if (dose.status === "at-target") {
    return (
      <p className="mt-4 text-sm leading-relaxed text-pool-900/80" role="status">
        Current salt already matches the target. Add none.
      </p>
    );
  }

  return (
    <>
      <p className="mt-3 text-4xl font-extrabold tracking-tight text-pool-950">
        {formatMeasure(dose.pounds, dose.pounds >= 10 ? 1 : 2)}
        <span className="ml-2 text-lg font-semibold text-pool-800">lb of salt</span>
      </p>
      <p className="mt-2 text-sm text-pool-900/75">
        {formatMeasure(dose.bagsExact, 2)} bags of {SALT_BAG_POUNDS} lb. Buy {dose.bagsToBuy}{" "}
        {dose.bagsToBuy === 1 ? "bag" : "bags"} so you do not run short.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-pool-900/80">
        Pounds = {formatMeasure(gallons, 0)} × ({formatMeasure(target, 0)} − {formatMeasure(current, 0)}) ×{" "}
        {WATER_POUNDS_PER_GALLON} ÷ 1,000,000 = {formatMeasure(dose.pounds, 2)}.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-pool-900/75">
        Use pool-grade salt. Pour it with the pump running and brush until it dissolves. Do not dump a
        pile into the skimmer. Confirm the target in the generator manual before you treat{" "}
        {DEFAULT_SALT_TARGET_PPM} as a rule.
      </p>
      <Link href={`/tools/chlorine?gallons=${Math.round(gallons)}`} className="btn-secondary mt-6">
        Check chlorine for this volume
      </Link>
    </>
  );
}
