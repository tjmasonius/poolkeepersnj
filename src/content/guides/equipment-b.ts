import type { GuideInput } from "@/lib/guide-types";

const services = `Pad problems and seasonal visits are different quotes. [Weekly maintenance](/services/weekly-maintenance) keeps the water honest. [Pool openings](/services/pool-openings) and [pool closings](/services/pool-closings) are when the heater, cell, and cover come in and out of winter.`;

export const equipmentBGuides: GuideInput[] = [
  {
    slug: "heater-wont-fire",
    serviceTypes: ["open", "weekly"],
    title: "Pool Heater Will Not Fire",
    description:
      "Safe checks when a gas or heat pump will not run: flow, thermostat, gas supply, and the New Jersey limits of a heat pump.",
    category: "equipment",
    order: 5,
    related: ["filter-pressure", "pool-equipment-basics", "pump-wont-prime"],
    calculators: ["pool-volume"],
    serviceAngle:
      "A heater that will not fire is a repair, not a longer cleaning. We do not bypass safety switches to force ignition.",
    markdown: `
A heater that will not fire is usually protecting itself from low flow, a closed gas valve, or a thermostat that never asked for heat. The unsafe move is to defeat a pressure switch, a roll-out switch, or a high-limit to "make it run for the party." Those switches are why the heater is allowed to sit next to a house. This page is the homeowner checklist. Ignition parts, gas valves, and heat exchangers are a technician's job.

## Flow before flame

Every heater we see wants a solid stream of water before it will light or start the compressor. Know the pool's gallons from the [volume calculator](/tools/pool-volume) if you are also correcting chemistry the same day, but fix flow before you dose. Clean baskets. Confirm the pump is primed. [Pump will not prime](/learn/pump-wont-prime) comes first if the lid is full of air. Read the filter gauge against the baseline. A dirty filter is a classic reason for a flow or pressure fault. [Filter pressure](/learn/filter-pressure) and [filter care](/learn/filter-care) fix that without a new heater. Valves on a bypass loop have to be open in the direction the heater expects. A bypass you closed last fall and forgot is not a failed board.

If the heater short-cycles or the cabinet is scorched, leave it off. Soot and repeated ignition failures need a technician, not another button press.

## Ask it to heat, and give it fuel

Set the thermostat above the water temperature by a real margin and give the control time. Automation and time clocks often call the pump and the heater on different schedules. If the pump is off, the heater should refuse to run. That refusal is correct. Confirm the mode is heat, not off, and that a remote panel is not overriding the local one.

On a gas heater, confirm the gas valve at the meter or the propane tank is open, and that other gas appliances in the house still work. An empty propane tank looks like a dead heater. Do not sniff-test fittings with a flame. If you smell gas and cannot immediately identify a normal pilot, leave the area and call the gas utility or a technician. This guide will not walk through lighting procedures that your manual already prints, and it will not suggest bypassing a switch the manual says to leave intact.

Heat pumps have no flame. They move heat from the air into the water. In July in Ocean and Monmouth Counties they earn their keep. In April and October, when the air is cold, output drops even when the unit is "working." That is physics, not a warranty defect. A gas heater still fires in cool air, provided flow and gas are present. Know which machine you own before you compare it with a neighbor's.

## Scale and chemistry

A heater that got quieter over a season, then started tripping a high limit, may be scaled. High pH, high alkalinity, and high calcium, plus heat, coat the exchanger. [Calcium hardness](/learn/calcium-hardness) and [pH and chlorine](/learn/ph-and-chlorine) are the prevention. Descaling an exchanger is a service procedure. Pouring a random acid dose through the skimmer "to clean the heater" is how liners and heaters both get damaged.

## After a winter

A heater that will not fire at [opening](/learn/pool-opening-checklist) was often left full of water. [Winterizing](/learn/winterizing-a-pool-in-nj) and the [closing checklist](/learn/pool-closing-checklist) exist so the exchanger is drained. A cracked exchanger can leak water into the fire side. If water drips from the heater cabinet when the pump runs, shut it down and book a repair. Do not keep firing it.

Error codes are model-specific. Read the manual for the code you actually see, or send a photo of the display with the model number. A code for flow is the filter and the pump. A code for ignition is a technician. Guessing from a forum thread for a different brand is how the wrong part gets replaced.

A heat pump on a cool Monmouth evening can run for hours and move the water only a couple of degrees. That is a sizing and weather limit, not a failed ignition. Compare it with the air temperature before you condemn the unit. A gas heater that will not light at all on that same evening, with flow proven and gas available to the rest of the house, is the unit that needs a technician.

${services}

## Frequently asked questions

### The heater runs for a minute and shuts off.
Often flow, a dirty filter, or a limit switch seeing scale or low circulation. Clean the flow path first. If it repeats with a clean filter and full returns, stop and book service.

### Can I swim while the heater is faulted?
The heater fault is not a sanitizer reading. Test free chlorine. You can swim when the water is in range and you can see the floor. Leave the heater off until it is repaired.

### Is a heat pump supposed to run all night in May?
It may run a long time and still gain only a little. Cool air limits it. A gas heater is the tool if you need a big jump on a cold week, and it still needs flow.
`.trim(),
  },
  {
    slug: "salt-cell-errors",
    serviceTypes: ["open", "close", "weekly"],
    title: "Salt Cell Error Lights and What They Mean",
    description:
      "Low salt, low flow, cold water, and scale: how to tell a real salt problem from a cell that is lying, without scraping the plates.",
    category: "equipment",
    order: 6,
    related: ["saltwater-pool-care", "salt-vs-chlorine", "filter-pressure"],
    calculators: ["salt", "chlorine"],
    serviceAngle:
      "We confirm salt with a test before anyone adds a bag because a cell said so. Cell cleaning follows the manual and is scheduled as its own work.",
    markdown: `
A salt cell error is a message about salt, temperature, flow, or the cell itself. Treating every message as "add salt" is how pools end up at 5000 ppm with a cell that still will not produce. Confirm with a kit or a meter, then use the [salt calculator](/tools/salt) only if the test says you are under the manual's target. The default 3200 ppm in that calculator is a common midpoint, not your cell's opinion.

The day-to-day habits are in [saltwater care](/learn/saltwater-pool-care). The choice of owning a cell at all is in [salt versus chlorine](/learn/salt-vs-chlorine).

## Low salt that is not low salt

Cold water is the New Jersey specialty. Many cells stop or slash production when the water is around 60°F or colder, and some displays read salt low while they do it. April, early May, and October on the shore and inland will do this. Test. If the test is in range, do not add salt. Dose liquid chlorine until the water is warm enough for the cell. The [chlorine calculator](/tools/chlorine) sizes that bridge.

Scale does the same impersonation. Calcium crust insulates the plates, production falls, and the cell may report low salt or low output. A separate test that says salt is fine points at the cell, not the bag in the garage. Clean the cell the way the manufacturer describes. Do not scrape, wire-brush, or chisel the plates. You will remove the coating that makes the cell a cell. If you are not sure which end is safe to handle, book the cleaning. High pH and high calcium make the next crust faster. [Calcium hardness](/learn/calcium-hardness) is the other half.

## Flow and inspect-cell messages

Cells want flow. A dirty filter, a closed valve, a pump that lost prime, or a skimmer full of seeds will throw a flow code and the cell will be right to shut down. [Filter pressure](/learn/filter-pressure) and [pump will not prime](/learn/pump-wont-prime) come before a new cell. An inspect-cell or clean-cell reminder is often a timer, not a diagnosis. Inspect it. Clean it if the plates are crusted. Clear the reminder the way the manual says after you have actually looked.

## High salt

If the test is over the manual's range, stop adding salt. The calculator will warn you and will not print a dose. Salt does not evaporate. Rain and top-offs dilute it. Splash-out, backwash, and a partial drain lower it faster. A small overage is often acceptable. Read the manual before you dump a foot of water over 200 ppm. Very high salt plus a cell that is also faulting is a reason to get a second test, because two bad readings in a row are common when the first was the cell talking to itself.

## Age, boards, and winter

Cells wear out over a span of seasons. Production that is weak in warm water, with clean plates, good flow, and salt in range, is a cell near the end of its life. Replacing one is a quote, not a weekly visit. Boards and flow switches fail too. A cell that is silent after a nearby lightning storm may be a board. Say so when you call. We will not promise a cell is fine from a text message that says "the light is on."

Winterizing means the cell is drained or removed so ice does not crack the housing. [Winterizing](/learn/winterizing-a-pool-in-nj) includes it. A spring error that is really a cracked union will also look like low flow. [Opening](/learn/pool-opening-checklist) is when you find winter damage, before you add salt to a leaking pad.

## Output versus a test

Write down the output percentage and the free-chlorine test on the same day once in July. If the cell is at 40% and the test holds the CYA floor, leave it. If the cell is at 80% and the test is still under the floor by evening, the cell is not keeping up with the sun or with a beginning algae demand. Supplement with liquid chlorine and look for scale or a tired cell. Do not keep raising the percentage and skipping the test. The percentage is a setting. The test is the result.

${services}

## Frequently asked questions

### The light says check salt and the water looks fine. Do I add a bag?
Test first. Add salt only if the test is under the target. A bag added to a scaled, cold cell makes the next test harder to interpret.

### Can I run the cell at 100% all summer?
You can, and you will wear it faster and drive pH up. Size the output so tested free chlorine holds the CYA floor, then leave it. If 100% cannot hold that floor in hot sun, you need a chlorine supplement or a lower CYA, not a second cell the same afternoon.

### Does the cell replace shocking?
No. It is a maintenance producer. A green pool or high combined chlorine needs the hold in [how to shock](/learn/how-to-shock-a-pool), usually with liquid chlorine.
`.trim(),
  },
  {
    slug: "pool-covers",
    serviceTypes: ["open", "close"],
    title: "Pool Covers: Safety Mesh, Winter, and Solar",
    description:
      "How mesh safety covers, solid winter covers, and solar blankets differ in a New Jersey winter, including water level and rain.",
    category: "equipment",
    order: 7,
    related: ["winterizing-a-pool-in-nj", "pool-closing-checklist", "pool-opening-checklist"],
    calculators: ["pool-volume"],
    serviceAngle:
      "The closing quote should name the cover you actually own. A mesh cover and a solid cover are not the same water level and not the same pump plan.",
    markdown: `
A cover is a tool with a job. Mixing the jobs up is how pools sag, overflow, or open green. In New Jersey the cover also lives with snow, ice, and March rain. Pick the habits that match the cover on the anchors, not the cover you wish you had bought.

None of these covers is a substitute for supervising children around water. A cover can be a barrier and still not be a promise. Fence and cover rules vary by town. This page will not quote an ordinance. If you are asking what your town requires, ask the town. We will tell you how the cover you have should be run.

## Mesh safety covers

Mesh safety covers anchor to the deck and let rain through. They are the common year-round or winter cover on inground pools we see. Leaves sit on top. Water does not, unless the mesh is clogged with debris and becomes a solid cover by accident. That clogged state is dangerous for the cover and the anchors. Blow or rinse debris off through the winter, and do not let a mat of leaves compost into the mesh.

Water level usually stays near normal so the cover is supported by water rather than stretched across an empty bowl. Dropping the water to the bottom of the returns because a neighbor with a solid cover did that will make a mesh cover sag into the pool. The [closing checklist](/learn/pool-closing-checklist) says to match the level to the cover. The springs and anchors need a look each fall. A missing anchor is a trip and a cover that cannot tension.

## Solid winter covers

Solid covers shed rain and snow into a puddle on top of the pool. They need a cover pump and they need the water lowered below the skimmer and the returns you plugged. A pump that fails during a March rain lets the cover sink. Check the pump after storms all winter. [After rain](/learn/after-rain-and-storms) applies to the cover even when you are not swimming. Do not drain the pool far below what the cover and the shell want. An over-lowered vinyl pool is a float risk if groundwater is high. [Winterizing](/learn/winterizing-a-pool-in-nj) is the freeze half. The cover is the precipitation half.

Solid covers also hide the water. You will not see a bloom start. That is an argument for closing only after the water is cool and chlorinated, not for covering a warm green pool and hoping.

## Solar blankets and automatic covers

Solar blankets, the bubble covers, hold heat and cut evaporation. They are a swim-season tool. They are not a safety cover and they are not a winter cover. Take them off for swimming, and do not store them dirty. Washing one with soap is a reliable way to create [foam](/learn/pool-foam). Rinse with water. A blanket left on during a heavy [shock](/learn/how-to-shock-a-pool) can be damaged by high chlorine. Read the blanket maker's note before you hold 20 ppm under plastic.

Automatic covers are a track, a motor, and a lid. They want a clear track and a pump that is not buried in toys. They are not a reason to skip winterizing the plumbing. If the cover is the only barrier you rely on, keep it fully closed when the pool is idle, and still follow whatever your town asks for. We repair and maintain pools. We do not certify barriers.

## Open and close

At [opening](/learn/pool-opening-checklist), get debris off before you drag the cover across the water. Dry it. Store it flat enough that the next fall is not a mildew project. At closing, seat anchors and springs before the first ice, not during it. A cover pump for a solid cover should be tested that day, not discovered dead in January.

Gallons do not change because you covered the pool, but a winter of rain on a mesh cover does exchange some water. Test CYA and salt in the spring before you dose from memory. The [volume calculator](/tools/pool-volume) is still the dose basis if you need to add anything.

${services}

## Frequently asked questions

### Can I leave a solar blanket on all winter?
No. It is not built for snow load or for being a safety barrier. Use the winter cover you anchored, and store the blanket dry.

### How do I get leaves off a mesh cover without wrecking it?
A blower on a dry day, or a soft broom, working toward the deck. Do not drag a metal shovel across the mesh. Ice gets melted or left, not chopped.

### The cover is holding water. Is it a mesh cover?
If water pools, the mesh is clogged or it is actually a solid cover. Pump the water off before the weight pulls anchors out of the deck.
`.trim(),
  },
  {
    slug: "robotic-pool-cleaners",
    serviceTypes: ["weekly"],
    title: "Robotic Pool Cleaners",
    description:
      "What a robotic cleaner does well, what it cannot balance, and how to keep it from spreading algae or chewing a cover.",
    category: "equipment",
    order: 8,
    related: ["weekly-pool-maintenance", "mustard-algae", "filter-care"],
    calculators: ["chlorine"],
    serviceAngle:
      "A robot is a tool on the weekly lap, not a replacement for the visit. We still test, brush the waterline, and empty baskets the robot never sees.",
    markdown: `
A robotic cleaner is an electric cleaner that crawls the floor and walls with its own pump and filter. It is not a pressure-side cleaner that steals water from the returns, and it is not a suction cleaner that depends on the pool pump. That independence is the advantage. The pool filter keeps doing its job while the robot filters a little on its own. The limit is just as important: the robot does not test chlorine, does not brush a waterline film as reliably as you can, and does not empty the skimmer basket.

[Weekly maintenance](/learn/weekly-pool-maintenance) still has a human lap. The robot can own the floor on a schedule.

## What it is good at

Sand, fine dirt, and the everyday dust that makes a pool look tired get caught in the robot's cartridge or bag. Empty that cartridge after a run, especially in pollen season and after a storm. A full cartridge is a robot that polishes the dirt back onto the floor. Rinse the cartridge with water. Do not wash it with dish soap unless you enjoy [foam](/learn/pool-foam).

Run it often enough that debris does not get ground into plaster, and not so long that you ignore a tangle of string or a stuck wheel. Most residential routines are a few runs a week in summer, more after wind. [After a storm](/learn/after-rain-and-storms), pull sticks and large leaves out by hand first. Robots and sticks fight, and the impeller in the robot loses.

It will not fix cloudy water that is algae or scale. [Cloudy water](/learn/cloudy-water) and the [chlorine calculator](/tools/chlorine) still come first. A robot in a green pool mostly redistributes algae and clogs its own filter. Clear the water, then let the robot polish.

## Algae, covers, and chemistry

Mustard algae rides on anything that touches it. If you are in the middle of a [mustard](/learn/mustard-algae) or [green](/learn/clear-a-green-pool) cleanup, leave the robot out until the hold is working, then clean the robot thoroughly before it goes back. Dropping a dirty robot into a pool you just cleared is how the film returns.

High chlorine for a multi-day shock is hard on some plastics and brushes. Check the robot's manual for a maximum free-chlorine level before you park it in a SLAM hold. [How to shock](/learn/how-to-shock-a-pool) does not require the robot to be in the water.

Do not run a robot under a solar blanket or under a cover that has been pulled halfway. Cords and tracks tangle, and a cover pump intake is not a toy. [Pool covers](/learn/pool-covers) come off, or stay fully open, before the robot goes in. At closing, the robot comes out, gets rinsed, and spends the winter dry. [Winterizing](/learn/winterizing-a-pool-in-nj) is for the plumbing. The robot just needs to not be frozen to the floor of the pool.

## Cords, baskets, and the pump

The cord should reach the water without a splice you invented, and the power supply stays dry, plugged into a protected outlet the way the manual and a qualified electrician intend. We will not describe a cord repair. A nicked cord is a replacement, not tape.

The pool's skimmer basket still fills with anything the robot stirs up and does not catch. Empty it. A pump that loses prime the day you start using a new robot is often a basket, not a coincidence. [Pump will not prime](/learn/pump-wont-prime) starts there. You do not need to change filter pressure much if the robot has its own filter, but a robot that fails and you compensate by vacuuming through the pad will load the [sand, cartridge, or DE filter](/learn/filter-care). Watch the gauge anyway.

Salt, chlorine, and pH do not care that you bought a robot. Keep the CYA floor. [How often to test](/learn/how-often-to-test) is unchanged. A cleaner floor with no sanitizer is a clean place for algae to start.

${services}

## Frequently asked questions

### Can a robot replace weekly service?
It can replace a lot of vacuuming. It cannot replace a test, a brushed waterline, a basket, or a look at the heater and the cell. [Weekly service](/services/weekly-maintenance) still has those.

### It climbs the walls and misses the floor in the middle.
Check the filter cartridge and the wheels for wear. A worn brush skips. Also confirm you are not running it only for twenty minutes in a pool that needs a full cycle. The manual has the runtime for the model.

### Should it stay in the water all week?
Follow the manual. Many robots are happier out of the water between runs, cord coiled without kinks, cartridge rinsed. Leaving one in through a shock week is the habit that shortens the cord and the brushes.
`.trim(),
  },
];
