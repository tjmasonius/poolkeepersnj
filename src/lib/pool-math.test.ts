import { describe, expect, it } from "vitest";
import {
  CYA_MIN_FC_RATIO,
  CYA_SLAM_RATIO,
  DEFAULT_SALT_TARGET_PPM,
  GALLONS_PER_CUBIC_FOOT,
  KIDNEY_FILL_FACTOR,
  LITERS_PER_US_GALLON,
  SALT_BAG_POUNDS,
  WATER_POUNDS_PER_GALLON,
  averageDepthFeet,
  bagsToBuy,
  chlorineDose,
  combineFeetAndInches,
  cubicFeetToGallons,
  dryDoseLabel,
  dryProductOunces,
  gallonsToLiters,
  liquidChlorineFluidOunces,
  liquidDoseLabel,
  minimumFcForCya,
  poolVolume,
  saltDose,
  saltPoundsForIncrease,
  slamFcForCya,
  volumeCubicFeet,
} from "./pool-math";

describe("unit constants", () => {
  it("uses the exact cubic-foot gallon factor", () => {
    expect(GALLONS_PER_CUBIC_FOOT).toBeCloseTo(1728 / 231, 12);
    expect(GALLONS_PER_CUBIC_FOOT).toBeCloseTo(7.4805194805, 8);
  });

  it("uses the NIST liter factor and the 8.34 pound water weight", () => {
    expect(LITERS_PER_US_GALLON).toBe(3.785411784);
    expect(WATER_POUNDS_PER_GALLON).toBe(8.34);
    expect(gallonsToLiters(1)).toBeCloseTo(3.785411784, 12);
  });

  it("defaults the salt target to 3200 ppm and bags to 40 pounds", () => {
    expect(DEFAULT_SALT_TARGET_PPM).toBe(3200);
    expect(SALT_BAG_POUNDS).toBe(40);
    expect(KIDNEY_FILL_FACTOR).toBe(0.85);
    expect(CYA_MIN_FC_RATIO).toBeCloseTo(0.075, 8);
    expect(CYA_SLAM_RATIO).toBeCloseTo(0.4, 8);
  });
});

describe("lengths and depth", () => {
  it("combines feet and inches", () => {
    expect(combineFeetAndInches(10, 6)).toBeCloseTo(10.5, 8);
    expect(combineFeetAndInches(8, 0)).toBe(8);
    expect(combineFeetAndInches(0, 6)).toBeCloseTo(0.5, 8);
  });

  it("rejects empty, negative, and 12-inch entries", () => {
    expect(() => combineFeetAndInches(0, 0)).toThrow();
    expect(() => combineFeetAndInches(-1, 0)).toThrow();
    expect(() => combineFeetAndInches(5, 12)).toThrow();
    expect(() => combineFeetAndInches(5, -0.1)).toThrow();
  });

  it("averages a straight shallow-to-deep slope", () => {
    expect(averageDepthFeet(3, 7)).toBe(5);
    expect(averageDepthFeet(4, 4)).toBe(4);
  });
});

describe("volume", () => {
  it("computes a rectangle from cubic feet", () => {
    const cubicFeet = volumeCubicFeet("rectangle", 20, 40, 5);
    expect(cubicFeet).toBe(4000);
    const gallons = cubicFeetToGallons(cubicFeet);
    expect(gallons).toBeCloseTo(4000 * (1728 / 231), 6);
    expect(gallons).toBeCloseTo(29922.0779, 3);
  });

  it("uses average depth for a sloped rectangle", () => {
    const flat = poolVolume({
      shape: "rectangle",
      lengthOrDiameterFeet: 32,
      widthFeet: 16,
      averageDepthFeet: 5,
    });
    const sloped = poolVolume({
      shape: "rectangle",
      lengthOrDiameterFeet: 32,
      widthFeet: 16,
      averageDepthFeet: averageDepthFeet(3, 7),
    });
    expect(sloped.gallons).toBeCloseTo(flat.gallons, 8);
    expect(sloped.liters).toBeCloseTo(flat.gallons * LITERS_PER_US_GALLON, 6);
  });

  it("computes a round pool from π r²", () => {
    const cubicFeet = volumeCubicFeet("round", 24, 0, 4);
    expect(cubicFeet).toBeCloseTo(Math.PI * 12 * 12 * 4, 8);
    expect(cubicFeetToGallons(cubicFeet)).toBeCloseTo(
      Math.PI * 144 * 4 * (1728 / 231),
      6,
    );
  });

  it("computes an oval as an ellipse", () => {
    const cubicFeet = volumeCubicFeet("oval", 32, 16, 4);
    expect(cubicFeet).toBeCloseTo(Math.PI * 16 * 8 * 4, 8);
  });

  it("estimates a kidney as 85% of the bounding rectangle", () => {
    const cubicFeet = volumeCubicFeet("kidney", 30, 15, 4);
    expect(cubicFeet).toBeCloseTo(30 * 15 * 4 * 0.85, 8);
  });

  it("rejects non-positive dimensions", () => {
    expect(() => volumeCubicFeet("rectangle", 0, 10, 4)).toThrow();
    expect(() => volumeCubicFeet("rectangle", 10, 0, 4)).toThrow();
    expect(() => volumeCubicFeet("oval", 10, 12, 0)).toThrow();
  });
});

describe("salt", () => {
  it("matches the 8.34 pounds per 100 ppm per 10,000 gallons rule", () => {
    expect(saltPoundsForIncrease(10_000, 100)).toBeCloseTo(8.34, 8);
    expect(saltPoundsForIncrease(20_000, 400)).toBeCloseTo(66.72, 8);
  });

  it("counts 40-pound bags, rounding partial bags up", () => {
    const dose = saltDose(20_000, 2800, 3200);
    expect(dose.status).toBe("add");
    expect(dose.deltaPpm).toBe(400);
    expect(dose.pounds).toBeCloseTo(66.72, 8);
    expect(dose.bagsExact).toBeCloseTo(66.72 / 40, 8);
    expect(dose.bagsToBuy).toBe(2);
  });

  it("returns one bag on an exact 40-pound dose", () => {
    expect(bagsToBuy(40)).toBe(1);
    expect(bagsToBuy(40.1)).toBe(2);
    expect(bagsToBuy(0)).toBe(0);
  });

  it("warns instead of dosing when salt is already at or over the target", () => {
    expect(saltDose(15_000, 3200, 3200).status).toBe("at-target");
    const high = saltDose(15_000, 3800, 3200);
    expect(high.status).toBe("above-target");
    expect(high.pounds).toBe(0);
    expect(high.deltaPpm).toBe(-600);
  });
});

describe("chlorine", () => {
  it("matches published dry-product checkpoints for 10,000 gallons and 1 ppm", () => {
    expect(dryProductOunces(10_000, 1, 65)).toBeCloseTo(2.052923, 3);
    expect(dryProductOunces(10_000, 1, 73)).toBeCloseTo(1.827945, 3);
    expect(dryProductOunces(10_000, 1, 56)).toBeCloseTo(2.382857, 3);
    expect(dryProductOunces(10_000, 1, 90)).toBeCloseTo(1.482667, 3);
  });

  it("matches the 10 fl oz / 12.5% and 12.5 fl oz / 10% liquid chart", () => {
    expect(liquidChlorineFluidOunces(10_000, 1, 12.5)).toBeCloseTo(10, 8);
    expect(liquidChlorineFluidOunces(10_000, 1, 10)).toBeCloseTo(12.5, 8);
    expect(liquidChlorineFluidOunces(20_000, 3, 12.5)).toBeCloseTo(60, 8);
  });

  it("returns the matching unit for the product form", () => {
    const liquid = chlorineDose(10_000, 1, 4, "liquid-12.5");
    expect(liquid.status).toBe("add");
    expect(liquid.fluidOunces).toBeCloseTo(30, 8);
    expect(liquid.dryOunces).toBeNull();

    const dry = chlorineDose(10_000, 0, 1, "trichlor-90");
    expect(dry.dryOunces).toBeCloseTo(1.482667, 3);
    expect(dry.fluidOunces).toBeNull();
  });

  it("does not tell you to add chlorine that is already high enough", () => {
    expect(chlorineDose(12_000, 5, 5, "liquid-10").status).toBe("at-target");
    const high = chlorineDose(12_000, 8, 3, "cal-hypo-65");
    expect(high.status).toBe("above-target");
    expect(high.dryOunces).toBeNull();
  });

  it("labels sensible units and keeps the raw ounces", () => {
    expect(liquidDoseLabel(10).primary).toBe("1.25 cups");
    expect(liquidDoseLabel(10).detail).toContain("fl oz");
    expect(liquidDoseLabel(40).primary).toBe("1.25 qt");
    expect(liquidDoseLabel(128).primary).toBe("1.00 gal");
    expect(liquidDoseLabel(4).primary).toContain("fl oz");
    expect(dryDoseLabel(2.05).primary).toContain("oz by weight");
    expect(dryDoseLabel(32).primary).toBe("2.00 lb");
    expect(dryDoseLabel(32).detail).toContain("oz by weight");
  });
});

describe("CYA guidance", () => {
  it("sets minimum FC at 7.5% of CYA and SLAM at 40%", () => {
    expect(minimumFcForCya(40)).toBeCloseTo(3, 8);
    expect(minimumFcForCya(50)).toBeCloseTo(3.75, 8);
    expect(slamFcForCya(40)).toBeCloseTo(16, 8);
    expect(slamFcForCya(50)).toBeCloseTo(20, 8);
    expect(minimumFcForCya(0)).toBe(0);
  });

  it("rejects negative CYA", () => {
    expect(() => minimumFcForCya(-1)).toThrow();
    expect(() => slamFcForCya(-5)).toThrow();
  });
});
