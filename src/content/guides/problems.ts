import type { GuideInput } from "@/lib/guide-types";

const services = `If the water problem is bigger than a test and a filter clean, book it as a scoped visit: [pool openings](/services/pool-openings), [weekly maintenance](/services/weekly-maintenance), or [pool closings](/services/pool-closings).`;

export const problemGuides: GuideInput[] = [
  {
    slug: "cloudy-water",
    serviceTypes: ["weekly"],
    title: "Cloudy Pool Water: Causes and Fixes",
    description:
      "How to tell early algae, poor filtration, and calcium cloudiness apart, and what to do first so you do not add the wrong chemical.",
    category: "water-problems",
    order: 1,
    related: ["clear-a-green-pool", "filter-care", "calcium-hardness"],
    calculators: ["chlorine", "pool-volume"],
    serviceAngle:
      "Cloudy water on a weekly stop gets a test and a filter check before anyone adds a clarifier. If it started right after an opening, say so when you book.",
    markdown: `
Cloudy water is a symptom. The useful split is early algae, fine debris the filter is not catching, and minerals falling out of solution. Each one looks like a haze from the deck. They do not share a cure. A clarifier poured into all three is how a one-day haze becomes a three-day mess in the filter.

Test free chlorine, pH, and alkalinity before you shop. If you know CYA, compare free chlorine with the floor of about 7.5% of CYA using the [chlorine calculator](/tools/chlorine). Gallons, if you need to dose, come from the [volume calculator](/tools/pool-volume).

## Early algae

Dull water that slides toward green, especially after a hot weekend or a storm, is algae until a good test says otherwise. The fix is brushing, filtration, and a chlorine hold, not a clarifier. [Clearing a green pool](/learn/clear-a-green-pool) is the full sequence. [How to shock](/learn/how-to-shock-a-pool) is the level, about 40% of CYA, held until the water is clear and chlorine holds overnight. If the haze is yellow and brushes off the shady wall, read [mustard algae](/learn/mustard-algae) before you declare it pollen.

## The filter is behind

Even dead algae and ordinary dust need a filter that is actually capturing them. Check the pressure gauge against the clean baseline. A rise of about 8 to 10 psi means it is time to backwash, rinse, or recharge. A gauge that never moves can be broken, which is its own problem, covered in [filter pressure](/learn/filter-pressure).

Sand filters are the coarsest of the common three and can struggle with very fine haze until a clarifier or a bit of time helps the particles clump. Cartridge filters catch finer material and simply need a rinse, then a deeper clean when rinsing stops restoring pressure. DE is the finest and will clear a haze the others leave, unless a torn grid is sending DE itself back to the pool. That cloud sparkles or feels gritty and shows up right after you added DE. [Filter care](/learn/filter-care) is the maintenance for each type. Circulation has to be long enough to turn the water over. A two-hour run on a dirty cartridge will not clear 20,000 gallons.

## Calcium and pH

Milky water after a pH spike, or right after a large dose of calcium chloride, is often calcium coming out of solution. Get pH back to 7.4 to 7.6, keep the filter running, and brush so it does not cement onto the floor. [Calcium hardness](/learn/calcium-hardness) and [total alkalinity](/learn/total-alkalinity) explain when high buffer plus high pH plus heat makes this likely, including inside a heater or a salt cell. Do not shock a calcium cloud with cal-hypo. You would be adding more calcium.

## What to add, and what to wait out

If chlorine is honestly at the CYA floor, pH is in band, and the filter is clean, a clarifier can help a sand filter grab fine particles. Follow the label and watch pressure. Floc drops particles to the floor for a vacuum-to-waste. It is a commitment: disturb the pool and you stir the blanket back up. Neither product fixes a sanitizer problem.

Give the filter time. A pool that was green yesterday and white-cloudy today is often on the way to clear. [Algae prevention](/learn/algae-prevention) is how you stay there. [Phosphates](/learn/phosphates) are a later test if cloudiness and algae keep trading places after the filter and the chlorine are both right.

Metals are the odd case: clear green or clear brown, stains, not a milky haze. Sequester and stop the pH swings. Do not keep shocking a metal stain and calling it algae.

## Local timing

Spring pollen and a dirty cover dump haze into the pool the week of an [opening](/learn/pool-opening-checklist). That is usually filtration plus a real test, not an automatic SLAM, unless the water is actually green. Late summer storms do both: they dilute chlorine and dump organic debris. [After rain](/learn/after-rain-and-storms) says to test the same day. A weekly route catches a lot of this. It will not see the cloud that starts on a Sunday night. [Weekly maintenance](/services/weekly-maintenance) is the rhythm. Call for a [opening](/services/pool-openings) or a [closing](/services/pool-closings) when the cloud is really a season change you have been postponing.

${services}

## Frequently asked questions

### How long should I wait before adding clarifier?
Long enough to know chlorine and the filter are not the issue. If free chlorine is below the CYA floor, fix that first and run the filter. Clarifier on top of live algae makes a dirty filter and a still-green pool.

### The water is cloudy only in the morning.
Look at circulation overnight and at whether a heater or a salt cell is pushing pH and scale while you sleep. Test pH at dusk and at dawn before you change products.

### Can I swim in cloudy water?
If you cannot see the floor or the main drain, do not swim. You also do not know whether the haze is algae. Clear the water, then go back to the everyday chlorine target.
`.trim(),
  },
  {
    slug: "pool-foam",
    serviceTypes: ["weekly"],
    title: "Why a Pool Is Foaming",
    description:
      "Foam usually means contamination or a leftover algaecide, not a broken sanitizer. How to tell detergent foam from a chemistry problem.",
    category: "water-problems",
    order: 2,
    related: ["cloudy-water", "algae-prevention", "how-to-shock-a-pool"],
    calculators: ["pool-volume"],
    serviceAngle:
      "Foam on a weekly stop gets traced to a product or a contaminant before more chemicals go in. Tell us if someone cleaned the deck with a household soap.",
    markdown: `
A band of foam at the returns or in a spa means something in the water is acting like soap. Chlorine level, by itself, does not foam. The usual sources are a recent algaecide or clarifier, detergent that reached the pool, sunscreen and body products on a crowded weekend, or a cleaner that was labeled for tile and was not rinsed. Foam is ugly and it is a clue. It is rarely an emergency for the shell.

Test free chlorine and pH anyway, because a foamy pool can also be an under-sanitized pool that someone tried to fix with three bottles. Use the [chlorine calculator](/tools/chlorine) if the reading is actually low for your CYA. Do not add a defoamer as a way to avoid the test.

## Walk the recent history

What went in during the last week? Many algaecides and some clarifiers foam, especially if the dose was heavy for the gallons or the product hit a spa spillway that whips air into the water. [Algae prevention](/learn/algae-prevention) treats algaecide as a helper with a label, not a weekly vitamin. If you doubled the label because the pool was green, the foam is the leftover, and the green may still need the sequence in [clearing a green pool](/learn/clear-a-green-pool).

Did anyone wash suits, the deck, or the solar cover with dish soap or laundry detergent? A little detergent foams a lot. Solar covers and some winter covers that were stored dirty can carry it back into the water. [Pool covers](/learn/pool-covers) is the reminder to rinse covers with water, not with soap, before they go back on.

A spillway, a negative edge, or a strong return breaks the surface and makes a small amount of surfactant look dramatic. The same water in a still pool might only show a collar of bubbles. That does not mean you ignore it. It means you will see it first at the waterfall.

## What to do

Stop adding the product that caused it. Run the filter. Skim the foam if it is thick so it does not sit on the tile. If the source is detergent, the reliable fix is dilution: remove some water and refill, the same idea as lowering CYA or salt, sized to how bad the foam is. A partial exchange is enough for a light case. A pool that foams like a car wash needs more fresh water than a cup of defoamer.

Defoamers exist. Follow the label, use a small dose, and do not stack them with a shock in one bucket. They treat the symptom. If detergent is still in the water, foam returns when the spillway runs.

Keep pH in the 7.4 to 7.6 band so you are not chasing a second problem. Foam plus cloudy water should send you to [cloudy water](/learn/cloudy-water) and a filter check. Foam plus a slick yellow wall should send you to [mustard algae](/learn/mustard-algae). Foam alone, with clear water and a sane chlorine test, is a contamination or product leftover.

## What foam is not

It is not proof the salt system failed. It is not a reason to drain an inground vinyl pool to the floor. It is not combined chlorine, which you measure, and which you treat by [shocking](/learn/how-to-shock-a-pool) if the combined reading is high. A "chlorine smell" and foam can show up together after a party because swimmers brought both chloramines and lotions. Test combined chlorine. Do not guess from the bubbles.

If a robotic cleaner or a cartridge was washed with soap, rinse it until the rinse water is honestly clean before it goes back. [Robotic cleaners](/learn/robotic-pool-cleaners) and [cartridge filter care](/learn/filter-care) both get ruined as foam sources by a well-meant squirt of dish soap.

## Spas and spillways

A spa that spills into the pool will foam first, because it beats air into the water. If only the spa foams, clean that filter and ask what was poured into the spa, not the main pool. A spillway you leave running all day will keep a small surfactant problem visible. Turn it off for an hour. If the bubbles fade and stay gone, you were looking at agitation of a trace leftover. If they rebuild the moment the spillway starts, the contaminant is still in the water and dilution is the real fix.

${services}

## Frequently asked questions

### Will the foam go away on its own?
If it was a modest algaecide dose and you stop adding it, filtration and time often clear it. Detergent lingers until you dilute. Give it a day of circulation before you add another chemical.

### Should I shock foamy water?
Shock if the test says free chlorine is low or combined chlorine is high. Do not shock because of bubbles alone. You may foam even more for an afternoon.

### Is foam dangerous to swim in?
Detergent and some treatment leftovers are a reason to stay out until you know what was added and the water tests in range. This is pool-operation caution, not a medical diagnosis.
`.trim(),
  },
  {
    slug: "pool-leaks",
    serviceTypes: ["weekly"],
    title: "Pool Leaks and the Bucket Test",
    description:
      "How to separate evaporation from a leak with a bucket test, and how to tell a shell leak from a plumbing leak before you drain the pool.",
    category: "water-problems",
    order: 3,
    related: ["pool-equipment-basics", "pump-wont-prime", "winterizing-a-pool-in-nj"],
    calculators: ["pool-volume", "salt"],
    serviceAngle:
      "A leak that only shows up with the pump running is often plumbing on the pad. We can trace that on a visit. A liner or shell leak is a different scope, and we will say so.",
    markdown: `
Water leaves a pool three honest ways: evaporation, splash and backwash, and a leak. New Jersey summers can drop the level about a quarter inch a day in hot, windy weather, and a fountain, spillway, or negative edge adds to that. A leak is the extra loss, and it is worth proving before anyone talks about draining or cutting in a new liner. The bucket test is the simple version of that proof.

You also want gallons in your head before you panic. A quarter inch on a large pool is a lot of gallons. The [volume calculator](/tools/pool-volume) tells you the whole volume. It will not, by itself, tell you the loss rate, but it stops a small pool and a large pool from sharing the same anxiety.

## How to run the bucket test

Fill the pool to its normal operating level. Set a bucket on a step so it is partly submerged and the water line inside the bucket matches the pool's water line. Fill the bucket with pool water. Mark both water lines with tape or a grease pencil. Run the pool the way you normally do, and do not add water, backwash, or swim hard for the next day. Skip the test if rain is coming. Rain ruins the comparison.

After about 24 hours, compare the drop. If the pool and the bucket fell the same amount, you are looking at evaporation. If the pool fell more, the difference is water the bucket did not lose, which means it left the pool by a leak, by splash you did not account for, or by a feature that throws water out of the shell.

Repeat the test with the pump off for another day, once it is safe to do that and you are not in a freeze. Loss only while the pump runs points at plumbing: a return, a suction line, a loose union, a filter drain, a heater bypass that weeps. Loss with the pump off points at the shell, the liner, a light niche, a skimmer throat, or a fitting below the water line. Loss both ways can mean both, or a shell leak that the first test already proved.

## What to look at before you call it structural

Walk the pad. Wet soil at a joint, a filter that has to be refilled, or air in the pump lid when the water level is fine all lean toward suction-side plumbing. [Pump will not prime](/learn/pump-wont-prime) overlaps that case. A wet spot that grows in the yard while the pump runs is a pressure-side clue. Do not excavate by guess. Mark the spot and get a technician.

Inside the pool, look at the skimmer mouth, light niche, and any fitting with a gap. On vinyl, a tear near a step or a faceplate often shows as a place debris gathers. On plaster, a structural crack is a contractor diagnosis, not a squeeze of sealant from the hardware aisle as a permanent repair. This page will not walk through a structural patch. The useful homeowner work is the test and the notes.

Salt pools add a clue. Salt leaves with the leak and does not leave with evaporation. If the level is down and salt ppm is down together, you are losing water, not just steaming it off. If the level is down and salt is up, evaporation is doing a lot of the work. Confirm both with a test and the [salt calculator](/tools/salt) before you add a bag.

## Do not make the leak worse

Do not empty an inground pool to "see the leak," especially a vinyl pool where groundwater can float the liner or the shell. Do not keep topping off forever without the bucket test. You will hide the rate and, on a salt pool, you will chase salt and CYA in circles. [Winterizing](/learn/winterizing-a-pool-in-nj) is a separate issue: a freeze crack in a pipe looks like a sudden leak in April when you open. Say so when you book an [opening](/services/pool-openings). A midseason leak on a route belongs on a [weekly maintenance](/services/weekly-maintenance) note so we are not dosing a pool that is quietly exchanging water with the soil. [Closings](/services/pool-closings) are the wrong week to ignore a known plumbing weep, because winterizing a leaking line just freezes the evidence.

Auto-fill valves stick open and mimic a high water level, or stick closed and mimic a leak if you are used to them. Check the float before you condemn the shell.

${services}

## Frequently asked questions

### How much loss is normal?
A quarter inch a day is a rough hot, windy figure without a waterfall. Cool, still weather should lose less. The bucket test matters more than any single number because your deck, wind, and water features are local.

### The bucket test shows a leak only with the pump on. Can I keep swimming?
You can often keep water in the pool while a plumbing leak is scheduled, if the level stays at the skimmer and the pump is not sucking air. Do not ignore a growing wet area in the yard. That is a repair, not a chemistry issue.

### Will dye find the leak?
Dye near a suspected fitting, with the pump off, can show a pull. It is a follow-up to the bucket test, and it is easy to misread in moving water. A negative dye test does not erase a bucket test that showed real loss.
`.trim(),
  },
];
