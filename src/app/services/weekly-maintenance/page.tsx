import Link from "next/link";
import { ServiceLayout, serviceMetadata } from "@/components/services/ServiceLayout";
import { coreService } from "@/lib/services";

const service = coreService("weekly-maintenance");

export const metadata = serviceMetadata(service);

const faqs = [
  {
    q: "What is on a weekly visit?",
    a: "The quote spells out the scope. A typical full-service stop is a skim, brush, vacuum as needed, empty baskets, a water test, and a chemical adjustment. Filter cleans, repairs, and openings are not buried inside that sentence.",
  },
  {
    q: "How often should the water be tested between visits?",
    a: "In July, free chlorine and pH move faster than a once-a-week glance, especially after a party or a storm. The testing guide covers a realistic homeowner cadence. We still test on the route.",
  },
  {
    q: "Do you publish a weekly rate?",
    a: "No. Weekly care is quoted to the pool: size, equipment, and how far you are from the route. You see included and not included before you approve it.",
  },
];

export default function WeeklyMaintenancePage() {
  return (
    <ServiceLayout service={service} lede={service.lede} faqs={faqs}>
      <p>
        Weekly maintenance is how a New Jersey pool stays swimmable from the opening through the
        close. Heat, pollen, storms, and weekend use all land on the same water. A route visit is
        the steady correction. It is not a repair call, and it is not a substitute for telling us
        when something on the pad sounds wrong.
      </p>
      <h2 className="pt-4 text-2xl font-bold text-pool-950">What a stop usually includes</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Skim the surface and empty skimmer and pump baskets.</li>
        <li>Brush the walls and the steps. Vacuum when the bottom needs it.</li>
        <li>Check the water level and glance at filter pressure against the clean baseline.</li>
        <li>Test free chlorine and pH, and check alkalinity, CYA, salt, or calcium on the schedule those tests actually need.</li>
        <li>Dose from the test. Liquid chlorine is the default when CYA is already in range.</li>
      </ul>
      <p>
        The homeowner version of that rhythm is{" "}
        <Link href="/learn/weekly-pool-maintenance" className="font-semibold text-pool-800 underline">
          weekly maintenance
        </Link>
        , and the test cadence is{" "}
        <Link href="/learn/how-often-to-test" className="font-semibold text-pool-800 underline">
          how often to test
        </Link>
        . Doses use the{" "}
        <Link href="/tools/chlorine" className="font-semibold text-pool-800 underline">
          chlorine calculator
        </Link>{" "}
        and, on salt pools, the{" "}
        <Link href="/tools/salt" className="font-semibold text-pool-800 underline">
          salt calculator
        </Link>
        . Both need real{" "}
        <Link href="/tools/pool-volume" className="font-semibold text-pool-800 underline">
          gallons
        </Link>
        .
      </p>
      <h2 className="pt-4 text-2xl font-bold text-pool-950">What is a different visit</h2>
      <p>
        A filter clean, a cell cleaning, a heater that will not fire, and a pump that will not
        prime are not folded into the weekly sentence. You will see them called out. Seasonal{" "}
        <Link href="/services/pool-openings" className="font-semibold text-pool-800 underline">
          openings
        </Link>{" "}
        and{" "}
        <Link href="/services/pool-closings" className="font-semibold text-pool-800 underline">
          closings
        </Link>{" "}
        are their own appointments, with winterizing handled before the first hard freeze.
      </p>
      <p>
        After a thunderstorm, chlorine is often the first number to drop. The{" "}
        <Link href="/learn/after-rain-and-storms" className="font-semibold text-pool-800 underline">
          storm guide
        </Link>{" "}
        is the same checklist we expect between route days. If the water turns, call. Do not wait
        a week on a green pool and hope the next stop erases it.
      </p>
    </ServiceLayout>
  );
}