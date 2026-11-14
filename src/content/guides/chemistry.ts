import type { GuideInput } from "@/lib/guide-types";

const services = `If you want this handled on a route, start with [pool openings](/services/pool-openings) in the spring, [weekly maintenance](/services/weekly-maintenance) once the water is swimming, and [pool closings](/services/pool-closings) before a New Jersey freeze. Scope is quoted before the visit.`;

export const chemistryGuides: GuideInput[] = [
  {
    slug: "water-chemistry-basics",
    serviceTypes: ["open", "weekly"],
    title: "Pool Water Chemistry Basics for New Jersey",
    description:
      "Ideal ranges for free chlorine, pH, alkalinity, calcium, CYA, and salt, written for sunny New Jersey pools and matched to our calculators.",
    category: "water-chemistry",
    order: 1,
    related: ["ph-and-chlorine", "cya-stabilizer", "how-often-to-test"],
    calculators: ["pool-volume", "chlorine", "salt"],
    serviceAngle:
      "We test this set on openings and on the weekly route, then dose from the reading instead of from a guess.",
    markdown: `
A clear pool is a set of numbers that agree with each other. Free chlorine sanitizes. pH decides how willing that chlorine is to work and whether the water is scaling or aggressive. Alkalinity slows pH swings. Calcium protects plaster and, when it is too high, drops out as scale. Cyanuric acid (CYA, stabilizer) shields chlorine from New Jersey sun and, past a point, holds chlorine back. Salt is only a target if you have a salt chlorine generator.

These ranges are the ones used with the [chlorine calculator](/tools/chlorine), the [salt calculator](/tools/salt), and the [pool volume calculator](/tools/pool-volume). They are residential targets. They are not a medical clearance to swim, and they are not a substitute for the label on the product in your hand.

## The ranges we actually use

| Test | Everyday target | Why it is that number |
| --- | --- | --- |
| Free chlorine | At least about 7.5% of CYA | A 1 to 3 ppm chart assumes almost no stabilizer. Sunny NJ pools usually have CYA. |
| pH | 7.4 to 7.6 | Acceptable window is about 7.2 to 7.8. Higher pH slows chlorine and invites scale. |
| Total alkalinity | 80 to 120 ppm | Salt systems often sit more comfortably nearer 60 to 80 ppm because the cell pushes pH up. |
| Calcium hardness | 200 to 400 ppm plaster; 150 to 250 vinyl or fiberglass | Plaster wants calcium. Vinyl does not need a high number and can scale if you chase one. |
| CYA | 30 to 50 ppm outdoor chlorine; often 60 to 80 on salt if the manual agrees | Indoor pools usually stay under 30. More is not better. |
| Salt | Follow the cell. 3200 ppm is a common midpoint | Many AquaRite and IntelliChlor charts sit near 2700 to 3400. Low-salt systems differ. |
| Combined chlorine | 0.5 ppm or less | Higher combined chlorine is chloramines. That is a shock problem, not a "more tabs" problem. |

If you only remember one relationship, remember free chlorine and CYA. At 40 ppm CYA the everyday minimum is about 3 ppm free chlorine. At 50 ppm it is about 3.8. The [shock guide](/learn/how-to-shock-a-pool) uses a much higher hold, about 40% of CYA, and that hold is for clearing a pool, not for Tuesday.

## What to test first

Order matters. Alkalinity moves pH, so chasing pH while alkalinity is 40 ppm is a loop. Get a water test that can read free chlorine, pH, alkalinity, calcium, and CYA. Strips are a screening tool. A drop kit, especially a FAS-DPD chlorine test, is what the doses on this site expect.

Then:

1. Confirm gallons with the [volume calculator](/tools/pool-volume) if you do not already know them. A dose for 20,000 gallons poured into a 12,000 gallon pool is how people overshoot.
2. Set alkalinity in range, then pH.
3. Set free chlorine from the CYA you measured, using the [chlorine calculator](/tools/chlorine).
4. Treat calcium and CYA as slow variables. You should not "fix" them with a handful of product every Saturday.
5. On a salt pool, test salt with a kit or a meter. The cell display can lie when the water is cold or the plates are scaled. The [salt calculator](/tools/salt) starts at 3200 ppm and should be edited to the manual.

## New Jersey changes the calendar, not the chemistry

The ratios do not change because you live in Ocean County. The pressure on them does. Late April openings meet pollen and cold water. Salt cells often refuse to produce near 60°F, so liquid chlorine carries the pool until the water warms. July and August burn chlorine off on a bright afternoon, especially if CYA is low. September still swims, then the close has to happen before a hard freeze, which is the subject of [winterizing](/learn/winterizing-a-pool-in-nj).

Fill water in our area is not one recipe. Some wells are hard. Some municipal water is not. Test calcium at opening instead of assuming last year's number survived a partial drain. CYA does not evaporate. If you barely drained at the close, spring CYA can already be high before you add a single tab.

## Products that quietly change the other numbers

Liquid chlorine and cal-hypo do not add CYA. Cal-hypo does add calcium, so it is a poor weekly habit when hardness is already high. Dichlor adds roughly 0.9 ppm CYA for each 1 ppm of free chlorine. Trichlor adds roughly 0.6 ppm and is acidic. A tab floater all summer is how outdoor pools arrive at CYA 80 or 100 and then "won't hold chlorine" even though the test says 2 ppm. That 2 ppm is real, and it is too low for that much stabilizer. The full explanation is [CYA and stabilizer](/learn/cya-stabilizer).

Salt is not a sanitizer by itself. A salt system makes chlorine. You still hold a free-chlorine residual. [Salt versus chlorine](/learn/salt-vs-chlorine) is the choice. [Saltwater care](/learn/saltwater-pool-care) is the upkeep after you already own the cell.

## Mistakes that keep the water dull

Adding four chemicals in one afternoon and retesting in ten minutes. Acid, bicarb, chlorine, and stabilizer all need circulation, and some need hours or days before the test is honest. Stabilizer in particular can read low until it dissolves.

Trusting a 1–3 ppm chlorine chart after years of trichlor tabs. The chart is not wrong for a low-CYA pool. It is the wrong chart for the pool you actually have.

Topping off a salt pool and never testing salt. Rain and fill water dilute salt. Evaporation concentrates it. Both happen here, sometimes in the same week.

${services}

## Frequently asked questions

### What if my test kit and a pool store disagree?
Retest with your own drop kit on a fresh sample, especially for free chlorine and CYA. Take the gallons with you if you want a second opinion, from the [volume calculator](/tools/pool-volume). Do not dose both recommendations.

### Is there one perfect pH?
7.4 to 7.6 is the band we aim for. A reading of 7.2 or 7.8 is a reason to adjust, not a crisis, unless chlorine demand or scale says the water has been sitting there for days. The relationship is covered in [pH and chlorine](/learn/ph-and-chlorine).

### How often do these numbers need a look?
Free chlorine and pH, several times a week in July. Alkalinity weekly. Calcium and CYA monthly, and always at opening before you add more. The schedule is in [how often to test](/learn/how-often-to-test).
`.trim(),
  },
  {
    slug: "ph-and-chlorine",
    serviceTypes: ["weekly"],
    title: "pH and Chlorine: How to Balance Both",
    description:
      "How pH changes chlorine's work, what 7.4 to 7.6 means in a stabilized pool, and how to raise or lower pH without fighting alkalinity.",
    category: "water-chemistry",
    order: 2,
    related: ["total-alkalinity", "cya-stabilizer", "how-to-shock-a-pool"],
    calculators: ["chlorine", "pool-volume"],
    serviceAngle:
      "Weekly service tests pH and free chlorine together. If the two keep fighting, the visit scope can include a closer look at alkalinity and CYA.",
    markdown: `
pH and free chlorine are the pair you will touch most often. pH is a scale of how acidic or basic the water is. Free chlorine is the sanitizer still available to work. They are not the same reading, and fixing one by adding a random jug of the other is how pools go cloudy.

In a pool with little or no stabilizer, pH strongly changes how much of the chlorine is in the active hypochlorous acid form. Rough textbook shares, with no CYA in the water, are about two-thirds active near pH 7.2, about half near 7.5, and well under half by pH 7.8. With CYA in the water, most chlorine is held by stabilizer and the pH effect is gentler. It does not disappear. A pH that lives above 7.8 still slows sanitation and pushes calcium toward scale. That is why the everyday band on this site is 7.4 to 7.6, inside a wider 7.2 to 7.8 window, alongside the CYA rule in the [chlorine calculator](/tools/chlorine): free chlorine at least about 7.5% of CYA.

## What moves pH in a real pool

Swimmers, aeration, a salt cell, and some chlorine products push pH up. Acid, trichlor, and rain can pull it down. A salt generator is a steady upward nudge all summer, which is why [saltwater care](/learn/saltwater-pool-care) spends so much time on pH and why alkalinity on those pools is often held nearer 60 to 80 ppm instead of the general 80 to 120. The buffer itself is explained in [total alkalinity](/learn/total-alkalinity).

Liquid chlorine raises pH a little when it goes in. As that chlorine gets used, much of the rise comes back. People who fear liquid chlorine because "it spikes pH" are usually watching the first hour, not the next day. Trichlor does the opposite: it is acidic, and it also adds CYA. Cal-hypo tends to raise pH and it adds calcium. Pick the product for the problem you have, then let the [chlorine calculator](/tools/chlorine) size the dose from your [gallons](/tools/pool-volume).

## How to adjust without a guessing contest

Test free chlorine, pH, and alkalinity. If alkalinity is far outside 80 to 120 (or the lower salt band), correct that direction before you spend a week micro-dosing pH. The kit or the product label has the dose chart. This page will not invent a quart of acid for your pool. Acid strength and gallons both change the amount, and acid in the wrong place is a burn hazard.

Direction, which is the part worth memorizing:

- pH low: aeration (return aimed up, spa spillway, a fountain) raises pH and barely touches alkalinity. Soda ash raises pH and also raises alkalinity, so it is easy to overshoot the buffer.
- pH high: a labeled acid, added to a bucket of water first, then poured around the pool with the pump running. Never pour water into a jug of acid. Never dump acid into a skimmer and walk away with the pump off.
- Chlorine low: raise free chlorine to the CYA-based target. Do not "balance pH" by ignoring a zero chlorine reading.
- Chlorine high: stop adding. Sunlight spends it. Keep people out while it is still at a shock level.

Retest after the water has turned over, not after five minutes. One full circulation of the volume often takes many hours. [Equipment basics](/learn/pool-equipment-basics) covers why runtime matters.

## The CYA piece people skip

If CYA is 70 ppm and free chlorine is 2 ppm, the pH can be a perfect 7.5 and the pool can still go green. The chlorine number is too low for that much stabilizer. Raising the minimum is the fix, or lowering CYA by draining and refilling. Adding acid will not replace the missing chlorine. The mechanism is in [CYA explained](/learn/cya-stabilizer). A treatment-level hold, about 40% of CYA, is [how to shock](/learn/how-to-shock-a-pool), and it is not the everyday pH target.

## New Jersey habits that skew the pair

Tabs in a floater through July are convenient and acidic, and they stack CYA. By August the pH may look "easy" because trichlor keeps knocking it down, while chlorine demand gets worse. Liquid chlorine plus a tested CYA in the 30 to 50 range is the cleaner pattern for a manually chlorinated outdoor pool.

Openings in April and May often show high pH from the winter water sitting still, or low chlorine because the cover was on and nobody was dosing. Test before you shock out of habit. Cold water still needs a sanitizer once the cover is off. The cell may not make it yet.

After a thunderstorm, both numbers move. Rain dilutes, organic debris eats chlorine, and pH can shift. The [storm guide](/learn/after-rain-and-storms) is the retest list.

${services}

## Frequently asked questions

### Can I swim at 7.8 if chlorine is fine?
7.8 is the edge of the window we use, not a target to hold. If chlorine is truly at the CYA minimum and the water is clear, the practical step is to trend pH down toward 7.5 rather than to close the pool over two tenths. This is operating guidance, not medical advice.

### Why did pH bounce back the day after I added acid?
Alkalinity may be high, a salt cell may be running, or aeration from a spillway is raising pH again. Fix the source. Read [alkalinity](/learn/total-alkalinity) before you add acid every single morning.

### Should I lower chlorine by adding a chemical?
Almost never on a residential pool. Stop dosing and let sun and time bring it down. A reducer chemical is a special case, not a weekly tool.
`.trim(),
  },
  {
    slug: "total-alkalinity",
    serviceTypes: ["open", "close", "weekly"],
    title: "Total Alkalinity in a Swimming Pool",
    description:
      "What total alkalinity does, why 80 to 120 ppm is the usual band, and why salt pools often run lower so pH stops drifting up.",
    category: "water-chemistry",
    order: 3,
    related: ["ph-and-chlorine", "calcium-hardness", "water-chemistry-basics"],
    calculators: ["chlorine", "pool-volume"],
    serviceAngle:
      "Alkalinity is part of the opening test and a weekly check when pH will not sit still. We write that into the scope instead of treating it as a surprise.",
    markdown: `
Total alkalinity is the water's buffer. It is mostly bicarbonate in a swimming pool. The job is to keep pH from leaping when you add acid, when a storm hits, or when a salt cell runs all afternoon. Low alkalinity is a pool whose pH wanders. High alkalinity is a pool whose pH drifts up and stays there, often with a milky cast if calcium is also high.

The general residential band we use is 80 to 120 ppm. Saltwater pools are the exception we plan for: many of them behave better nearer 60 to 80 ppm, because the generator raises pH and a high buffer gives that rise more to push against. Both numbers assume you are also watching pH. Alkalinity is not a sanitizer. Zero chlorine with perfect alkalinity still grows algae in a New Jersey July.

## How it interacts with pH and calcium

Think of alkalinity as the springs under the pH needle. You can move pH without moving alkalinity much, by aerating. You almost cannot add strong acid for pH without also eating some alkalinity. That is why the sequence in [pH and chlorine](/learn/ph-and-chlorine) is: put alkalinity in a sensible band, then trim pH, then set free chlorine from CYA.

Calcium hardness uses the same water. High alkalinity plus high pH plus high calcium is the recipe for scale on tile, heaters, and salt cells. Low alkalinity plus low pH plus low calcium is the recipe for water that etches plaster. Vinyl and fiberglass care less about being "too soft" and more about scale. Surface targets are in [calcium hardness](/learn/calcium-hardness) and the overview table in [water chemistry basics](/learn/water-chemistry-basics).

## Raising and lowering it

Sodium bicarbonate (baking soda, sold as alkalinity increaser) raises alkalinity and nudges pH up. A widely used chart figure is about 1.4 pounds of sodium bicarbonate to raise alkalinity roughly 10 ppm in 10,000 gallons. Confirm the bag you bought and the gallons from the [volume calculator](/tools/pool-volume), then retest after circulation. Do not stack the dose because the first test was taken too soon.

Lowering alkalinity means acid, and acid also lowers pH. The controlled method is to add a labeled dose with the pump running, let pH fall, then aerate to bring pH back up while alkalinity stays lower. Doing that in one uncontrolled dump is how liners and plaster get etched and how people get hurt. Follow the dose chart in a drop test kit. If the gap is large, it is a technician visit, not a Saturday experiment.

Acid-demand problems that are really alkalinity problems show up as "I add acid every day and pH is high again by tomorrow." On a salt pool, try the lower band before you decide the cell is broken. On a trichlor pool, alkalinity can slide down all season because the tabs are acidic. Test it. Do not assume.

## What alkalinity does not do

It does not sanitize. It does not replace CYA. It does not remove metals, though wild pH swings make metal staining worse. It will not clear a green pool by itself. If the water is green, the path is brush, filter, and a chlorine hold, described in [how to shock](/learn/how-to-shock-a-pool) and [clearing a green pool](/learn/clear-a-green-pool).

Cyanuric acid can interfere with some alkalinity tests. A common correction when CYA is high is to subtract about a third of the CYA reading from the alkalinity reading to estimate carbonate alkalinity. If CYA is 60 and the test says 100, carbonate alkalinity is nearer 80. That correction matters before you "lower alkalinity" that was partly stabilizer. Details live with [stabilizer](/learn/cya-stabilizer).

## Opening and closing in this climate

At a spring [opening](/learn/pool-opening-checklist), test alkalinity before you chase pH on water that sat under a cover all winter. At the [close](/learn/pool-closing-checklist), leave pH and alkalinity in range so winter water is not aggressive while it sits. You cannot circulate acid in January if the pump is winterized. That is the point of doing it in October while the water is still moving and still above freezing.

${services}

## Frequently asked questions

### Is 70 ppm too low?
On a manually chlorinated plaster pool, 70 is a little under the 80 to 120 band. On a salt pool it can be exactly where you want it. Read the rest of the tests before you dump in bicarb.

### Can I use grocery baking soda?
The chemistry is sodium bicarbonate. A pool-labeled product is the simpler choice because the dose charts assume it. Either way, broadcast with the pump on and retest. Do not add it in the same bucket as chlorine or acid.

### Why did alkalinity fall after I corrected pH?
Acid lowers both. If you only needed a small pH trim, the alkalinity drop should be small. If it cratered, the dose was large for your gallons or the water was already near the bottom of the band.
`.trim(),
  },
];
