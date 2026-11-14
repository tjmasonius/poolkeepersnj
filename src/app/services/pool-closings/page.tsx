import Link from "next/link";
import { ServiceLayout, serviceMetadata } from "@/components/services/ServiceLayout";
import { coreService } from "@/lib/services";

const service = coreService("pool-closings");

export const metadata = serviceMetadata(service);

const faqs = [
  {
    q: "When do you close pools in New Jersey?",
    a: "When the water stays under about 60 to 65°F and before a hard freeze can hit open lines. In Ocean, Monmouth, Middlesex, and Mercer Counties that is often late September through late October. The shore usually holds heat longer than inland Mercer.",
  },
  {
    q: "Do you use automotive antifreeze in the lines?",
    a: "No. Plumbing that gets antifreeze gets pool antifreeze made for that job. Lines are blown clear first. Equipment drains are opened so the pump, filter, and heater are not left full of water.",
  },
  {
    q: "Can you close a pool that is still green?",
    a: "We would rather not trap live algae under a cover. If the season ran out, we will say so on the quote and tell you what the spring opening will inherit. A clear close is the point of the visit.",
  },
];

export default function PoolClosingsPage() {
  return (
    <ServiceLayout service={service} lede={service.lede} faqs={faqs}>
      <p>
        Closing a pool in New Jersey is winterizing, not just pulling a cover over warm water. A
        freeze with water still in a return line, a pump volute, or a heater exchanger is how pads
        crack. We time the visit off the water, not off a single weekend on the calendar.
      </p>
      <h2 className="pt-4 text-2xl font-bold text-pool-950">What the visit is for</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Test and put pH and alkalinity in a winter range while the pump can still circulate.</li>
        <li>Lower the water to the level your cover needs. Mesh safety covers and solid winter covers are not the same job.</li>
        <li>Blow the lines, plug the returns, and protect the skimmer and plumbing from a freeze.</li>
        <li>Drain the pump, filter, heater, and chlorinator. Open the plugs and leave them out or stored where you can find them in April.</li>
        <li>Add a closing chlorine dose and a winter algaecide while the water can still mix, then cover.</li>
      </ul>
      <p>
        The homeowner sequence is the{" "}
        <Link href="/learn/pool-closing-checklist" className="font-semibold text-pool-800 underline">
          closing checklist
        </Link>
        . Freeze details, shore versus inland timing, and what to glance at in January are in{" "}
        <Link href="/learn/winterizing-a-pool-in-nj" className="font-semibold text-pool-800 underline">
          winterizing a pool in New Jersey
        </Link>
        . Cover types are in{" "}
        <Link href="/learn/pool-covers" className="font-semibold text-pool-800 underline">
          pool covers
        </Link>
        .
      </p>
      <h2 className="pt-4 text-2xl font-bold text-pool-950">What we need from you</h2>
      <p>
        Know which cover you have, whether a heater or spa shares the pad, and whether anyone will
        be on site. If the pool is still in weekly care, the{" "}
        <Link href="/services/weekly-maintenance" className="font-semibold text-pool-800 underline">
          weekly maintenance
        </Link>{" "}
        route stops when the close is done. Spring{" "}
        <Link href="/services/pool-openings" className="font-semibold text-pool-800 underline">
          openings
        </Link>{" "}
        are a separate visit. Scope is written before we roll. Online closing packages, when they
        fit the pool, are on the{" "}
        <Link href="/packages" className="font-semibold text-pool-800 underline">
          packages
        </Link>{" "}
        page. Anything with a waterfall, a shared spa, or odd plumbing gets a quote instead of a
        guess.
      </p>
      <p>
        Do not close on an 78°F afternoon if you can wait. Algae keeps growing under a cover while
        the water is still warm, and you will meet it again at the{" "}
        <Link href="/learn/pool-opening-checklist" className="font-semibold text-pool-800 underline">
          opening
        </Link>
        .
      </p>
    </ServiceLayout>
  );
}
