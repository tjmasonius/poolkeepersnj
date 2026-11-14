import Link from "next/link";
import { ServiceLayout, serviceMetadata } from "@/components/services/ServiceLayout";
import { coreService } from "@/lib/services";

const service = coreService("pool-openings");

export const metadata = serviceMetadata(service);

const faqs = [
  {
    q: "When should a New Jersey pool be opened?",
    a: "When you can circulate the water and stay ahead of pollen and warming weather, often mid-April through May in Monmouth, Ocean, Middlesex, and Mercer Counties. Waiting until the water is already warm and green makes the first weeks harder.",
  },
  {
    q: "Do you balance the water on opening day?",
    a: "We test and start the correction. Cyanuric acid, calcium, and a green pool can take more than one visit. The quote says what that first visit includes.",
  },
  {
    q: "Is an opening the same as weekly service?",
    a: "No. Opening is the seasonal start. Weekly maintenance is the route after the pool is swimming. Closing is the fall winterizing visit. Each one is scoped on its own.",
  },
];

export default function PoolOpeningsPage() {
  return (
    <ServiceLayout service={service} lede={service.lede} faqs={faqs}>
      <p>
        A spring opening is the cover, the equipment, and a first real test. In our counties that
        usually lands between mid-April and Memorial Day. Inland spots in Mercer and Middlesex often
        move first. The shore can lag a week when the wind stays cold. The useful trigger is simple:
        you can run the pump, and you would rather not discover a green pool in the last week of May.
      </p>
      <h2 className="pt-4 text-2xl font-bold text-pool-950">What the visit is for</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Get standing water and debris off the cover, then remove, clean, and store it dry.</li>
        <li>Put fittings, baskets, plugs, gauges, and the pump back in service and look for freeze damage.</li>
        <li>Fill to the middle of the skimmer, prime the pump, and note a clean filter pressure.</li>
        <li>Test free chlorine, pH, alkalinity, calcium, and CYA before adding a bag of anything.</li>
        <li>Brush, vacuum as needed, and leave the filter running if the water is dull or green.</li>
      </ul>
      <p>
        Salt generators often will not produce while the water is still near 60°F. Early-season
        chlorine is usually liquid, measured from the{" "}
        <Link href="/tools/chlorine" className="font-semibold text-pool-800 underline">
          chlorine calculator
        </Link>{" "}
        once you know{" "}
        <Link href="/tools/pool-volume" className="font-semibold text-pool-800 underline">
          gallons
        </Link>
        . The step-by-step homeowner version is the{" "}
        <Link href="/learn/pool-opening-checklist" className="font-semibold text-pool-800 underline">
          pool opening checklist
        </Link>
        , with timing in the{" "}
        <Link href="/learn/nj-pool-season" className="font-semibold text-pool-800 underline">
          New Jersey season guide
        </Link>
        .
      </p>
      <h2 className="pt-4 text-2xl font-bold text-pool-950">What stays off this visit</h2>
      <p>
        Filter grids that need a teardown, a heater that will not fire, a liner leak, and a cell
        that has not been cleaned are their own work. The quote lists what is included and what is
        not, the same way a weekly visit does. We do not publish a one-price menu on this page.
        Tell us the town, the pool, and whether you want{" "}
        <Link href="/services/weekly-maintenance" className="font-semibold text-pool-800 underline">
          weekly maintenance
        </Link>{" "}
        after the open. Fall{" "}
        <Link href="/services/pool-closings" className="font-semibold text-pool-800 underline">
          closings
        </Link>{" "}
        are booked the same way, on a written scope.
      </p>
      <p>
        Opening packages that are sold online live on the{" "}
        <Link href="/packages" className="font-semibold text-pool-800 underline">
          packages
        </Link>{" "}
        page. If your pool needs a custom scope, use the quote form and we will follow up.
      </p>
    </ServiceLayout>
  );
}
