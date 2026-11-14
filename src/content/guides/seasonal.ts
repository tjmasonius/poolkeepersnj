import type { GuideInput } from "@/lib/guide-types";

const services = `Pool Keepers books these as three different visits, each with a written scope: [pool openings](/services/pool-openings), [weekly maintenance](/services/weekly-maintenance), and [pool closings](/services/pool-closings).`;

export const seasonalGuides: GuideInput[] = [
  {
    slug: "pool-opening-checklist",
    serviceTypes: ["open"],
    title: "Pool Opening Checklist for New Jersey",
    description:
      "A spring opening sequence for NJ pools: cover, freeze damage, start-up, and the first chemistry tests before Memorial Day.",
    category: "seasonal-care",
    order: 1,
    related: ["nj-pool-season", "winterizing-a-pool-in-nj", "water-chemistry-basics"],
    calculators: ["pool-volume", "chlorine"],
    serviceAngle:
      "An opening visit follows this order: cover, equipment, water, then chemistry. Weekly service starts after the pool is actually swimming.",
    markdown: `
Open the pool when you can run the pump and stay ahead of warming water, not when the first hot Saturday surprises you. In Monmouth, Ocean, Middlesex, and Mercer Counties that is often mid-April through May. Inland Mercer and western Middlesex tend to move first. The shore can lag when the wind stays cold. Memorial Day is a social deadline, not a chemistry one. The wider calendar is [the New Jersey season](/learn/nj-pool-season). If the water is already green under the cover, use this list and then [clearing a green pool](/learn/clear-a-green-pool).

## Before the cover comes off

Pump standing water and leaves off a solid cover so you are not dumping a winter's debris into the pool. A mesh safety cover gets cleaned as it comes off, not stored wet and filthy. Rinse with water. Do not wash covers with dish soap. [Pool covers](/learn/pool-covers) explains why soap becomes next month's foam. Let the cover dry and store it where mice and a wet basement floor are not the storage plan.

Inspect the waterline before you fill or start. A liner that slipped, a tile crack, or a missing faceplate screw is easier to see now.

## Equipment, with freeze damage in mind

Winter in this state breaks housings that still held water. At the pad:

1. Reinstall return fittings, skimmer baskets, gauges, and drain plugs. Look for cracked pump lids, split unions, and a filter tank that weeps as soon as it sees pressure.
2. Open valves in the direction you mean to circulate. A closed return is how a "dead pump" story starts. If it will not catch prime, stop and use [pump will not prime](/learn/pump-wont-prime).
3. Fill to the middle of the skimmer opening. A low level on day one sucks air and burns a seal.
4. Prime and start the pump. Walk the pad for leaks for several minutes. Note the clean filter pressure. That number is the baseline in [filter pressure](/learn/filter-pressure).
5. Leave the heater off until flow is proven. A heater that will not fire later has its own list in [heater will not fire](/learn/heater-wont-fire).

Salt cells often will not produce near 60°F. Plan on liquid chlorine for the first weeks even if you own a generator. [Saltwater care](/learn/saltwater-pool-care) is that handoff. Do not add salt because the cold cell says the level is low. Test it.

## Chemistry, in an order

Know gallons, from the [volume calculator](/tools/pool-volume) if last year's number was a guess. Test CYA, alkalinity, pH, calcium, and free chlorine before you add a grocery bag of anything. CYA survived the winter if you did not drain. [Water chemistry basics](/learn/water-chemistry-basics) has the ranges. [Stabilizer](/learn/cya-stabilizer) is why you test it before you add it.

Set alkalinity, then pH near 7.4 to 7.6, then free chlorine. If the water is dull or green, hold a shock level as in [how to shock](/learn/how-to-shock-a-pool) using the [chlorine calculator](/tools/chlorine). Brush, vacuum, and run the filter until it clears. A clarifier is not step one.

## The first week

Empty baskets daily while pollen and cover debris are heavy. Confirm the water level each evening. Re-test chlorine. A variable-speed pump can run longer and slower once you know the pressure baseline. [Weekly maintenance](/learn/weekly-pool-maintenance) takes over when the water is honestly swimmable.

## What we see on the first visit

The openings that go smoothly are the ones where the plugs are in a bag on the heater, the cover dried last fall, and nobody added a "opening kit" before we tested. The hard ones are a cracked pump lid from a freeze, a filter full of last year's DE, and CYA already at 80 because the tab floater ran until October. Walk the pad with a flashlight before you fill. A hairline crack in a lid is cheaper to see dry. Write the clean filter pressure down the hour the pump catches prime. You will want that number in July, and you will not remember it.

${services}

## Frequently asked questions

### Can I open in March?
You can uncover and circulate during a warm March spell if you are ready to keep testing and a freeze is not about to hit open plumbing. Most of our route waits until the equipment can stay in service. [Winterizing](/learn/winterizing-a-pool-in-nj) is what you undo, and you do not want to redo it for one warm week.

### The water is black under the cover. Do I drain?
Not as the first move. Leaves stain and algae blooms. Circulate, test, and filter. Draining an inground pool flat is a separate, planned decision.

### Do I add the same chemicals as last opening?
No. Test. Last year's CYA, calcium, and salt are still in the water unless you exchanged a lot of it.
`.trim(),
  },
  {
    slug: "pool-closing-checklist",
    serviceTypes: ["close"],
    title: "Pool Closing Checklist",
    description:
      "A fall closing sequence: balance, water level, blown lines, drained equipment, and the cover, timed for a New Jersey freeze.",
    category: "seasonal-care",
    order: 2,
    related: ["winterizing-a-pool-in-nj", "pool-covers", "pool-opening-checklist"],
    calculators: ["chlorine"],
    serviceAngle:
      "A closing visit is this checklist done while the water can still circulate. It is not a weekly stop with a cover pulled over the top.",
    markdown: `
Closing is the last day the pump can still protect you. In our counties that window is often late September through late October, when the water holds under about 60 to 65°F and before a hard freeze. The shore stays swimmable longer than inland Mercer. Use the water temperature, not a group text about who already closed. [Winterizing a pool in New Jersey](/learn/winterizing-a-pool-in-nj) is the freeze reasoning behind this list. [The season calendar](/learn/nj-pool-season) is the month-by-month view.

Do not close a pool that is still in the upper 70s if you can wait. Algae grows under a cover in warm water, and you will open onto it. If a trip forces an early cover, leave a chlorine plan and be honest that spring will be harder.

## While the pump still runs

Test pH, alkalinity, and free chlorine. Put pH in the 7.4 to 7.6 band and alkalinity in range so winter water is not etching or scaling while it sits. [Water chemistry basics](/learn/water-chemistry-basics) has the bands. Brush and vacuum so you are not sealing leaves into the pool. Clean or backwash the filter so you are not storing a dirty tank of organic debris. [Filter care](/learn/filter-care) is the version for sand, cartridge, and DE.

Add a closing dose of chlorine while the water can mix. Use the [chlorine calculator](/tools/chlorine). Liquid chlorine will not add a last bump of CYA on the way out. A winter algaecide, if you use one, goes in according to its label after chlorine is circulating, not mixed in the same bucket. Then run the pump long enough to distribute both.

Lower salt-cell output to zero and let liquid chlorine finish the season if the water is already near the cell's cutoff. [Saltwater care](/learn/saltwater-pool-care) covers that.

## Water level and the cover you actually own

Mesh safety covers usually shed rain and often want the water near normal operating level so the cover is not a trampoline over an empty hole. Solid winter covers want the water below the returns and the skimmer, plus a cover pump for rain and snowmelt. [Pool covers](/learn/pool-covers) is the distinction. Lowering the water is not optional on a solid cover, and dropping it too far on a mesh cover is how the cover sags into the pool.

## Lines and the pad

Blow lines from the pad until air, not a stream of water, comes from each return, then plug those returns. Protect the skimmer line. Pool antifreeze, the propylene-glycol product made for pools, can go into lines that need it after they are blown. Automotive antifreeze does not belong in pool plumbing.

Remove drain plugs from the pump, filter, heater, and chlorinator. Store the plugs where April-you will find them, or leave them in a bag on the equipment. Tilt or store the pump if that is how your pad survives a freeze. Follow the heater manual for draining the exchanger. A heater full of water is a cracked exchanger in January. [Heater will not fire](/learn/heater-wont-fire) in the spring is often this step skipped.

Do not leave a multiport valve in a position that traps water if the manufacturer says to set it between positions for winter. Read the label on the valve.

## After the cover is on

Pump solid covers after rain and wet snow so they do not collapse into the pool. Glance at mesh covers for leaves that will stain and for standing water that means the mesh is clogged. You are not reopening. You are keeping the cover from becoming the failure. The undo list is the [opening checklist](/learn/pool-opening-checklist).

## Leave a map for spring

Write down where the plugs went, which valve was set between positions, and whether the heater drains were opened. April is a long time from October, and a different person may open the pool. A photo of the pad after the plugs are out is enough. If a salt cell came off, note where it was stored so it is not still in a bucket of water in the garage. That note is part of the close. It is also the difference between a one-hour opening and a morning of searching.

${services}

## Frequently asked questions

### Can I skip antifreeze if I blew the lines well?
A thorough blow and plugs are the main defense. Antifreeze is extra insurance in lines that can hold a pocket of water. It is not a substitute for draining the pump and heater. Use pool antifreeze only.

### Should I leave the salt in?
Yes. You are not draining the pool for a normal close. Test salt in the spring before you add any. The [salt calculator](/tools/salt) is for that day, not for dumping salt into 55°F water in October.

### What if the pool is still green?
Clear it first if you still have warm days and a working filter. Closing on a live bloom stores the problem. If the season has already frozen your schedule, say so when you book the close so spring labor is not a surprise.
`.trim(),
  },
  {
    slug: "winterizing-a-pool-in-nj",
    serviceTypes: ["close"],
    title: "Winterizing a Pool in New Jersey",
    description:
      "Freeze timing for shore and inland NJ, what has to be drained, and how mesh and solid covers change the winter plan.",
    category: "seasonal-care",
    order: 3,
    related: ["pool-closing-checklist", "pool-covers", "nj-pool-season"],
    calculators: ["chlorine"],
    serviceAngle:
      "Winterizing is the closing visit. We time it off water temperature and the forecast, then leave the pad drained so a cold week does not crack a housing.",
    markdown: `
Winterizing is the reason a New Jersey closing is different from a closing in a state that does not freeze. The failure we are preventing is water trapped in a pipe, a pump volute, a filter tank, a heater exchanger, or a salt-cell housing when the temperature drops below freezing and stays there. A cracked housing shows up in April as a leak, a pump that will not prime, or a heater that will not fire. The step list is the [closing checklist](/learn/pool-closing-checklist). This page is why the list is not optional here.

## When the freeze actually arrives

Do not pick a single Saturday in September for every town we serve. Ocean County and the Monmouth shore hold ocean-moderated air later into the fall. Inland Mercer, western Monmouth, and parts of Middlesex see the first hard freeze earlier, sometimes well before the shore has given up swimming. A practical trigger is water that stays under about 60 to 65°F, plus a forecast that is done pretending it is still summer. Algae goes quiet in cold water. It does not require you to leave the plumbing full.

Closing while the water is still warm, because a calendar said so, traps a growing season under the cover. Waiting until the lines have already frozen once is the other mistake. [The season guide](/learn/nj-pool-season) puts those months in order. If you travel in October, book the close before the trip, not after the first cold photo from the neighbor.

## What "blown and drained" has to include

Returns get air until they stop spitting water, then plugs. The skimmer line gets the same respect. A line that "mostly" blew still holds a pocket at a low spot in the trench. Pool antifreeze, not automotive coolant, is for those pockets after the blow. It is insurance, not the whole job.

The pump plug, the filter drain, the heater drains, and any chlorinator or cell housing that can hold water all get opened. Leave the plugs out or bag them. A plug reinstalled "so we don't lose it" into a wet housing is how the housing splits. Heaters need the manual's drain procedure. We do not bypass safety switches to prove a heater works in 40°F air.

Salt cells come off or get drained according to the manufacturer. Output is already at zero because cold water production has usually stopped. [Salt cell errors](/learn/salt-cell-errors) in the spring are sometimes just a cell that spent January full of water and ice.

## Covers change the water level

A solid cover needs the water below the fittings you plugged and a pump for precipitation. Snow and a March rain will put hundreds of gallons on that cover. A mesh safety cover passes water and still needs debris off the top so it does not sag into a leaf soup. [Pool covers](/learn/pool-covers) is the fuller comparison. Neither cover is a substitute for watching a child around the pool. A cover is equipment.

Through the winter, look at the cover after heavy weather. Pump solid covers. Do not chip ice off a cover with a shovel if you can avoid slicing it. A midwinter warm spell is not an invitation to start the pump unless you are ready to winterize again before the next night.

## Chemistry you cannot fix in January

Balance pH and alkalinity at the close. You will not be circulating acid under a cover in a freeze. Free chlorine at the close buys you a quieter winter. Size that last dose with the [chlorine calculator](/tools/chlorine) while the pump can still mix it. It will not still be at target in March, and that is expected. [How often to test](/learn/how-often-to-test) stops being a weekly chore once the pool is properly out of service. If the cover comes off in spring onto stained, dull water, the [opening checklist](/learn/pool-opening-checklist) plus a real test beats a drain.

## Shore versus inland, in practice

A pool in Lavallette or Spring Lake can still be in the mid-60s when a pool in Hamilton or Robbinsville has already spent a week in the 50s. Book the inland close first if you own both, and do not copy a shore neighbor's date if you live twenty miles west. Wind matters as much as the map. A clear, calm week is not the same as a northwest blow that drops the water overnight. Look at the water thermometer on the morning you decide, then look at the overnight forecast for the next ten days. One cold night with drained equipment is fine. One cold night with full equipment is the repair.

${services}

## Frequently asked questions

### We had one cold night. Is it too late to winterize?
If the lines did not already split, winterize now before the next stretch. A single light frost is a warning, not proof the plumbing survived the season.

### Can I run the pump all winter?
Some mild weeks you could, and then you are babysitting a freeze forecast. Our route winterizes. An open, running pad through January is a different kind of risk, including a power loss on a cold night.

### Does a mesh cover mean I can skip blowing lines?
No. The cover type changes the water level and the rain plan. It does not change the water inside the equipment.
`.trim(),
  },
  {
    slug: "nj-pool-season",
    serviceTypes: ["open", "close", "weekly"],
    title: "The New Jersey Pool Season, Month by Month",
    description:
      "When pools open, peak, and close in Monmouth, Ocean, Middlesex, and Mercer Counties, based on water temperature rather than a single date.",
    category: "seasonal-care",
    order: 4,
    related: ["pool-opening-checklist", "pool-closing-checklist", "weekly-pool-maintenance"],
    calculators: ["chlorine", "salt"],
    serviceAngle:
      "The route follows this season. Openings stack up in April and May, weekly care carries summer, and closings stack up once the water gives up.",
    markdown: `
A New Jersey pool season is shorter than the marketing and longer than the weeks you actually swim. The chemistry does not change by county. The temperature does. Use this as a planning guide for Monmouth, Ocean, Middlesex, and Mercer, and use a thermometer when the month and the water disagree.

## March

Equipment weather, not swim weather. Order parts you already know are cracked. Do not uncover a pool for a single warm weekend if you cannot winterize again before a freeze. Leaves from last fall that are still on a mesh cover can come off on a dry day. [Winterizing](/learn/winterizing-a-pool-in-nj) is still in force.

## April

Many pools on our route open in the second half of April, earlier inland than on the immediate shore when the wind is up. Water is cold. Algae is slower and not absent. Salt cells often will not produce. Liquid chlorine, a clean filter, and a full test are the job. [Opening checklist](/learn/pool-opening-checklist) is the sequence. Pollen starts. Do not add CYA until you have tested it.

## May

This is the opening crush and the first real warm-ups. Memorial Day is when a lot of families expect to swim. If the pool is still covered on the Friday before, you are late relative to that goal, not relative to physics. Test CYA, alkalinity, calcium, and salt before the first party. [How often to test](/learn/how-often-to-test) shifts from "whenever I walk by" to a real cadence. Generators may start producing on the warmer weeks and quit again after a cold front. Keep liquid chlorine in the shed.

## June

Heat arrives and chlorine demand climbs. Tab-only pools start stacking CYA. This is the month to notice that, not August. [Stabilizer](/learn/cya-stabilizer) and the [chlorine calculator](/tools/chlorine) belong together. Brush weekly. [Algae prevention](/learn/algae-prevention) is cheaper than a green week in July.

## July and August

Peak season. Test free chlorine and pH several times a week. Storms drop both chlorine and, on salt pools, salt. [After rain](/learn/after-rain-and-storms) is a same-day habit. Parties, sunscreen, and a dirty filter show up as cloudy water. [Cloudy water](/learn/cloudy-water) splits algae from filtration. Heaters and salt cells work hardest now and scale if pH and calcium are ignored. [Weekly maintenance](/learn/weekly-pool-maintenance) is the rhythm that keeps this month boring.

## September

Still swimmable, especially near the shore, with cooler nights. Demand drops. This is a good month to partially drain and refill if CYA or calcium is too high, while you are still circulating and before the close. Leaves start. Empty baskets before they become a clogged pump. [Pump will not prime](/learn/pump-wont-prime) in September is often a basket, not a failed motor.

## October

Closing window. Inland towns first, shore later, water under about 60 to 65°F as the trigger. [Closing checklist](/learn/pool-closing-checklist) and [winterizing](/learn/winterizing-a-pool-in-nj) are the same job described two ways. Do not wait for a hard freeze to prove the pipes were full. A late swim on a warm shore afternoon does not reopen the season. It means you test chlorine or you stay covered.

Pollen, school calendars, and rental turnovers pile onto the same weeks. If the house is vacant in August, someone still has to test or the pool will not care that you are away. Tell the route. A skipped month in July is not a cosmetic problem. It is how a [green pool](/learn/clear-a-green-pool) starts under a solar blanket nobody lifted. If you are away, the minimum is a person who can empty a basket, glance at the pump, and add chlorine from a test. A neighbor with a key and no kit is not that person. Put the kit and the gallons where they can find both.

## November through February

Cover on, equipment drained, pump off. After rain or snow, pull water off solid covers. Do not break ice with a sharp tool. You are not balancing water. You are protecting the cover and the pad. A warm January week is not an opening.

${services}

## Frequently asked questions

### Is Memorial Day the required opening?
No. It is a common family deadline. Open when you can circulate and keep the water from going green, which is often earlier.

### Why does my neighbor close two weeks before I do?
They may be inland, or they may be watching a forecast you have not seen. Compare water temperature, not pride. A 58°F pool in Freehold and a 66°F pool in Point Pleasant on the same day are both telling the truth.

### Can I keep a salt cell running into November?
Only if the water is still warm enough for that model and you are willing to winterize the moment a freeze is forecast. Most cells have already stopped. Dose liquid chlorine or close.
`.trim(),
  },
  {
    slug: "weekly-pool-maintenance",
    serviceTypes: ["weekly"],
    title: "A Weekly Pool Maintenance Routine",
    description:
      "The weekly lap that keeps a New Jersey pool clear: baskets, brush, water level, filter pressure, and the two tests that cannot wait.",
    category: "seasonal-care",
    order: 5,
    related: ["how-often-to-test", "algae-prevention", "filter-pressure"],
    calculators: ["chlorine", "salt"],
    serviceAngle:
      "This is the homeowner version of a route stop. Our weekly visit follows the same bones, with the scope written so filter cleans and repairs are not silently included.",
    markdown: `
Weekly maintenance is a lap around the pool, not a chemistry degree and not a repair. Done the same way each week, it prevents the green Monday that ruins a Saturday. In July you will still test more often than once. [How often to test](/learn/how-often-to-test) is that faster clock. This page is the physical round that should happen even in a quiet week.

## The lap

Skim the surface. Empty the skimmer basket and the pump basket. A packed basket is the start of [a pump that will not prime](/learn/pump-wont-prime). Brush the walls, steps, and the waterline. Algae begins as a slick film in the shade. [Algae prevention](/learn/algae-prevention) is mostly this brush plus a real chlorine number.

Check the water level at the middle of the skimmer opening, or at the tile line you already trust. Low water sucks air. High water after a storm wastes sanitizer over the edge and can flood a skimmer. [After rain](/learn/after-rain-and-storms) covers the high-water case. A slow, steady drop that is more than evaporation needs the [bucket test](/learn/pool-leaks).

Glance at the filter pressure and compare it with the clean baseline you wrote down at opening. About 8 to 10 psi of rise means clean or backwash. [Filter pressure](/learn/filter-pressure) and [filter care](/learn/filter-care) are the follow-through for sand, cartridge, and DE.

Vacuum if you can see debris the brush pushed into piles. A robot can do the floor on its own schedule. It does not test the water and it does not empty the skimmer basket. [Robotic cleaners](/learn/robotic-pool-cleaners) fit on this lap as a tool, not as the whole routine.

## The tests that belong on the same lap

Free chlorine and pH, every week at a minimum, and more often in a heat wave. The everyday chlorine floor is about 7.5% of CYA. The [chlorine calculator](/tools/chlorine) turns a gap into a dose once you know gallons. pH sits at 7.4 to 7.6. If those two are the only tests you ever run, you will still be ahead of a pool that is only looked at when it turns.

Salt, on a generator pool, monthly and after big rain. Use a kit, then the [salt calculator](/tools/salt) if you are low. The cell display is not the weekly test. [Saltwater care](/learn/saltwater-pool-care) says why. Alkalinity weekly or any week the pH will not sit. CYA and calcium monthly in season. The full set is [water chemistry basics](/learn/water-chemistry-basics).

Run the pump long enough to circulate the volume. Many residential pools do well turning the water over in about 8 to 12 hours, longer at low speed on a variable-speed pump. A one-hour blast does not count as the week.

## What the weekly lap is not

It is not an opening and it is not a closing. Those are [the opening checklist](/learn/pool-opening-checklist) and [the closing checklist](/learn/pool-closing-checklist). It is not a heater rebuild or a cell acid wash. It is not the day you add four products because a store printout said so. One correction, circulate, retest.

In a heat wave, add a second chlorine and pH check midweek even if the lap itself stays on Saturday. Baskets in August fill faster than they did in June, and a skimmer basket that looks "fine" on Monday can be a mat by Thursday after a storm. Keep a brush where you will actually use it. The robot does not reach the waterline film that becomes the slick you notice too late. If you only have twenty minutes, spend them on baskets, the brush, the water level, and the two tests. Vacuuming can wait a day. A zero chlorine reading cannot. Write the clean filter pressure on a piece of tape by the gauge so the weekly glance takes five seconds.

If Pool Keepers is already on the route, your lap between visits is baskets, a glance at the level, and a test after a party. [Weekly service](/services/weekly-maintenance) is the scheduled version of the full lap. [Openings](/services/pool-openings) start it. [Closings](/services/pool-closings) end it before a freeze makes the weekly round irrelevant.

${services}

## Frequently asked questions

### How long should the weekly visit take a homeowner?
A small pool with a robot and a clean filter can be well under an hour if you are not fighting algae. A green pool is no longer a weekly lap. It is [a clear-up](/learn/clear-a-green-pool).

### Can I skip brushing if the robot ran?
The robot does not always reach the waterline, steps, and light niche the way a brush does. Brush those even in a quiet week.

### Do I add chlorine every week no matter what?
No. Add it when the test is under the target. Adding on a schedule without a test is how CYA and chlorine both end up in the wrong place.
`.trim(),
  },
  {
    slug: "after-rain-and-storms",
    serviceTypes: ["weekly"],
    title: "Pool Care After Rain and Storms",
    description:
      "What heavy rain, wind, and a thunderstorm change in a New Jersey pool, and the order to test, lower the water, and restart equipment.",
    category: "seasonal-care",
    order: 6,
    related: ["how-often-to-test", "cloudy-water", "algae-prevention"],
    calculators: ["chlorine", "salt"],
    serviceAngle:
      "After a storm we expect chlorine to be the first casualty. If you are on weekly service, do not wait for the next stop when the water is full of leaves and the level is over the tile.",
    markdown: `
A New Jersey thunderstorm is a chemistry event and a debris event. Rain dilutes free chlorine, salt, and CYA slightly. Wind delivers leaves, dirt, and pollen. A long soak raises the water level, sometimes over the top of the skimmer. Lightning is a reason to be out of the water and off the pad until the storm has actually left. That is ordinary storm safety, not a medical opinion.

Do the recovery in an order. Do not shock blindly before you can see the basket and the water level.

## The first hour the storm is gone

Stay out of the water until you are comfortable being on the deck. Skim what you can. Empty the skimmer and pump baskets before you start or restart the pump. A basket packed with maple seeds is how seals burn. If the pump lost prime or you shut it off, follow [pump will not prime](/learn/pump-wont-prime) instead of dry-running it.

If the level is above the tile or pouring into an overflow you did not intend, remove water until you are back at the middle of the skimmer. A solid cover that held a pond needs a cover pump before you even think about the pool underneath. [Covers](/learn/pool-covers) and [winterizing](/learn/winterizing-a-pool-in-nj) both care about that weight in the off-season. In summer, high water wastes the chlorine you are about to add.

Look at the pad. A tripped breaker, a soaked timer, or a heater that tried to fire with no flow should be left off until flow is normal. [Heater will not fire](/learn/heater-wont-fire) starts with "is there flow," and the answer after a storm is sometimes no.

## Then test

Free chlorine first, then pH. Rain plus organic debris often drops chlorine hard. If you know CYA, the floor is still about 7.5% of that CYA. Use the [chlorine calculator](/tools/chlorine). If the water is only a little low and still clear, a normal dose and a day of circulation may be the whole repair. If it is dull or green, go to [how to shock](/learn/how-to-shock-a-pool) and [cloudy water](/learn/cloudy-water) rather than a clarifier.

On a salt pool, test salt after a multi-inch rain. Dilution is real. The cell may also throw a low-salt code because the water cooled or the flow was interrupted. Confirm with a kit before you add a bag. The [salt calculator](/tools/salt) is there when the test, not the code, says you are low. [Salt cell errors](/learn/salt-cell-errors) is the code side.

CYA and calcium barely move in one storm unless the rainfall was extreme or you removed a lot of water on purpose. You do not need a full panel every time it drizzles. You do need chlorine.

## The next day

Brush, especially if dirt washed in along a deck joint. Check filter pressure. Storms load filters. [Filter pressure](/learn/filter-pressure) tells you whether to clean now or wait. Run the pump long enough to turn the dirty water over. A robot can pick up the sand that settled. Rinse its debris bin so you are not painting the floor with it. [Robotic cleaners](/learn/robotic-pool-cleaners) after a storm are useful once large sticks are out of the pool. Sticks and a robot fight, and the robot loses.

If a wet spot appeared in the yard only after the storm and does not match a downspout, note it and read the [bucket test](/learn/pool-leaks) once the weather is stable. Do not diagnose a shell leak in the rain.

[Algae prevention](/learn/algae-prevention) fails in the 48 hours after a storm more often than it fails on a random Wednesday. [Weekly maintenance](/learn/weekly-pool-maintenance) should not be postponed just because the scheduled day is three days away and the pool is full of leaves now.

## Power and the pad

Storms here also drop power. A pump that was mid-prime when the power died may need the lid cracked and refilled before it will catch again. Do that only after you have confirmed the water level and the baskets. If a breaker tripped, reset it once. If it trips again, leave it off. A soaked timer box is not something to open while you are standing in a puddle. Note it and wait for a dry pad or a technician. The chemistry can wait an hour. A shorted clock should not.

${services}

## Frequently asked questions

### Does rain add chlorine?
No. It dilutes what you had and the debris consumes more. Test and add if the reading is under the target.

### Should I shock after every thunderstorm?
No. Test. A brief shower on a clear, well-chlorinated pool may need nothing but a skim. A gully-washer with leaves needs a test and often a real dose.

### The water is over the coping. Can I just run the pump?
Get the level down to the skimmer range first so you are circulating, not flooding the deck equipment. Then test.
`.trim(),
  },
];
