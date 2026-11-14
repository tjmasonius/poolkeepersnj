/**
 * Residential pool math used by the public calculators.
 *
 * Sources for the constants (all verifiable):
 * - 1 US gallon = 231 cubic inches, so 1 cubic foot = 1728/231 gallons.
 * - 1 US gallon = 3.785411784 liters (NIST / international gallon definition).
 * - 1 gallon of water weighs about 8.34 pounds. Parts per million means
 *   pounds of a substance per million pounds of water, so
 *   pounds = gallons × ppm × 8.34 / 1,000,000.
 * - Liquid chlorine field chart: 10 fl oz of 12.5% raises 10,000 gallons
 *   by 1 ppm free chlorine. That chart is fl oz = gallons × ppm / (percent × 80).
 * - Everyday free chlorine should be at least about 7.5% of CYA.
 *   A shock / SLAM hold level is about 40% of CYA.
 * - Kidney shapes are estimated as 85% of the rectangular box around them.
 */

export const GALLONS_PER_CUBIC_FOOT = 1728 / 231;
export const LITERS_PER_US_GALLON = 3.785411784;
export const WATER_POUNDS_PER_GALLON = 8.34;
export const KIDNEY_FILL_FACTOR = 0.85;
export const SALT_BAG_POUNDS = 40;
export const DEFAULT_SALT_TARGET_PPM = 3200;
export const CYA_MIN_FC_RATIO = 0.075;
export const CYA_SLAM_RATIO = 0.4;
/** Makes 12.5% liquid chlorine equal 10 fl oz per 1 ppm per 10,000 gallons. */
export const LIQUID_CHLORINE_CHART_DIVISOR = 80;

export type PoolShape = "rectangle" | "round" | "oval" | "kidney";
export type DepthMode = "constant" | "split";

export const SHAPES: PoolShape[] = ["rectangle", "round", "oval", "kidney"];

export const SHAPE_COPY: Record<
  PoolShape,
  { label: string; assumption: string }
> = {
  rectangle: {
    label: "Rectangle",
    assumption:
      "Straight sides. Volume is length × width × average depth.",
  },
  round: {
    label: "Round",
    assumption:
      "A circle. Volume is π × radius² × average depth, using the diameter you enter.",
  },
  oval: {
    label: "Oval",
    assumption:
      "Treated as an ellipse: π × (length ÷ 2) × (width ÷ 2) × average depth. A racetrack pool with straight sides holds a bit more than a true ellipse of the same overall size.",
  },
  kidney: {
    label: "Kidney",
    assumption:
      "Estimated as 85% of a rectangle with the same overall length, width, and average depth. Kidney outlines vary, so treat this as a planning number.",
  },
};

function assertFinite(name: string, value: number): void {
  if (!Number.isFinite(value)) {
    throw new Error(`${name} must be a finite number`);
  }
}

export function combineFeetAndInches(feet: number, inches: number): number {
  assertFinite("feet", feet);
  assertFinite("inches", inches);
  if (feet < 0 || inches < 0 || inches >= 12) {
    throw new Error("Feet must be 0 or more and inches must be from 0 up to, but not including, 12");
  }
  const total = feet + inches / 12;
  if (total <= 0) {
    throw new Error("Enter a length greater than zero");
  }
  return total;
}

export function averageDepthFeet(shallowFeet: number, deepFeet: number): number {
  assertFinite("shallow depth", shallowFeet);
  assertFinite("deep depth", deepFeet);
  if (shallowFeet <= 0 || deepFeet <= 0) {
    throw new Error("Depth must be greater than zero");
  }
  return (shallowFeet + deepFeet) / 2;
}

export function volumeCubicFeet(
  shape: PoolShape,
  lengthOrDiameterFeet: number,
  widthFeet: number,
  averageDepth: number,
): number {
  assertFinite("length", lengthOrDiameterFeet);
  assertFinite("width", widthFeet);
  assertFinite("depth", averageDepth);
  if (lengthOrDiameterFeet <= 0 || averageDepth <= 0) {
    throw new Error("Length and depth must be greater than zero");
  }
  if (shape !== "round" && widthFeet <= 0) {
    throw new Error("Width must be greater than zero");
  }

  switch (shape) {
    case "rectangle":
      return lengthOrDiameterFeet * widthFeet * averageDepth;
    case "round": {
      const radius = lengthOrDiameterFeet / 2;
      return Math.PI * radius * radius * averageDepth;
    }
    case "oval":
      return (
        Math.PI *
        (lengthOrDiameterFeet / 2) *
        (widthFeet / 2) *
        averageDepth
      );
    case "kidney":
      return lengthOrDiameterFeet * widthFeet * averageDepth * KIDNEY_FILL_FACTOR;
    default: {
      const neverShape: never = shape;
      throw new Error(`Unknown shape ${neverShape}`);
    }
  }
}

export function cubicFeetToGallons(cubicFeet: number): number {
  assertFinite("cubic feet", cubicFeet);
  if (cubicFeet < 0) throw new Error("Cubic feet cannot be negative");
  return cubicFeet * GALLONS_PER_CUBIC_FOOT;
}

export function gallonsToLiters(gallons: number): number {
  assertFinite("gallons", gallons);
  if (gallons < 0) throw new Error("Gallons cannot be negative");
  return gallons * LITERS_PER_US_GALLON;
}

export type VolumeResult = {
  cubicFeet: number;
  gallons: number;
  liters: number;
  averageDepthFeet: number;
};

export function poolVolume(input: {
  shape: PoolShape;
  lengthOrDiameterFeet: number;
  widthFeet: number;
  averageDepthFeet: number;
}): VolumeResult {
  const cubicFeet = volumeCubicFeet(
    input.shape,
    input.lengthOrDiameterFeet,
    input.widthFeet,
    input.averageDepthFeet,
  );
  const gallons = cubicFeetToGallons(cubicFeet);
  return {
    cubicFeet,
    gallons,
    liters: gallonsToLiters(gallons),
    averageDepthFeet: input.averageDepthFeet,
  };
}

/** Pounds of salt for a ppm increase. Zero when the increase is zero. */
export function saltPoundsForIncrease(gallons: number, ppmIncrease: number): number {
  assertFinite("gallons", gallons);
  assertFinite("ppm increase", ppmIncrease);
  if (gallons < 0 || ppmIncrease < 0) {
    throw new Error("Gallons and ppm increase cannot be negative");
  }
  return (gallons * ppmIncrease * WATER_POUNDS_PER_GALLON) / 1_000_000;
}

export type SaltStatus = "add" | "at-target" | "above-target";

export type SaltDose = {
  status: SaltStatus;
  deltaPpm: number;
  pounds: number;
  bagsExact: number;
  bagsToBuy: number;
};

export function bagsToBuy(pounds: number): number {
  assertFinite("pounds", pounds);
  if (pounds <= 0) return 0;
  return Math.ceil(pounds / SALT_BAG_POUNDS - 1e-9);
}

export function saltDose(
  gallons: number,
  currentPpm: number,
  targetPpm: number,
): SaltDose {
  assertFinite("gallons", gallons);
  assertFinite("current ppm", currentPpm);
  assertFinite("target ppm", targetPpm);
  if (gallons <= 0) throw new Error("Gallons must be greater than zero");
  if (currentPpm < 0 || targetPpm < 0) {
    throw new Error("Salt readings cannot be negative");
  }

  const deltaPpm = targetPpm - currentPpm;
  if (deltaPpm === 0) {
    return { status: "at-target", deltaPpm, pounds: 0, bagsExact: 0, bagsToBuy: 0 };
  }
  if (deltaPpm < 0) {
    return {
      status: "above-target",
      deltaPpm,
      pounds: 0,
      bagsExact: 0,
      bagsToBuy: 0,
    };
  }

  const pounds = saltPoundsForIncrease(gallons, deltaPpm);
  return {
    status: "add",
    deltaPpm,
    pounds,
    bagsExact: pounds / SALT_BAG_POUNDS,
    bagsToBuy: bagsToBuy(pounds),
  };
}

export type ChlorineForm = "liquid" | "dry";

export type ChlorineProduct = {
  id:
    | "liquid-10"
    | "liquid-12.5"
    | "cal-hypo-65"
    | "cal-hypo-73"
    | "dichlor-56"
    | "trichlor-90";
  label: string;
  percent: number;
  form: ChlorineForm;
  /** What else this product changes in the water. */
  sideEffect: string;
};

export const CHLORINE_PRODUCTS: ChlorineProduct[] = [
  {
    id: "liquid-10",
    label: "Liquid chlorine 10%",
    percent: 10,
    form: "liquid",
    sideEffect: "Does not add stabilizer or calcium. Strength fades in storage.",
  },
  {
    id: "liquid-12.5",
    label: "Liquid chlorine 12.5%",
    percent: 12.5,
    form: "liquid",
    sideEffect: "Does not add stabilizer or calcium. Strength fades in storage.",
  },
  {
    id: "cal-hypo-65",
    label: "Cal-hypo 65%",
    percent: 65,
    form: "dry",
    sideEffect: "Adds calcium hardness. A poor choice when calcium is already high.",
  },
  {
    id: "cal-hypo-73",
    label: "Cal-hypo 73%",
    percent: 73,
    form: "dry",
    sideEffect: "Adds calcium hardness. A poor choice when calcium is already high.",
  },
  {
    id: "dichlor-56",
    label: "Dichlor 56%",
    percent: 56,
    form: "dry",
    sideEffect:
      "Adds cyanuric acid (about 0.9 ppm CYA for each 1 ppm of free chlorine).",
  },
  {
    id: "trichlor-90",
    label: "Trichlor 90%",
    percent: 90,
    form: "dry",
    sideEffect:
      "Adds cyanuric acid (about 0.6 ppm CYA for each 1 ppm of free chlorine) and is acidic.",
  },
];

export function chlorineProductById(id: ChlorineProduct["id"]): ChlorineProduct {
  const product = CHLORINE_PRODUCTS.find((item) => item.id === id);
  if (!product) throw new Error(`Unknown chlorine product ${id}`);
  return product;
}

/** Pounds of dry product from the ppm definition and the labeled percent. */
export function dryProductPounds(
  gallons: number,
  ppmIncrease: number,
  percentAvailableChlorine: number,
): number {
  assertFinite("gallons", gallons);
  assertFinite("ppm increase", ppmIncrease);
  assertFinite("percent", percentAvailableChlorine);
  if (gallons < 0 || ppmIncrease < 0) {
    throw new Error("Gallons and ppm increase cannot be negative");
  }
  if (percentAvailableChlorine <= 0 || percentAvailableChlorine > 100) {
    throw new Error("Available chlorine percent must be between 0 and 100");
  }
  return (
    (gallons * ppmIncrease * WATER_POUNDS_PER_GALLON) /
    (percentAvailableChlorine * 10_000)
  );
}

export function dryProductOunces(
  gallons: number,
  ppmIncrease: number,
  percentAvailableChlorine: number,
): number {
  return dryProductPounds(gallons, ppmIncrease, percentAvailableChlorine) * 16;
}

/**
 * Fluid ounces of liquid chlorine using the standard field chart
 * (10 fl oz of 12.5% = 1 ppm in 10,000 gallons).
 */
export function liquidChlorineFluidOunces(
  gallons: number,
  ppmIncrease: number,
  percentAvailableChlorine: number,
): number {
  assertFinite("gallons", gallons);
  assertFinite("ppm increase", ppmIncrease);
  assertFinite("percent", percentAvailableChlorine);
  if (gallons < 0 || ppmIncrease < 0) {
    throw new Error("Gallons and ppm increase cannot be negative");
  }
  if (percentAvailableChlorine <= 0 || percentAvailableChlorine > 100) {
    throw new Error("Available chlorine percent must be between 0 and 100");
  }
  return (
    (gallons * ppmIncrease) /
    (percentAvailableChlorine * LIQUID_CHLORINE_CHART_DIVISOR)
  );
}

export type ChlorineStatus = "add" | "at-target" | "above-target";

export type ChlorineDose = {
  status: ChlorineStatus;
  deltaPpm: number;
  product: ChlorineProduct;
  /** Dry products: ounces by weight. Liquid: null. */
  dryOunces: number | null;
  dryPounds: number | null;
  fluidOunces: number | null;
};

export function chlorineDose(
  gallons: number,
  currentFcPpm: number,
  targetFcPpm: number,
  productId: ChlorineProduct["id"],
): ChlorineDose {
  assertFinite("gallons", gallons);
  assertFinite("current FC", currentFcPpm);
  assertFinite("target FC", targetFcPpm);
  if (gallons <= 0) throw new Error("Gallons must be greater than zero");
  if (currentFcPpm < 0 || targetFcPpm < 0) {
    throw new Error("Free chlorine readings cannot be negative");
  }

  const product = chlorineProductById(productId);
  const deltaPpm = targetFcPpm - currentFcPpm;
  if (deltaPpm === 0) {
    return {
      status: "at-target",
      deltaPpm,
      product,
      dryOunces: product.form === "dry" ? 0 : null,
      dryPounds: product.form === "dry" ? 0 : null,
      fluidOunces: product.form === "liquid" ? 0 : null,
    };
  }
  if (deltaPpm < 0) {
    return {
      status: "above-target",
      deltaPpm,
      product,
      dryOunces: null,
      dryPounds: null,
      fluidOunces: null,
    };
  }

  if (product.form === "liquid") {
    return {
      status: "add",
      deltaPpm,
      product,
      dryOunces: null,
      dryPounds: null,
      fluidOunces: liquidChlorineFluidOunces(gallons, deltaPpm, product.percent),
    };
  }

  const pounds = dryProductPounds(gallons, deltaPpm, product.percent);
  return {
    status: "add",
    deltaPpm,
    product,
    dryOunces: pounds * 16,
    dryPounds: pounds,
    fluidOunces: null,
  };
}

/** Minimum everyday free chlorine, about 7.5% of CYA. */
export function minimumFcForCya(cyaPpm: number): number {
  assertFinite("CYA", cyaPpm);
  if (cyaPpm < 0) throw new Error("CYA cannot be negative");
  return cyaPpm * CYA_MIN_FC_RATIO;
}

/** Shock / SLAM hold level, about 40% of CYA. */
export function slamFcForCya(cyaPpm: number): number {
  assertFinite("CYA", cyaPpm);
  if (cyaPpm < 0) throw new Error("CYA cannot be negative");
  return cyaPpm * CYA_SLAM_RATIO;
}

export function formatMeasure(value: number, digits: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export type DoseLabel = {
  primary: string;
  detail: string;
};

export function liquidDoseLabel(fluidOunces: number): DoseLabel {
  assertFinite("fluid ounces", fluidOunces);
  if (fluidOunces < 0) throw new Error("Fluid ounces cannot be negative");
  const flOz = `${formatMeasure(fluidOunces, fluidOunces >= 10 ? 1 : 2)} fl oz`;
  if (fluidOunces >= 128) {
    return {
      primary: `${formatMeasure(fluidOunces / 128, 2)} gal`,
      detail: flOz,
    };
  }
  if (fluidOunces >= 32) {
    return {
      primary: `${formatMeasure(fluidOunces / 32, 2)} qt`,
      detail: flOz,
    };
  }
  if (fluidOunces >= 8) {
    return {
      primary: `${formatMeasure(fluidOunces / 8, 2)} cups`,
      detail: flOz,
    };
  }
  return { primary: flOz, detail: "" };
}

export function dryDoseLabel(ounces: number): DoseLabel {
  assertFinite("ounces", ounces);
  if (ounces < 0) throw new Error("Ounces cannot be negative");
  const oz = `${formatMeasure(ounces, ounces >= 10 ? 1 : 2)} oz by weight`;
  if (ounces >= 16) {
    return {
      primary: `${formatMeasure(ounces / 16, 2)} lb`,
      detail: oz,
    };
  }
  return { primary: oz, detail: "" };
}
