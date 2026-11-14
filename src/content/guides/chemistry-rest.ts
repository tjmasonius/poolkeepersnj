import type { GuideInput } from "@/lib/guide-types";

const services = `Hand the testing to a route if you want it off your weekend: [pool openings](/services/pool-openings), [weekly maintenance](/services/weekly-maintenance), and [pool closings](/services/pool-closings) are quoted as separate scopes.`;

export const chemistryRestGuides: GuideInput[] = [
  {
    slug: "calcium-hardness",
    serviceTypes: ["open", "weekly"],
    title: "Calcium Hardness for Plaster, Vinyl, and Fiberglass",
    description:
      "Why plaster wants 200 to 400 ppm calcium, why vinyl and fiberglass stay lower, and why the only way down is fresh water.",
    category: "water-chemistry",
    order: 4,
    related: ["total-alkalinity", "cloudy-water", "water-chemistry-basics"],
    calculators: ["pool-volume"],
    serviceAngle:
      "We test calcium at opening and again when scale shows up on a heater, tile, or salt cell, then say whether a partial drain belongs on the quote.",
    markdown: `
Calcium hardness is the dissolved calcium in the water. Plaster and gunite want enough of it so the water does not dissolve calcium out of the shell. Vinyl and fiberglass do not have that appetite. On those pools, high calcium is mostly a scale risk: rough tile, a white line at the waterline, a heater that gets loud, a salt cell that crusts over.

Targets we use: about 200 to 400 ppm for plaster and gunite, and about 150 to 250 ppm for vinyl and fiberglass. The whole set of ranges is in [water chemistry basics](/learn/water-chemistry-basics). Calcium does not sanitize anything. A perfect hardness number with no chlorine is still a green pool.

## What pushes it up or down

Calcium chloride is the usual product for raising hardness. Dose from the chart on a drop test kit and from real gallons. The [volume calculator](/tools/pool-volume) is the gallon source if you are estimating. Broadcast with the pump running. Retest the next day, not the next minute. Cal-hypo chlorine also adds calcium, a little at a time, which is why it is a questionable weekly chlorine on a pool that is already hard. The [chlorine calculator](/tools/chlorine) will size a cal-hypo dose, and the product note on that page says it adds calcium. Liquid chlorine does not.

Water evaporates all summer in Monmouth and Ocean Counties. Calcium does not evaporate with it, so hardness creeps up if you only top off. Rain and a hose dilute it. A partial drain and refill is the practical way down. There is no powder that removes calcium from a residential pool in any way you should count on.

Do not empty an inground vinyl pool on a whim, especially near the shore or anywhere the water table sits high. Hydrostatic pressure can float a shell or wrinkle a liner. If a drain is large, that is a planned service, not a Saturday siphon.

## Scale, heaters, and salt cells

Scale forms when calcium, pH, alkalinity, and temperature all lean the same way. Hot water in a heater is a classic place for it. A salt cell is another, because the plates see a high pH film while they make chlorine. If the cell says "low salt" and a separate test says the salt is fine, scale is a prime suspect. Cleaning follows the cell manual. Scraping the plates is how cells die early. See [salt cell errors](/learn/salt-cell-errors) and [saltwater care](/learn/saltwater-pool-care).

Cloudy water that is milky rather than green can be calcium falling out of solution after a pH spike. Lower pH into the 7.4 to 7.6 band, keep the filter running, and read [cloudy water](/learn/cloudy-water) before you buy a clarifier. If alkalinity is also high, the buffer is part of the story. [Total alkalinity](/learn/total-alkalinity) explains the order.

## Opening, fill water, and winter

Test hardness at the spring opening before you add calcium increaser out of habit. Some wells in Middlesex and Mercer run hard. Some fill water does not. Last year's number also concentrates if you lost water to evaporation and replaced little of it. At closing, you are not trying to "set calcium for winter" with a big dose. You are trying not to leave the pH and alkalinity in a corner that etches plaster while the pump is off. That belongs on the [closing checklist](/learn/pool-closing-checklist).

A plaster pool that has lived for years at very low calcium can already be etched. Raising hardness now protects what is left. It does not rebuild a rough surface. That is a replaster conversation, not a chemical one.

## Fill water around here

Wells in parts of Middlesex and Mercer can run harder than treated water in a shore town. If you topped the pool from a hose all August, retest before the close. Evaporation left the calcium behind and the hose put more in. A partial drain while you can still circulate is the practical time to bring a high number down. Do not discover it in April, after the lines are already winterized and you cannot mix a correction.

${services}

## Frequently asked questions

### My vinyl pool is at 100 ppm. Should I raise it?
100 is under the 150 to 250 band we like, but vinyl does not need plaster-level calcium. If pH is stable and you see no etching of metal or tile grout, a modest raise is enough. Do not chase 400 ppm on a liner.

### Can high calcium turn the pool cloudy overnight?
Yes, especially after a pH spike or a big dose of calcium chloride poured into a small area. Brush, filter, and get pH back to 7.4 to 7.6. Confirm the dose matched the gallons.

### Does a saltwater pool need more calcium?
The surface still sets the target. The cell needs the water not to scale, which is a pH and alkalinity problem as much as a calcium problem. Test salt separately with the [salt calculator](/tools/salt) and the generator manual.
`.trim(),
  },
  {
    slug: "cya-stabilizer",
    serviceTypes: ["open", "weekly"],
    title: "CYA and Pool Stabilizer, Explained",
    description:
      "How cyanuric acid protects chlorine from the sun, why too much locks chlorine up, and how the 7.5% rule sets your free-chlorine minimum.",
    category: "water-chemistry",
    order: 5,
    related: ["ph-and-chlorine", "how-to-shock-a-pool", "saltwater-pool-care"],
    calculators: ["chlorine", "pool-volume"],
    serviceAngle:
      "We test CYA before we add any at an opening, and we stop tab-only routines that have pushed it too high to sanitize.",
    markdown: `
Cyanuric acid, CYA, is stabilizer. It grabs free chlorine and shields a share of it from ultraviolet light. On a bright New Jersey afternoon, unstabilized chlorine can be gone in hours. That is the good news. The rest of the news is that CYA also holds chlorine back. The more you have, the higher free chlorine has to be before the water actually sanitizes.

The rule used on this site, and in the [chlorine calculator](/tools/chlorine), is simple: everyday free chlorine should be at least about 7.5% of CYA. A shock hold, often called SLAM, is about 40% of CYA. At 40 ppm CYA the everyday floor is about 3 ppm and the shock hold is about 16 ppm. At 80 ppm those numbers double. A test that says "chlorine is 2, you're fine" is using a chart written for pools with almost no stabilizer.

## Where the CYA came from

Granular stabilizer is cyanuric acid. About 13 ounces of it raises CYA roughly 10 ppm in 10,000 gallons, because a gallon of water weighs about 8.34 pounds and ppm is a weight fraction. Dissolve it slowly, often in a sock in front of a return or premixed, with the pump running. It can take days to read fully. Do not judge the dose an hour later and add a second bag.

Dichlor adds about 0.9 ppm CYA for each 1 ppm of free chlorine it provides. Trichlor tabs and granular add about 0.6 ppm CYA per 1 ppm FC, and they are acidic. Liquid chlorine and cal-hypo add none. A floater full of tabs from Memorial Day to Labor Day is the usual way a Jersey pool reaches CYA 80, 100, or more. Cal-hypo is not a free pass either: it adds calcium, covered in [calcium hardness](/learn/calcium-hardness).

Outdoor pools that are chlorinated by hand usually do well around 30 to 50 ppm. Outdoor salt pools often run 60 to 80 ppm if the generator manual agrees, so the cell does not have to run all day to replace what the sun takes. Indoor pools often need little or none, because there is no sun. Going higher "for protection" just raises the chlorine floor until you cannot hold it.

## When chlorine will not clear the pool

If CYA is very high, you can pour in chlorine, watch the free-chlorine test rise, and still grow algae. The reading is real and the chlorine is over-stabilized. The fixes are to hold free chlorine at the higher minimum, which gets expensive and irritating at CYA 100, or to remove CYA. CYA does not evaporate, and a normal filter does not remove it. Partial drain and refill does. Some companies offer reverse osmosis. Draining a vinyl pool flat, especially with a high water table, can float the shell. Plan the drain. Do not siphon an inground pool empty because a forum said to.

Mustard and black algae are harder still. They are not "a CYA problem" by themselves, but high CYA makes every algae fight longer. Start with [algae prevention](/learn/algae-prevention) and the color-specific guides.

## How this meets pH and the shock page

pH still matters, and it matters a bit less dramatically once CYA is in the water, because most chlorine is bound to stabilizer. A pH above about 7.8 is still a problem. Read [pH and chlorine](/learn/ph-and-chlorine) for that relationship without pretending the no-CYA textbook percentages still apply one-for-one.

Shocking a stabilized pool to "10 ppm because the bottle said shock" can be too low. If CYA is 50, a SLAM hold is about 20 ppm, and you hold it, you do not spike once and leave. [How to shock](/learn/how-to-shock-a-pool) is the procedure. Use liquid chlorine for the repeat doses so you do not add still more CYA while you are trying to get out of a hole.

## Test it before you add it

The CYA test is a disappearing-dot tube. Fill to the line, stand outside with your back to the sun, and watch the dot vanish. Indoor lighting and a guess from memory are how people double-dose. Test at opening, before any stabilizer goes in, and about monthly through the season. [How often to test](/learn/how-often-to-test) puts it on a calendar. Salt pools should read the cell manual before they aim at 80 ppm out of habit. [Saltwater care](/learn/saltwater-pool-care) is that conversation.

${services}

## Frequently asked questions

### Is CYA the same as conditioner?
In pool aisles, stabilizer and conditioner are both cyanuric acid. Read the percent on the bag. Dose from gallons, then wait and retest.

### Will a sand filter remove CYA if I backwash longer?
No. Backwashing removes debris from the sand. CYA stays dissolved. Water has to leave the pool.

### What CYA should I use with a salt cell?
Often 60 to 80 ppm outdoors, and only if the manual agrees. The cell still has to show a free-chlorine residual at least about 7.5% of that CYA. The [chlorine calculator](/tools/chlorine) will figure the floor once you type the CYA in.
`.trim(),
  },
  {
    slug: "salt-vs-chlorine",
    serviceTypes: ["weekly"],
    title: "Saltwater vs Chlorine Pools",
    description:
      "A salt pool still uses chlorine. Here is what a generator changes, what it does not, and how to choose for a New Jersey season.",
    category: "water-chemistry",
    order: 6,
    related: ["saltwater-pool-care", "cya-stabilizer", "salt-cell-errors"],
    calculators: ["salt", "chlorine"],
    serviceAngle:
      "We maintain both kinds of pools on the same route. The quote says whether a cell, a floater, or liquid chlorine is part of the weekly scope.",
    markdown: `
A saltwater pool is a chlorine pool with a machine that makes the chlorine. The generator passes salt water across a cell and produces chlorine on site. You still test free chlorine. You still hold a residual. You still care about pH, alkalinity, calcium, and CYA. "Salt instead of chlorine" is the wrong picture, and it is how people end up with a green pool and a cell that has been off for three weeks.

A traditional chlorine pool gets its sanitizer from a jug, a bag, or a tab. Liquid chlorine and cal-hypo do not add CYA. Tabs and dichlor do. That single difference decides what summer feels like. The chemistry is in [CYA and stabilizer](/learn/cya-stabilizer) and the doses are in the [chlorine calculator](/tools/chlorine).

## What you are actually choosing

Choose salt if you want less hauling of jugs, a softer feel that many swimmers like, and you are willing to own a cell, a flow switch, and a control board. Choose delivered chlorine if you want simpler equipment, you close the pool for a long freeze, or you do not want another device on the pad. Both can be clear. Neither forgives a month of not testing.

Salt does not evaporate. It leaves when water leaves: splash-out, backwash, a leak, a partial drain. Evaporation and a top-off do the opposite of each other. Rain dilutes salt. A hot, dry week concentrates it. The [salt calculator](/tools/salt) turns gallons and a ppm gap into pounds. It opens at 3200 ppm because many common cells, including a lot of Hayward AquaRite and Pentair IntelliChlor models, list a band around 2700 to 3400. Low-salt systems are different. Edit the target to the manual. The calculator will warn you if you are already over the target and will not tell you to add more.

## The costs that are not a price tag

This page will not quote a cell, a jug, or a competitor. The tradeoffs that matter on a route are time and failure modes.

A generator will not make chlorine in cold water. Many cells taper off or stop somewhere around 60°F. In April, May, and October in Ocean, Monmouth, Middlesex, and Mercer Counties, that is a lot of the season. You dose liquid chlorine until the water is warm enough. A tab pool does not have that particular cutoff, but tabs bring CYA with them whether the water is 62°F or 82°F.

Salt cells raise pH. Plan on acid more often than you did with trichlor. Alkalinity is often happier nearer 60 to 80 ppm so pH is not propped up. [pH and chlorine](/learn/ph-and-chlorine) and [alkalinity](/learn/total-alkalinity) cover the pair.

Cells scale. Cells wear out over a span of seasons, faster if you run them at high output on high CYA or let calcium crust the plates. Error lights are in [salt cell errors](/learn/salt-cell-errors). A chlorine pool's parallel headache is a cracked tab floater, an empty jug, and CYA that crept up unnoticed.

## CYA still applies to both

Outdoor salt pools often carry more CYA, commonly 60 to 80 ppm if the manual agrees, so the cell can keep up with the sun without running 24 hours. The free-chlorine minimum is still about 7.5% of whatever CYA you have. At 70 ppm that is about 5 ppm, not 1 ppm. People who switch to salt and keep a 1 to 3 ppm habit fight algae all August.

A non-salt pool at 30 to 50 ppm CYA has a lower floor and a simpler shock hold. [How to shock](/learn/how-to-shock-a-pool) uses 40% of CYA either way. Liquid chlorine is the product for that hold on both systems, because you do not want the shock itself to add more stabilizer or, on a salt pool, a pile of calcium from cal-hypo.

## Which one we see work

Both, when someone tests. The failures we see are a salt pool with the cell switched off after a cold snap, and a tab pool with CYA over 100 whose owner keeps adding more tabs because "chlorine is low." The weekly habit is the same: read free chlorine, read pH, and know your gallons. [How often to test](/learn/how-often-to-test) is the cadence. Day-to-day salt ownership is [saltwater pool care](/learn/saltwater-pool-care).

${services}

## Frequently asked questions

### Is saltwater gentler on eyes?
Swimmers often say the water feels softer. Eye comfort still depends on pH, combined chlorine, and whether the water is actually in range. Salt is not a promise about comfort.

### Can I add salt to raise chlorine today?
No. Salt is the feedstock. The cell makes chlorine over hours when it is running, warm enough, and not in an error state. If chlorine is low now, use the [chlorine calculator](/tools/chlorine) and add chlorine.

### Do I still shock a salt pool?
Yes, when combined chlorine is high, after a storm, or when algae starts. The cell is a maintenance producer, not a recovery tool. Hold the shock level with liquid chlorine.
`.trim(),
  },
  {
    slug: "saltwater-pool-care",
    serviceTypes: ["open", "weekly", "close"],
    title: "Saltwater Pool Care Through a Jersey Season",
    description:
      "How to run a salt chlorine generator in New Jersey: cold-water cutoffs, CYA, pH creep, salt testing, and when the cell is lying.",
    category: "water-chemistry",
    order: 7,
    related: ["salt-vs-chlorine", "salt-cell-errors", "how-often-to-test"],
    calculators: ["salt", "chlorine"],
    serviceAngle:
      "Weekly salt-pool service includes a free-chlorine test, not just a glance at the cell light. Cell cleaning is its own visit when the manual calls for it.",
    markdown: `
Owning a saltwater pool in New Jersey means owning a short, hot production season and a long shoulder season when the cell is only half in the game. The chemistry is still chlorine chemistry. If you have not read [salt versus chlorine](/learn/salt-vs-chlorine), start there so the generator is not mistaken for a different sanitizer.

## The residual is the point

Set the output so free chlorine holds at least about 7.5% of your CYA when you test it, not when you hope. Outdoor salt pools often carry CYA around 60 to 80 ppm if the manual agrees, which puts the everyday floor near 4.5 to 6 ppm. That surprises people coming from a 1 to 3 ppm tab habit. Type the CYA into the [chlorine calculator](/tools/chlorine) and read the minimum before you turn the output down to "save the cell." An output that never reaches the floor does not save the cell. It grows algae, and then you run the cell harder anyway.

Test free chlorine with a drop kit several times a week in July. The cell percentage is not a chlorine reading. [How often to test](/learn/how-often-to-test) has the rest of the cadence: pH often, salt monthly and after heavy rain, CYA monthly.

## Salt level, and the number on the box

Use a kit or a meter. Add pool-grade salt only when you are under the manual's target. The [salt calculator](/tools/salt) defaults to 3200 ppm and will refuse to dose you upward if you are already over. Pour with the pump running and brush until the grains are gone. Do not add salt the same hour you are trying to read the cell. Undissolved salt and a thirsty cell confuse each other.

Rainy weeks on the shore dilute salt. Hot weeks with a waterfall concentrate it. A leak to the soil loses salt and water together, which the [bucket test](/learn/pool-leaks) helps separate from ordinary evaporation.

## Cold water is not a defect

Many generators stop producing when the water is around 60°F or colder. Exact cutoffs are in the manual. In this state that covers a lot of April, early May, late September, and October. Dose liquid chlorine in those weeks. Do not crank output to 100% on 58°F water and decide the cell is dead. Do not add a bag of salt because the display says low while the water is cold and the plates are scaled. Confirm with a separate test. [Salt cell errors](/learn/salt-cell-errors) walks through the lights we see most often.

## pH will climb

The cell pushes pH up. Check pH every few days in midsummer, not once a month. Many salt pools hold alkalinity nearer 60 to 80 ppm so the pH rise has less buffer behind it. The reasoning is in [total alkalinity](/learn/total-alkalinity) and [pH and chlorine](/learn/ph-and-chlorine). Acid goes into water, then into the pool, with the pump on. If you are adding acid every morning, something else is off: alkalinity too high, a spillway aerating constantly, or a dose that never had time to mix.

## Scale and the cell

High calcium, high pH, and a cell that runs long hours will crust. Inspect the cell on the schedule in the manual. Clean it the way the manual says. Do not wire-brush the plates. If chlorine production falls and salt tests normal, scale or a worn cell is more likely than "the pool needs more salt." [Calcium hardness](/learn/calcium-hardness) is the other half of that scale story, especially on plaster.

When the pool goes green, the cell is not your shock tool. Liquid chlorine, brushing, and filtration are. [Clearing a green pool](/learn/clear-a-green-pool) and [how to shock](/learn/how-to-shock-a-pool) apply to salt water without modification, except that you still do not want cal-hypo if calcium is already high.

## Season edges

At opening, the cell may sit idle for weeks. Test CYA before you add stabilizer, because salt pools that closed full of CYA did not lose it over winter. At closing, drop output to zero, dose a closing chlorine, and winterize the cell and the plumbing so a freeze does not crack a housing. [Winterizing in New Jersey](/learn/winterizing-a-pool-in-nj) covers the freeze. The cell does not get a special exemption from blown lines and open drains.

${services}

## Frequently asked questions

### How long does a cell last?
Often several seasons. High output, high CYA, scale, and running the cell on low-flow water shorten that. There is no honest single-year promise.

### Can I turn the cell off and use tabs instead for a month?
You can, and the tabs will raise CYA the whole time. If you do it, retest CYA before you go back to a low chlorine target. Liquid chlorine is the cleaner bridge.

### The water tastes salty. Is the level too high?
Pool salt around 3000 ppm tastes faintly salty to some people and is far below seawater. Confirm with a test before you drain. Taste is not a meter.
`.trim(),
  },
  {
    slug: "phosphates",
    serviceTypes: ["weekly"],
    title: "Phosphates in Pool Water",
    description:
      "What phosphates feed, what they do not do, and when a remover makes sense after chlorine, brushing, and filtration are already right.",
    category: "water-chemistry",
    order: 8,
    related: ["algae-prevention", "clear-a-green-pool", "how-to-shock-a-pool"],
    calculators: ["chlorine"],
    serviceAngle:
      "We do not sell a phosphate treatment as a substitute for chlorine. If algae keeps returning after a proper hold, phosphates go on the test list.",
    markdown: `
Phosphates are a nutrient. Algae can use them. They are not a sanitizer problem in the sense that a phosphate number replaces free chlorine, and they are not a moral failing of the pool. Fertilizer, some fill water, decaying leaves, and the algae you just killed all contribute. A lawn service that blows clippings toward the deck will do more for your phosphate reading than a mystery bottle.

There is no single health-style limit that belongs next to pH. Many technicians start paying attention when phosphate is up in the high hundreds of parts per billion and algae is already a repeat guest. A low phosphate number will not save a pool whose free chlorine is below about 7.5% of CYA. A high number will not, by itself, turn a well-chlorinated pool green overnight. Chlorine still does the killing.

## When the test is worth running

Run it when you have already done the real work and the pool still relapses. That work is: CYA known, free chlorine held at the right floor, pH in the 7.4 to 7.6 band, the filter clean, and the walls brushed. [Algae prevention](/learn/algae-prevention) is that routine. [How to shock](/learn/how-to-shock-a-pool) is the hold if you are already behind. If the pool cleared and greened again in a week, phosphate is a fair question, along with a filter that never actually ran long enough and a CYA test that was wrong.

Do not lead with a remover on a green pool. Kill and filter the algae first. Dead algae releases what it was holding, and a remover added into a swamp mostly makes a mess in the filter. [Clearing a green pool](/learn/clear-a-green-pool) is the sequence.

## What a remover does, and what it asks of the filter

Phosphate removers bind phosphate so the filter can catch it. They can cloud the water. They can spike filter pressure. Plan to clean or backwash. If you have a DE filter, a torn grid will send DE and the cloudy byproduct back to the pool. [Filter care](/learn/filter-care) and [filter pressure](/learn/filter-pressure) are the checkpoints before you add anything that needs the filter to finish the job.

Follow the label for the dose. This page will not invent ounces. Gallons still matter, from the [volume calculator](/tools/pool-volume) if you are unsure. More remover than the label is not a faster clear. It is a longer cloudy week.

## The sources you can actually stop

Keep fertilizer off the deck and out of the skimmer. Rinse pollen and grass away from the water, not into it. Empty the skimmer basket so leaves are not a tea bag. After a storm, [rain aftermath](/learn/after-rain-and-storms) is about chlorine first and nutrients second. A cover during the weeks you are not swimming, discussed in [pool covers](/learn/pool-covers), keeps a remarkable amount of yard debris out.

Metals and phosphates get blamed for the same dull water. Green and clear, especially with blond hair turning green, leans toward copper. Green and cloudy leans toward algae. Test before you treat both theories.

## How this sits with weekly care

On a [weekly maintenance](/services/weekly-maintenance) route, phosphate is not the headline test. Free chlorine and pH are. Phosphate is a follow-up when a pool will not stay clear after the chlorine program is honest. [Openings](/services/pool-openings) are a good moment to know the number if last season ended in a relapse, because you can still exchange water before the heat arrives. [Closings](/services/pool-closings) are a bad moment to experiment with a remover you cannot filter in January.

The [chlorine calculator](/tools/chlorine) remains the tool for the sanitizer dose. Nothing on the phosphate bottle changes the 7.5% CYA floor.

## Lawn season

May through September is also fertilizer season on the properties we drive past. A spreader that reaches the coping will raise phosphate no matter how careful the chlorine program is. Rinse the deck away from the pool, not toward the skimmer. If a relapse lines up with a lawn treatment, say so when you book. It changes the test we run first. It does not change the fact that free chlorine still has to be at the CYA floor that week.

${services}

## Frequently asked questions

### Should every pool use a phosphate remover monthly?
No. If chlorine holds, the water is clear, and algae is not a habit, you do not need a monthly nutrient program. Test when you have a reason.

### Will zero phosphates mean I can run lower chlorine?
No. The free-chlorine minimum still tracks CYA. Phosphate removal is not a license to under-sanitize.

### The water clouded after the remover. Did it fail?
Cloudiness can be the remover doing what it does. Run the filter, watch pressure, and clean it when the rise says to. If pressure does not rise and the cloud remains for days, the filter may not be capturing anything. That is an equipment check, not another bottle.
`.trim(),
  },
  {
    slug: "how-often-to-test",
    serviceTypes: ["open", "weekly", "close"],
    title: "How Often to Test Pool Water",
    description:
      "A practical testing schedule for free chlorine, pH, alkalinity, calcium, CYA, and salt through a New Jersey swim season.",
    category: "water-chemistry",
    order: 9,
    related: ["water-chemistry-basics", "weekly-pool-maintenance", "ph-and-chlorine"],
    calculators: ["chlorine", "salt"],
    serviceAngle:
      "The weekly route includes a test. Between visits, especially after parties and storms, a homeowner test is what keeps Friday from becoming a green Monday.",
    markdown: `
Test on a schedule that matches how fast each number moves. Free chlorine and pH move in hours when the sun is high and the pool is busy. Alkalinity moves in days. Calcium, CYA, and salt move in weeks unless you drained, flooded, or dumped in a product that contains them. Testing everything every morning is how people quit testing entirely. Testing chlorine once a month is how July goes green.

The ranges you are aiming at live in [water chemistry basics](/learn/water-chemistry-basics). The doses live in the [chlorine calculator](/tools/chlorine) and the [salt calculator](/tools/salt). A test without gallons is a guess, so keep the [volume calculator](/tools/pool-volume) number written inside the kit lid.

## A season that fits this state

Opening through late May: test free chlorine and pH whenever you are on site, at least several times a week once the cover is off. Cold water slows algae and does not stop it. CYA, alkalinity, calcium, and salt get a full panel before you add those products. Pollen loads the filter. Pressure belongs on this list too. [Opening checklist](/learn/pool-opening-checklist) is the rest of that week.

June through August: free chlorine and pH two or three times a week, and the morning after a party, a heat wave, or a storm. Alkalinity weekly. CYA about monthly, sooner if you are living on trichlor tabs. Salt monthly and after a heavy rain or a big top-off. Calcium monthly. Combined chlorine whenever the water smells "chlorine-y" or eyes complain, because that smell is often chloramines, not a high free-chlorine reading. [After rain and storms](/learn/after-rain-and-storms) is the extra panel.

September and the close: keep the summer cadence until the water is honestly cool. Then test pH and alkalinity for the winter balance while the pump still runs. [Closing](/learn/pool-closing-checklist) and [winterizing](/learn/winterizing-a-pool-in-nj) are the cutoff. A cell that has stopped producing because the water is near 60°F is not a reason to stop testing chlorine. It is a reason to dose liquid chlorine until you close.

## What to test with

A drop kit that can read free chlorine with FAS-DPD, plus pH, alkalinity, and CYA, is the kit these guides assume. Strips are useful as a quick screen and poor as the only tool when you are dosing a large correction. CYA is a turbidity tube. Read it outdoors, back to the sun. Salt is a separate strip, titration, or meter. Do not trust the cell display alone. Cold water and scale both make cells read low. [Salt cell errors](/learn/salt-cell-errors) shows the pattern.

Take the sample from elbow depth, away from a return that is blowing fresh chemical. Test before you add, then again after the water has circulated. Same-day retests of stabilizer are misleading because it dissolves slowly.

## What each extra test is for

Combined chlorine above about 0.5 ppm is a reason to shock, not to add more tabs and hope. The procedure is [how to shock](/learn/how-to-shock-a-pool).

Phosphate is optional and secondary. Run it when algae returns after chlorine, brush, and filter are already right. [Phosphates](/learn/phosphates) explains why it is not the first test.

Metals are worth a look when the water is clear and green, or when blond hair and light surfaces stain. That is not the same as cloudy green algae. [Cloudy water](/learn/cloudy-water) helps you split those cases.

## Writing it into the week

[Weekly maintenance](/learn/weekly-pool-maintenance) is the physical round: baskets, brush, water level, pressure. Fold two water tests into that same lap so the chemistry is not a separate project you skip. If Pool Keepers is on a weekly route, we still want you to glance after a Saturday party. We are not there on Sunday morning. [Weekly service](/services/weekly-maintenance) is the steady correction. [Openings](/services/pool-openings) set the first panel. [Closings](/services/pool-closings) set the last one while the lines can still be blown.

Adjust one major item, circulate, and retest. A pool that gets bicarb, acid, stabilizer, and a shock in the same hour will not tell you which one worked.

${services}

## Frequently asked questions

### Is once a week enough in July?
For alkalinity, usually. For free chlorine and pH, no. Midsummer sun and swimmers move those two faster than a weekly visit, which is why the visit is not the only test.

### Do I test CYA every week?
No. Monthly is enough unless you added stabilizer, dumped in dichlor, or the pool will not hold a residual and you suspect CYA is far higher than you think.

### The strip says chlorine is fine and the water is cloudy. Now what?
Confirm free chlorine with a drop test, check the filter, and read [cloudy water](/learn/cloudy-water). Strips compress a range. Cloudy water is a reason to slow down and get a better reading, not to add clarifier first.
`.trim(),
  },
];
