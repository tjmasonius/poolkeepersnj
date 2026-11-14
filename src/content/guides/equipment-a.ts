import type { GuideInput } from "@/lib/guide-types";

const services = `Equipment checks that belong on a visit are scoped separately from chemistry. Start with [weekly maintenance](/services/weekly-maintenance), and use [pool openings](/services/pool-openings) or [pool closings](/services/pool-closings) when the whole pad is coming in or out of a freeze.`;

export const equipmentAGuides: GuideInput[] = [
  {
    slug: "pool-equipment-basics",
    title: "Pool Equipment Basics: Pump, Filter, and Heater",
    description:
      "What the pump, the three filter types, and the heater each do, and which problems are flow problems before they are part problems.",
    category: "equipment",
    order: 1,
    related: ["filter-care", "pump-wont-prime", "heater-wont-fire"],
    calculators: ["pool-volume"],
    serviceAngle:
      "We work on the brands already on Jersey pads, including Hayward, Pentair, and Jandy. The quote names the repair. It does not hide it inside a cleaning visit.",
    markdown: `
The pad has one job: move water, clean it, and sometimes heat it. Almost every "broken" complaint we hear starts as flow. No flow, and the pump cavitates, the heater refuses to fire, the salt cell faults, and the filter pressure reading means nothing. Learn the three boxes before you replace any of them.

Gallons still matter, because turnover is "how long to circulate this much water." The [volume calculator](/tools/pool-volume) is the volume half. A common residential aim is to turn the full volume over in about 8 to 12 hours. A variable-speed pump does that more quietly and cheaply at low speed for a long run than a single-speed pump does in a short blast. There is not one runtime written into every town's rules for a backyard pool. There is a practical test: the water should look the same on Monday as it did on Saturday, given a sane chlorine reading.

## The pump

The pump pulls from the skimmers and main drain and pushes toward the filter and the returns. The lid, the lid o-ring, and the unions on the suction side have to be airtight. Any air leak shows up as bubbles in the lid or a pump that loses prime. The basket inside the pump protects the impeller. It is not optional, and it is not a second trash can you empty once a season. [Pump will not prime](/learn/pump-wont-prime) is the triage when it spins and moves nothing.

Do not run a pump dry to "see if it starts." A minute of troubleshooting is different from a half hour of a hot seal. If the motor hums and does not turn, or the breaker trips immediately, stop. That is a technician, not another reset.

## The filter

Three types cover almost every residential pool we see.

Sand is simple and relatively coarse. You backwash when pressure rises, and every few years the sand itself is tired or channeled. Cartridge filters catch finer debris, do not backwash, and want the cartridge rinsed and periodically degreased. DE filters catch the finest of the three, use a powder recharge after a backwash, and punish a torn grid by putting that powder back in the pool.

[Filter care](/learn/filter-care) is the how-to for each. [Filter pressure](/learn/filter-pressure) is how you know the day has arrived. A filter does not remove dissolved CYA, salt, or calcium. It removes particles. Cloudy water that is actually dissolved scale will not clear no matter how fine the grid is. [Cloudy water](/learn/cloudy-water) makes that split.

## The heater

Gas heaters and heat pumps both demand flow before they make heat. A gas heater in New Jersey will still fire on a cool evening if the gas, the ignition, and the flow switch agree. A heat pump steals heat from the air, so it falls off as April and October nights get cold. It is a summer extender, not a March swimming machine. Scale from high pH and high calcium coats the exchanger and the salt cell alike. [Heater will not fire](/learn/heater-wont-fire) is the safe homeowner checklist. We do not bypass roll-out switches or pressure switches. Those parts are the reason the heater is still on the pad and not in pieces.

## The rest of the pad

A salt cell is a chlorine generator, not a filter. [Saltwater care](/learn/saltwater-pool-care) and [salt cell errors](/learn/salt-cell-errors) belong with chemistry as much as with equipment. A multiport valve sends water through the filter, to waste, or to backwash. The wrong position looks like a dead pump or a pool full of DE. Automation and time clocks only help if the clock actually reaches the pump.

At [opening](/learn/pool-opening-checklist) you prove this whole chain before you heat. At [closing](/learn/pool-closing-checklist) you drain it so a freeze does not do the proving for you. [Winterizing](/learn/winterizing-a-pool-in-nj) is that freeze, written for this climate.

## What to write down

The useful pad notes are small: clean filter pressure, pump speed you actually run, heater model, cell model, and where the drain plugs live in winter. A phone photo of the valve positions at closing saves an opening. None of that replaces a test of the water. It does stop a July visit from starting with "what is normal pressure on this filter?" when the gauge has been ignored since May.

${services}

## Frequently asked questions

### Do I need a bigger pump if the pool is cloudy?
Usually you need a clean filter, a longer runtime, and a chlorine reading at the CYA floor. A larger pump on undersized plumbing is noise and a filter that spikes pressure.

### How often should equipment be replaced?
When it leaks, will not prime, or fails a safety test, not on a rumor about age. Cells and heaters have finite lives. A clear quote beats a preemptive swap.

### Can one visit cover a new heater and a weekly clean?
They are different scopes. Say what you need when you book so the person on the route has the parts and the time.
`.trim(),
  },
  {
    slug: "filter-care",
    title: "Filter Care for Sand, Cartridge, and DE",
    description:
      "How to maintain sand, cartridge, and DE pool filters, when pressure says it is time, and the mistakes that send debris back into the pool.",
    category: "equipment",
    order: 2,
    related: ["filter-pressure", "cloudy-water", "pool-equipment-basics"],
    calculators: ["pool-volume"],
    serviceAngle:
      "A filter clean is its own visit when the weekly scope is skim, brush, and chemistry. We would rather name it than rush a DE recharge at the end of a cleaning stop.",
    markdown: `
The filter is why clear water stays clear after you kill what was growing in it. Sand, cartridge, and DE do the same job at different levels of fineness, and they are cleaned differently. Treating a cartridge like a sand tank, or a DE grid like a cartridge you can rinse forever, is how pressure goes high and the pool stays dull. The gauge that times all three is in [filter pressure](/learn/filter-pressure). A rise of about 8 to 10 psi over the clean baseline is the usual cue. Use the manual's number if it disagrees.

## Sand

Sand filters are the most common simple tank. Water flows down through a bed of sand and out the laterals. Debris stays in the bed until you backwash, which reverses the flow and sends that debris to waste. Backwash until the sight glass runs clear, then rinse if the valve has a rinse position, and return to filter. Top off the pool afterward because you sent water out.

Do not backwash for a fixed number of minutes "because it feels right" if the glass is already clear. You are wasting water and, on a salt pool, salt. Do not backwash so briefly that the bed stays packed. If pressure is high again the next day, the sand may be channeling or scaled, or the laterals are damaged and you are not filtering at all. Sand that is several years old and has never been changed is a fair suspect when the pool will not sparkle and the chemistry is actually fine. [Cloudy water](/learn/cloudy-water) helps you decide it is the filter and not a calcium haze.

A multiport valve that leaks at the handle, or that was left between positions, will bypass the sand. Fix the position before you blame the sand.

## Cartridge

Cartridge filters do not backwash. You relieve pressure, open the tank, and rinse the cartridges with a hose, between the pleats, not with a pressure washer that tears them. When rinse water no longer restores the baseline, a filter-cleaner soak, as the cleaner label describes, removes oils sunscreen and lotions leave behind. Replace cartridges when the fabric is crushed, torn, or still high-pressure after a real cleaning.

Never use dish soap. It foams the pool for days. [Pool foam](/learn/pool-foam) is often this exact shortcut. Keep a spare set if you can, so the pool is not offline while one set dries. A cartridge running a green cleanup will load in hours. Clean it again. Do not "let it ride" at 30 psi over baseline because you do not want to open the tank.

## DE

Diatomaceous earth coats grids and catches very fine material. After a backwash, the coat is gone and you must recharge with the amount of DE on the filter's label, mixed into a slurry and added so it coats the grids, usually through the skimmer with the pump on filter. Too little DE and you filter poorly. Too much and pressure spikes. A torn grid, or a bad manifold, puts DE back into the pool as a white grit. If you see that, stop adding DE and open the tank. Breathing DE dust is a bad idea. Keep it wet when you handle it, and follow the bag's caution. This is not a powder to toss into the wind over the deck.

DE and a green pool are a strong combination and a lot of backwashing. [Clearing a green pool](/learn/clear-a-green-pool) assumes you will recharge properly between those backwashes.

## All three

Note the clean pressure at [opening](/learn/pool-opening-checklist) with a clean filter and a full basket. That number is useless if the gauge is stuck. Tap it. If it never moves, replace the gauge before you "diagnose" the filter. Drain the tank at [closing](/learn/pool-closing-checklist) so a freeze does not crack it. [Winterizing](/learn/winterizing-a-pool-in-nj) includes that plug.

Circulation time still matters. The finest DE grid cannot clear a pool that runs an hour a day. [Equipment basics](/learn/pool-equipment-basics) covers runtime. Gallons from the [volume calculator](/tools/pool-volume) tell you what "turned over" means for your pool.

${services}

## Frequently asked questions

### How often do I backwash or rinse?
When pressure says so, not every Tuesday by habit. A quiet pool might go weeks. A pollen week or an algae cleanup might be tomorrow.

### Can I switch from sand to cartridge?
Sometimes, with the right tank and flow. It is a project, not a weekend gasket. Ask before you buy a tank that does not match the pump.

### Is DE dangerous in the pool?
A puff of DE in the water from a torn grid is a filtration failure, not a sanitizer. Vacuum it out, fix the grid, and recharge the correct amount. Do not keep swimming through a white grit you have not identified.
`.trim(),
  },
  {
    slug: "pump-wont-prime",
    title: "Pool Pump Will Not Prime",
    description:
      "Why a pool pump loses prime, the air leaks and closed valves to check first, and when to stop before you burn the seal.",
    category: "equipment",
    order: 3,
    related: ["pool-equipment-basics", "filter-pressure", "pool-leaks"],
    calculators: ["pool-volume"],
    serviceAngle:
      "A pump that will not prime is a repair visit, not a longer weekly clean. Call while the motor is still cool rather than after an hour of dry running.",
    markdown: `
A pump that will not prime is spinning, or trying to, without a solid column of water. You hear it run. The returns are weak or full of air. The lid shows bubbles, or the basket never fills. Priming means getting the air out and keeping it out. The fix is almost always on the suction side or in a valve, and the failure mode if you ignore it is a cooked seal or a melted basket lid.

Stop and let the pump cool if it has been running dry. A few carefully watched minutes of troubleshooting is the limit. A half hour "to see if it catches" is how seals fail. If the motor only hums, smells hot, or trips the breaker, leave it off. That is not an air leak you can solve with a hose.

## Checks that solve most of them

Water level first. If the skimmer is sucking air, you do not have a pump problem. Fill to the middle of the skimmer mouth. A stuck skimmer weir or a basket so full that water cannot enter it looks identical. Empty both the skimmer basket and the pump basket. September leaves in our area make this the entire diagnosis. [Weekly maintenance](/learn/weekly-pool-maintenance) exists partly so baskets never get to this point.

Look at valves. A suction valve closed after a backwash, or a return valve closed "for the robot," will leave the pump churning. Set the multiport to filter, not to closed, not halfway between backwash and rinse.

The lid o-ring is the next classic. It needs to be clean, seated, and lightly lubricated with a silicone lubricant meant for o-rings, not petroleum jelly that eats the rubber. A lid that was opened to empty the basket and crossed-threaded will pull air forever. Tighten by hand until it seals. Cracking the lid with a tool is how lids split.

Unions on the front of the pump, the skimmer line, and any valve that weeps are suction leaks. With the pump off, look for water dripping. With it on, air is being pulled in through the same joint, so you may see little water and a lot of bubbles in the lid. [Pool leaks](/learn/pool-leaks) includes the version of this that only loses water when the pump runs.

## Impeller, check valve, and winter damage

If the basket is clear, the lid seals, the valves are open, and the pump still will not catch, the impeller may be clogged with a seed pod, a pebble, or a piece of a broken basket. Power off at the breaker before anyone opens the pump. That is a technician step if you are not comfortable pulling the motor. Do not stick a screwdriver into a spinning impeller.

Above-ground pumps and inground pumps prime differently only in the plumbing, not in the physics. A check valve stuck shut on a raised pad will isolate the pump from the pool. Winter on this climate adds cracked lids and split volutes that ingested ice. [Winterizing](/learn/winterizing-a-pool-in-nj) is how that gets prevented. [Opening](/learn/pool-opening-checklist) is when you find it. A housing that dribbles from a crack will never hold prime. Replace the housing. Do not epoxy a pressurized wet end and walk away.

## What a primed pump still needs

Once it catches, confirm water at the returns and read the filter pressure. If you are dosing the same day, the gallons from the [volume calculator](/tools/pool-volume) are only useful after the pump is actually moving water. High pressure with weak flow can be a dirty filter, which is [filter pressure](/learn/filter-pressure), not a priming failure. Low pressure with bubbles is still air. [Equipment basics](/learn/pool-equipment-basics) puts the pump in the chain with the filter and heater. A heater or a salt cell that faulted during the air episode may need a reset after flow is honest. [Heater will not fire](/learn/heater-wont-fire) starts over at that point. Do not jump a pressure switch to force heat while you are still priming.

${services}

## Frequently asked questions

### It primes, then loses prime overnight.
A suction leak, a leaking check valve, or a skimmer that draws air as the level drops are the usual reasons. Mark the water level at dusk. If it is below the skimmer by morning, you either have a [leak](/learn/pool-leaks) or you started too low.

### Should I add water to the pump basket to help it prime?
Filling the basket with a hose can help a stubborn prime once valves and the lid are right. Keep the runtime short. If it does not catch, you are refilling a leak, not priming.

### The pump is loud and the flow is weak.
That can be cavitation from a clogged impeller or a closed valve, or a failing bearing. Turn it off if the sound is a grind rather than water. Bearings are a repair, not a chemistry issue.
`.trim(),
  },
  {
    slug: "filter-pressure",
    title: "Low and High Pool Filter Pressure",
    description:
      "How to read a filter gauge, what a rise of 8 to 10 psi means, and how to tell a dirty filter from a clogged basket or a bad gauge.",
    category: "equipment",
    order: 4,
    related: ["filter-care", "pump-wont-prime", "cloudy-water"],
    calculators: ["pool-volume"],
    serviceAngle:
      "We write down a clean baseline at opening so a high-pressure complaint in July has something to compare. Gauge replacement is a small repair, not a new filter by default.",
    markdown: `
Filter pressure is the only instrument on many pads, and it is ignored until the pool is cloudy or a heater faults. The number by itself is almost meaningless. The number compared with the clean baseline is the whole story. Gallons from the [volume calculator](/tools/pool-volume) tell you how much water that flow has to turn over. They do not replace the gauge. Write the baseline down when the filter is clean, baskets are empty, valves are on filter, and the pump is running at the speed you actually use. [Opening](/learn/pool-opening-checklist) is the easy moment to do that.

A rise of about 8 to 10 psi over that baseline is the usual time to backwash sand, rinse a cartridge, or backwash and recharge DE. Your filter manual wins if it prints a different rise. [Filter care](/learn/filter-care) is the procedure for each type. Do not wait for the gauge to peg. Flow to the returns falls off before the tank fails, and a salt cell or heater will fault on low flow while you are still debating the gauge.

## High pressure

Dirty media is the common cause. Pollen in May and algae debris during a cleanup will do it in a day. A cartridge full of sunscreen oil can show high pressure even after a rinse, until it gets a real soak. DE added far beyond the label amount spikes pressure immediately. A valve left half-closed on the return side does the same, because the pump is pushing against a door you shut.

If you just cleaned the filter and pressure is still high, the gauge may be telling the truth about a blockage downstream, or the cleaning did not reach the inside of the pleats or the sand bed. Compare flow at the returns. Strong flow and a high number can be a lying gauge. Weak flow and a high number is a real restriction.

## Low pressure

Low pressure is not "a very clean filter" if yesterday it was normal and today the returns are soft. Empty the skimmer and pump baskets. Look for air in the pump lid, which is a priming problem. [Pump will not prime](/learn/pump-wont-prime) is the air-leak list. A clogged impeller, a closed suction valve, or a dirty robot that you valved the whole pool down to feed can all drop the gauge.

A gauge that reads zero because it is broken also reads "low." Tap it. If it never leaves zero from season to season, replace the gauge before you rebuild the pump. Gauges fail. Filters do not become magically clean.

## After storms, cleanings, and mistakes

[Rain and wind](/learn/after-rain-and-storms) load the filter with fine dirt. Check pressure the next day, not only the hour you restart. A green-pool cleanup can require more than one cartridge rinse. [Cloudy water](/learn/cloudy-water) that will not clear with a sane chlorine level is often this gauge, overdue.

If DE comes back to the pool, pressure behavior gets weird and the water grits up. Stop and inspect grids. Do not keep recharging a torn grid.

Heaters and salt cells sit downstream of this number. Low flow from a packed filter is a top reason a [heater will not fire](/learn/heater-wont-fire) and a top reason a [salt cell](/learn/salt-cell-errors) throws a flow code. Clean the filter before you replace those parts.

At closing, drain the filter so the gauge and the tank are not a freeze project. [Winterizing](/learn/winterizing-a-pool-in-nj) includes the plug. A gauge full of ice is not a diagnostic tool in April.

## Reading it during a cleanup

A green-pool week will swing the gauge more than a quiet week. Record the clean number again after the first real backwash or cartridge rinse of the cleanup, because the "baseline" from June may have been a half-dirty filter you had stopped noticing. If pressure climbs back to the high number within a few hours, you are still shedding algae and the filter is doing its job. Clean it again. If pressure stays low and the water stays cloudy, you may be bypassing the media entirely: a valve between positions, a torn cartridge, or a DE grid that is no longer coated. Open the tank before you add another chemical.

${services}

## Frequently asked questions

### My baseline is 10 psi and my neighbor's is 20. Who is wrong?
Neither, until you know pump speed, filter size, and how clean "clean" was. Compare your gauge with your own baseline.

### Pressure is high only on high speed.
That can be normal on a variable-speed pump. Record a baseline for the speed you use, not only for full speed. A huge jump at the same speed is still a dirty filter or a closed valve.

### Can I ignore pressure if the water looks clear?
For a while. You are running the pump harder against a restriction, and flow-sensitive equipment will complain before your eyes do. Clean it when the rise is there.
`.trim(),
  },
];
