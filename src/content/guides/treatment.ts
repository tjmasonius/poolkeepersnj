import type { GuideInput } from "@/lib/guide-types";

const services = `When the water is past a weekend project, [pool openings](/services/pool-openings), [weekly maintenance](/services/weekly-maintenance), and [pool closings](/services/pool-closings) are the three ways Pool Keepers takes it on. Each visit is quoted with a written scope.`;

export const treatmentGuides: GuideInput[] = [
  {
    slug: "how-to-shock-a-pool",
    title: "How to Shock a Pool",
    description:
      "Breakpoint chlorination and a CYA-based SLAM hold, which product to use, and how to know the shock is actually finished.",
    category: "treatment",
    order: 1,
    related: ["cya-stabilizer", "clear-a-green-pool", "algae-prevention"],
    calculators: ["chlorine", "pool-volume"],
    serviceAngle:
      "A shock that has to be held for days is a service call if you cannot test and dose on that rhythm. Weekly care is what keeps you from needing one every month.",
    markdown: `
Shocking a pool means raising free chlorine high enough to oxidize chloramines and kill algae, then keeping it there until the water proves it is done. A single dose at dusk that you never retest is a ritual. Sometimes the water gets lucky. Often it is cloudy again on Thursday.

Two different targets get called "shock," and mixing them up is the usual mistake.

Breakpoint chlorination, for combined chlorine, is often figured near 10 times the combined chlorine reading. If combined chlorine is 0.6 ppm, a breakpoint-style target is on the order of 6 ppm free chlorine, assuming CYA is not so high that your everyday floor is already above that. Combined chlorine above about 0.5 ppm is the smell people blame on "too much chlorine." It is under-chlorination leaving chloramines behind.

A SLAM hold, the approach we point to for a dull or green pool, is about 40% of CYA. At 40 ppm CYA that is about 16 ppm free chlorine. At 50 ppm it is about 20. You hold that level, testing and topping up, until the water is clear, combined chlorine is low, and an overnight loss of free chlorine is small, on the order of 1 ppm or less. The everyday floor remains about 7.5% of CYA. SLAM is not the number you swim at all summer. Enter CYA in the [chlorine calculator](/tools/chlorine) and read both numbers before you buy a product labeled "shock" that never asks what your stabilizer is.

## Which product

Use liquid chlorine for a hold you will repeat. It does not add CYA and it does not add calcium. Dichlor adds about 0.9 ppm CYA per 1 ppm of free chlorine, which means every "easy shock" makes the next one harder. Trichlor adds about 0.6 ppm CYA and is acidic. Cal-hypo works as a chlorine source and adds calcium, a poor trade when hardness is already high. The calculator sizes liquid 10%, liquid 12.5%, cal-hypo 65% and 73%, dichlor 56%, and trichlor 90%. Gallons come from the [volume calculator](/tools/pool-volume).

Add with the pump running. Brush first so algae is off the wall and in the water where chlorine can reach it. Never mix shock products together in a bucket. Never add water into a jug of acid, and do not "help" a shock by pouring acid and chlorine into the same pail. That is how people get hurt.

If CYA is extremely high, no practical shock level will behave. You have to remove water. [Stabilizer](/learn/cya-stabilizer) explains why.

## How you know it is finished

Clear water is necessary and not sufficient. Retest free chlorine morning and evening. Brush daily. Clean the filter when pressure rises about 8 to 10 psi over the clean baseline, or sooner if the return flow falls off. [Filter pressure](/learn/filter-pressure) is that check. Vacuum dead algae to waste if the filter cannot keep up, and do not leave a pile of it on the floor to redissolve.

Stop the high hold when the water is clear, combined chlorine is back under about 0.5 ppm, and chlorine holds overnight. Then let the sun bring free chlorine down toward the everyday minimum before you treat the pool as back to normal. Keep swimmers out while it is still at a shock level. That is operating practice, not a medical rule written for your family.

pH should be in the 7.4 to 7.6 area before and during the hold so you are not shocking at 8.0 and wondering why it is slow. [pH and chlorine](/learn/ph-and-chlorine) is the reason.

## Green, mustard, and black are not the same job

A swamp-green pool is usually green algae plus a filter problem. Follow [clearing a green pool](/learn/clear-a-green-pool). Mustard algae brushes up like pollen and comes back if you stop early. [Mustard algae](/learn/mustard-algae) is its own page. Black spots that stay rooted in plaster need brushing or scraping plus time. [Black algae](/learn/black-algae) does not yield to one evening of dichlor.

Prevention, after you are done, is boring and effective: the CYA floor, circulation, and brushing. [Algae prevention](/learn/algae-prevention) is that routine. [Phosphates](/learn/phosphates) are a later question, not the opening move.

## Weather around here

Shock in the evening if you can, so the sun is not spending the chlorine as fast as you add it. You will still lose some. A heat wave in July means more top-ups, not a weaker target. After a storm, test before you shock. Sometimes you only lost a little chlorine. Sometimes the pool is full of leaves and you are about to hold a SLAM for real. [After rain](/learn/after-rain-and-storms) is the order.

${services}

## Frequently asked questions

### Can I swim right after shocking?
Wait until free chlorine is back near the everyday target for your CYA and the water is clear. The bottle's "swim in 15 minutes" line is marketing for a light dose, not for a SLAM hold.

### The chlorine will not stay up. What is wrong?
CYA may be very high, the sun plus algae demand may be faster than your doses, or the filter is off. Confirm CYA, brush, run the filter, and dose to the tested loss. A cell alone will not hold a SLAM.

### Is "non-chlorine shock" the same thing?
Potassium monopersulfate can oxidize some waste and will not give you a free-chlorine hold. It does not replace chlorine for killing algae. If you use it, follow the label, and still test free chlorine.
`.trim(),
  },
  {
    slug: "algae-prevention",
    title: "How to Keep Algae Out of a Pool",
    description:
      "The circulation, chlorine, and brushing habits that prevent green, mustard, and black algae in a New Jersey summer.",
    category: "treatment",
    order: 2,
    related: ["how-to-shock-a-pool", "clear-a-green-pool", "weekly-pool-maintenance"],
    calculators: ["chlorine"],
    serviceAngle:
      "Prevention is what weekly service is for. Openings set the first numbers. Closings keep a live bloom from sitting under the cover all winter.",
    markdown: `
Algae is a sanitation and circulation failure that the sun and the yard are happy to help. New Jersey gives it pollen in May, long days in July, and leaf litter in September. You do not prevent it with a weekly algaecide and a chlorine reading you have not taken. You prevent it by keeping free chlorine at least about 7.5% of CYA, keeping the water moving, and not letting a film sit on the walls.

The treatment pages are for when that already failed: [green pools](/learn/clear-a-green-pool), [mustard](/learn/mustard-algae), and [black algae](/learn/black-algae). [How to shock](/learn/how-to-shock-a-pool) is the hold if you are catching it early and the water is only dull.

## Chlorine has to match stabilizer

A 1 to 3 ppm habit is prevention only when CYA is very low. Most outdoor pools here are not in that condition by July, especially if tabs are the sanitizer. At 40 ppm CYA, think about 3 ppm as a floor. At 70 ppm on a salt pool, think about 5 ppm. The [chlorine calculator](/tools/chlorine) prints the floor when you enter CYA. If you cannot hold that floor, the pool is not "stable." It is waiting.

pH above 7.8 makes the same chlorine slower. Keep 7.4 to 7.6. [pH and chlorine](/learn/ph-and-chlorine) is the short version.

## Circulation and the filter

Algae starts in still corners: steps, a ladder, behind a light, a spa that shares water and never runs. Brush those spots on the weekly lap described in [weekly maintenance](/learn/weekly-pool-maintenance). Run the pump long enough to turn the water over. A common residential aim is to circulate the full volume in about 8 to 12 hours, longer and slower on a variable-speed pump rather than a short blast at full speed. There is no single legal runtime for a backyard pool in every town. There is a practical one: the water should not sit.

Clean the filter when pressure is up about 8 to 10 psi from the clean baseline. A dirty filter is a prevention failure even when the jug of chlorine is full. [Filter care](/learn/filter-care) covers sand, cartridge, and DE.

## The yard and the weather

Fertilizer, dirt, and leaves are food and shade. Keep them out. After a storm, test chlorine the same day. [Rain aftermath](/learn/after-rain-and-storms) is a checklist, not a suggestion to wait for the next weekly stop. A cover on a pool you are not using that week blocks a surprising amount of pollen. [Covers](/learn/pool-covers) explains mesh versus solid so you do not trap a bloom underneath a cover you cannot see through.

Phosphate removers are optional insurance after the basics are true, not a replacement for them. [Phosphates](/learn/phosphates) is the nuance. An algaecide with a label can be a helper during a known high-risk week. It is not the sanitizer. Follow the label. Do not stack it with a shock in one bucket.

## Salt cells and tabs

A generator prevents algae only while it is actually making a residual you have tested. Cold water in May, a tripped flow switch, or a scaled cell means you are on liquid chlorine whether you planned to be or not. [Saltwater care](/learn/saltwater-pool-care) is that handoff. Tabs prevent algae until CYA climbs so high that the same tab can no longer keep the minimum. Test CYA monthly in summer if tabs are your program. [Stabilizer](/learn/cya-stabilizer) is why.

## Season timing

Open early enough to circulate before the water is warm and green. [The New Jersey season](/learn/nj-pool-season) puts dates on that. Close before you leave 75°F water under a cover with no chlorine plan. A winter bloom is an opening problem you already paid for. [Pool closings](/services/pool-closings) exist so the lines and the water are both handled. [Weekly maintenance](/services/weekly-maintenance) is the midseason version of this page. [Openings](/services/pool-openings) are where prevention starts, with a real test instead of a bag of shock poured in blind.

## The week it usually starts

On our route the first slick shows up in a shaded corner after a hot weekend, a Friday storm, or a filter that was left ten pounds over its clean pressure. Catch it while it is a film and the repair is a brush plus a normal dose. Wait until the water is opaque and you are in a multi-day hold. Walk the steps and the light niche on Sunday evening in July. That five minutes is the whole prevention program for a lot of pools.

${services}

## Frequently asked questions

### Does a salt pool need algaecide?
It needs a free-chlorine residual. Algaecide is optional. If the cell is keeping the CYA floor and you brush, you can skip the extra bottle.

### We brush and the pool still slicks up in the shade.
Confirm the chlorine floor, then add brush time on that wall and check that a return actually moves water there. A dead corner will grow algae at a "fine" average reading.

### Is phosphate removal required for prevention?
No. It is a follow-up when algae returns after chlorine and filtration are already right.
`.trim(),
  },
  {
    slug: "clear-a-green-pool",
    title: "How to Clear a Green Pool",
    description:
      "A practical sequence for green algae: test, brush, hold chlorine, filter, and tell it apart from metal-stained water.",
    category: "treatment",
    order: 3,
    related: ["how-to-shock-a-pool", "algae-prevention", "cloudy-water"],
    calculators: ["chlorine", "pool-volume"],
    serviceAngle:
      "A green opening is common after a warm cover season. We would rather shock and filter it on a scoped visit than have you empty the pool.",
    markdown: `
Green and cloudy almost always means algae, plus whatever the algae has done to your filter. Green and clear, especially with stains on plaster or light-colored hair shifting color, often means metal, usually copper. Those are different jobs. This page is the algae job. If a metal test is positive and the water is transparent, a sequestrant and a sane pH are the conversation, not a week of shock that stains the shell further.

Do not drain an inground pool as the first move. New Jersey water tables, vinyl liners, and the cost of refill water all argue for killing what is in the pool and filtering it. Draining is for extreme CYA or a pool you cannot filter, and it should be planned. [CYA](/learn/cya-stabilizer) explains the high-stabilizer case.

## Get a number before you buy a case of shock

Test free chlorine, pH, and CYA if you can see the tube. If the water is too green for a color match, you can still start circulation and brushing, but you need a FAS-DPD test as soon as the worst of the color drops. Gallons come from the [volume calculator](/tools/pool-volume). The hold level is about 40% of CYA, from the [chlorine calculator](/tools/chlorine) and [how to shock](/learn/how-to-shock-a-pool). If you truly do not know CYA, do not invent 100 ppm and dose forever. Test it. A common outdoor pool is not at zero CYA if it has seen tabs.

Put pH near 7.4 to 7.6 so the hold is not fighting a high pH. [pH and chlorine](/learn/ph-and-chlorine) is why that is not optional.

## The sequence that clears it

1. Clean the baskets and make sure the pump primes. A green pool with an air-locked pump does not circulate. [Pump will not prime](/learn/pump-wont-prime) is the triage.
2. Brush every surface you can reach, including steps and behind ladders. Algae on a wall is not in contact with the dose.
3. Raise free chlorine to the SLAM level with liquid chlorine. Repeat as the test drops. Cal-hypo is a second choice and a bad one if calcium is high.
4. Run the filter. Clean it when pressure climbs. Backwash sand, rinse cartridges, recharge DE with the amount on the filter label. [Filter care](/learn/filter-care) is the detail.
5. Vacuum dead algae. If the filter is overwhelmed, vacuum to waste and watch the water level so you do not suck the pump dry.
6. Keep brushing. Green that "comes back" overnight was often still on the floor.

The water often goes from green to cloudy white or gray before it goes clear. That cloud is dead algae. It is progress if the filter is capturing it. [Cloudy water](/learn/cloudy-water) covers the case where it stalls.

Stop when the water is clear, combined chlorine is under about 0.5 ppm, and free chlorine holds overnight. Then let it fall to the everyday minimum, about 7.5% of CYA, before you call the pool normal. Keep swimmers out during the high hold.

## What makes green pools repeat in this climate

Opening late, after the water has already warmed under a cover, is the spring version. [The season calendar](/learn/nj-pool-season) is the argument for opening while you can still win. Tabs through a green-up add CYA while you are trying to chlorinate, which raises the target you are missing. A salt cell will not slam a swamp, and it may not run at all if the water is still cold. Use liquid chlorine.

Mustard can look like a dull green-yellow and will brush into a cloud that settles back. If the pool clears and a yellow dust returns on the shady wall, switch to the [mustard algae](/learn/mustard-algae) page. Black spots that do not brush off are [black algae](/learn/black-algae), and more shock without brushing will not pry them out of plaster.

After it is clear, prevention is the CYA floor and a brush, written up in [algae prevention](/learn/algae-prevention). [Phosphates](/learn/phosphates) are a reasonable test if it relapses despite that, not the first gallon you pour into a green pool.

${services}

## Frequently asked questions

### Should I add floc and vacuum to waste?
Floc can drop a heavy algae load to the floor so you can vacuum to waste. It also demands that you do not stir the pool afterward, and a bad vacuum job puts the mess back in the water. Filtration is the default. Floc is a tool when the filter cannot catch up, used exactly as the label says.

### How many days will this take?
A lightly green pool can turn in a day or two. A swamp with a dirty filter can take several days of holding chlorine. Anyone who promises a color on a schedule without seeing the water is guessing.

### Is it safe to swim in water that is only a little green?
No. If you can see algae, the sanitizer is not in control. Wait until the water is clear and free chlorine is back at the everyday target.
`.trim(),
  },
  {
    slug: "black-algae",
    title: "Black Algae in a Pool",
    description:
      "Why black spots root into plaster, why brushing matters more than a single shock, and what vinyl pools should expect instead.",
    category: "treatment",
    order: 4,
    related: ["how-to-shock-a-pool", "algae-prevention", "clear-a-green-pool"],
    calculators: ["chlorine"],
    serviceAngle:
      "Black algae on plaster is slow work. We would rather brush and hold chlorine on a visit than sell a drain as the first idea.",
    markdown: `
Black algae is the spot that does not brush off with a casual pass. On plaster and gunite it roots into the porous surface. The head of the spot can be killed while the root stays, which is why a single shock evening does not finish the job and why the spots return in the same places. It is less common on vinyl and fiberglass because those surfaces do not give it the same grip, but dark growth on a liner still gets brushed and chlorinated rather than ignored.

It is not the same organism as the green bloom in [clearing a green pool](/learn/clear-a-green-pool), and it is not the yellow dust of [mustard algae](/learn/mustard-algae). Treating all three with the same "shock and walk away" habit is why one of them always comes back.

## What actually removes it

Brush or gently scrape the spots so the chlorine can reach what was protected. A stainless brush is a plaster tool. Do not take a steel brush to a vinyl liner. After the spots are opened up, hold free chlorine at a shock level, about 40% of CYA, the same SLAM idea in [how to shock](/learn/how-to-shock-a-pool). Use liquid chlorine so the hold does not pile on more stabilizer. The [chlorine calculator](/tools/chlorine) sizes each top-up from your gallons and the ppm you still need.

Brush again the next day. Spots that remain get brushed again. This is days, sometimes longer on a rough plaster shell that has been soft for years. Filtration runs the whole time because you are putting debris into the water on purpose. Watch [filter pressure](/learn/filter-pressure).

A labeled algaecide aimed at black algae can be a helper after chlorine is already up. Follow that label. It is not a substitute for the hold, and it does not replace brushing. Do not mix it into a bucket with chlorine or acid.

## Chemistry around the spots

If CYA is very high, the shock level becomes impractical and the roots win by default. Test stabilizer and read [CYA](/learn/cya-stabilizer) before you buy a third case of dichlor, which would make CYA worse. pH near 7.4 to 7.6 keeps the chlorine you do add more willing to work. [pH and chlorine](/learn/ph-and-chlorine) is that limit.

Low calcium and low pH etch plaster and make a rougher home for the next colony. [Calcium hardness](/learn/calcium-hardness) is worth a test while you are in the kit, not because calcium kills algae, but because a failing surface will not stay clean.

## What not to do

Do not drain and acid-wash as a first response. That is a surface procedure with real risk to plaster, to people, and to a shell that should not be emptied casually in a high water table. It is a contractor conversation after brushing and a chlorine hold have honestly failed.

Do not rub the spots and then swim. You just put the growth into the water. The hold is there so that cloud does not reattach.

Do not expect a salt cell to finish black algae. The cell maintains a residual. It does not hold a SLAM by itself, and it may be offline in cool water anyway. [Saltwater care](/learn/saltwater-pool-care) covers that limit.

## After the spots are gone

Keep the everyday free-chlorine floor, about 7.5% of CYA, and brush the old locations for a couple of weeks. [Algae prevention](/learn/algae-prevention) is the habit. On a weekly route, tell the technician where the spots were so those patches get a brush every stop. [Weekly maintenance](/services/weekly-maintenance) is built for that kind of note. If you are opening onto black spots that grew under a warm cover, say so when you book [pool openings](/services/pool-openings). [Closings](/services/pool-closings) should not bury active black algae under a cover for five months if you can still circulate and treat.

${services}

## Frequently asked questions

### Will a chlorine tablet rubbed on the spot work?
People do it. A tab is concentrated trichlor, it is acidic, and it adds CYA to the water around the spot. Brushing plus a measured liquid-chlorine hold is the controlled version. Do not hand-sand a plaster spot into a crater.

### Are the spots black algae or mineral staining?
Stains often wipe differently and do not brush into a green-black cloud. If a stain stays put and a metal test is positive, stop shocking it harder and look at sequestering. If it brushes up and returns in warm weeks, treat it as algae.

### Can black algae spread on toys and floats?
Yes. Anything that sat on the spots should be cleaned and dried, not tossed back in the hour you start the hold. Follow the product label if you use a surface cleaner, and keep it out of the pool water.
`.trim(),
  },
  {
    slug: "mustard-algae",
    title: "Mustard Algae: The Yellow Dust That Comes Back",
    description:
      "How mustard algae differs from pollen and green algae, and why you have to hold chlorine and brush or it resettles overnight.",
    category: "treatment",
    order: 5,
    related: ["how-to-shock-a-pool", "algae-prevention", "clear-a-green-pool"],
    calculators: ["chlorine"],
    serviceAngle:
      "Mustard algae is a brushing and testing problem. If it has already survived one shock, weekly service can hold the follow-through that a single visit cannot.",
    markdown: `
Mustard algae looks like pollen or sand. It is yellow to brown, it brushes into a cloud, and it settles back on the shady wall by morning. Pollen season in New Jersey makes the disguise better. Pollen usually shows up with the trees, sits on the cover and the surface, and does not grow a film on the wall after you have filtered for a week. Mustard algae keeps returning in the same shady places after the pollen is gone. Green algae is the cloudy green of [clearing a green pool](/learn/clear-a-green-pool). Black spots that root into plaster are [black algae](/learn/black-algae). If you treat mustard like ordinary green algae and stop when the water looks acceptable, it is back on Friday.

It is also more chlorine-tolerant than ordinary green algae. A light shock that fixes a dull pool can leave mustard untouched. The hold we use is the same SLAM idea as [how to shock](/learn/how-to-shock-a-pool): free chlorine around 40% of CYA, maintained, not visited once. At 50 ppm CYA that is about 20 ppm. The [chlorine calculator](/tools/chlorine) does the product math. Liquid chlorine is the right product because you may be dosing for several days and dichlor would raise CYA the entire time. [Stabilizer](/learn/cya-stabilizer) is how that trap works.

## A sequence that matches the way it grows

Brush the yellow film off the walls, steps, and light niches before you dose, and brush again every day of the hold. If you only chlorinate the water and leave the film, you are sanitizing the pool and not the colony. Run the filter continuously and clean it when pressure rises. The cloud you brush up is the algae. The filter has to catch it. [Filter care](/learn/filter-care) matters more this week than it did last month.

Some technicians add a mustard-specific algaecide after chlorine is already at the hold, exactly as that label is written, as a helper. Chlorine remains the primary. Do not lead with algaecide and a normal 3 ppm reading.

Anything that can reseed the pool should come out and be cleaned: toys, vacuums that sat on the film, even a robotic cleaner that has been dragging the dust around. [Robotic cleaners](/learn/robotic-pool-cleaners) are useful after the water is holding chlorine, and they are a bus for mustard if you drop them back in dirty.

Test overnight loss. If free chlorine falls hard by morning, you are not done, even if the wall looks better at noon. When the water is clear, the yellow does not return after a brush-free night, and chlorine holds, drop back to the everyday minimum of about 7.5% of CYA. Keep pH at 7.4 to 7.6 during the hold. [pH and chlorine](/learn/ph-and-chlorine) explains the drag from a high pH.

## Pollen, metals, and false alarms

May in Monmouth and Ocean Counties is a pollen month. A yellow skim on the surface that wipes off the tile and does not return as a wall film is probably the trees. Skim, filter, and test chlorine. You do not need a SLAM for oak pollen.

Brown dust that is actually dead algae after a green cleanup will filter out and stay gone if chlorine is maintained. Mustard reappears as a living film. Metals can tint water but do not usually brush up like powder and resettle in a shark pattern on the shady side. When you are unsure, hold the chlorine floor and brush for two days while you watch. If it fades and stays gone, it was debris. If it maps itself back onto the same wall, treat it as mustard.

## Staying done

[Algae prevention](/learn/algae-prevention) is the aftercare: the CYA-based chlorine floor, circulation into corners, and a weekly brush. [How often to test](/learn/how-often-to-test) keeps you from declaring victory on a Tuesday strip. Salt cells will not maintain a mustard hold by themselves. Dose liquid chlorine until the hold is over, then let the cell carry the everyday residual if the water is warm enough. [Saltwater care](/learn/saltwater-pool-care) is that handoff.

${services}

## Frequently asked questions

### Will a normal weekly chlorine level prevent it from returning?
Only if that level is actually the CYA minimum and you are brushing. A 1 ppm reading at 60 ppm CYA will not keep mustard out.

### Can I vacuum mustard to waste and skip the hold?
Vacuuming removes what you can see. It does not replace a chlorine hold. Do both if the filter is getting overwhelmed, and watch the water level.

### Is mustard algae harmful?
Treat it as a failed sanitizer, which means the pool is not ready to swim. This page is about clearing water, not about diagnosing anyone who already swam.
`.trim(),
  },
];
