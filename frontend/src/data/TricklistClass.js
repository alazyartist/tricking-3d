import {
	Base,
	Trick,
	Stance,
	Variation,
	Transition,
} from "./trickDataModel/TrickClasses";

import {
	legs,
	directions,
	stances,
	rotations,
	styles,
	transitions,
	positions,
	kicks,
	grabs,
	shapes,
	touchdowns,
	swings,
	pureSetups,
	singular,
} from "./trickDataModel/TrickObjects";

//TrickFamily for Inverts
//Both
const backflipB = new Base(
	"Backflip",
	directions.Backwards,
	stances.Backside,
	legs.Both,
	legs.Both,
	styles.unified
);
const frontflipB = new Base(
	"Frontflip",
	directions.Forwards,
	stances.Frontside,
	legs.Both,
	legs.Both,
	styles.unified
);
const insideflipB = new Base(
	"Insideflip",
	directions.Inside,
	stances.Inside,
	legs.Both,
	legs.Both,
	styles.unified
);
const outsideflipB = new Base(
	"Outsideflip",
	directions.Outside,
	stances.Outside,
	legs.Both,
	legs.Both,
	styles.unified
);
//Left
const gainerL = new Base(
	"Gainer",
	directions.Backwards,
	stances.BacksideComplete,
	legs.L,
	legs.R
);
const websterL = new Base(
	"Webster",
	directions.Forwards,
	stances.FrontsideMega,
	legs.L,
	legs.R
);
const aerialL = new Base(
	"Aerial",
	directions.Inside,
	stances.InsideMega,
	legs.L,
	legs.R
);
const lotusL = new Base(
	"Lotus",
	directions.Outside,
	stances.OutsideComplete,
	legs.L,
	legs.L
);
//Right
const gainerR = new Base(
	"GainerR",
	directions.Backwards,
	stances.BacksideHyper,
	legs.R,
	legs.L,
	styles.singular
);
const websterR = new Base(
	"WebsterR",
	directions.Forwards,
	stances.FrontsideSemi,
	legs.R,
	legs.L,
	styles.singular
);
const gmsR = new Base(
	"Gms",
	directions.Inside,
	stances.InsideHyper,
	legs.R,
	legs.R,
	styles.singular
);
const raizR = new Base(
	"Raiz",
	directions.Outside,
	stances.OutsideSemi,
	legs.R,
	legs.L,
	styles.singular
);
raizR.rotation = 180;

const backflip = new Trick(
	"Backflip",
	backflipB,
	stances.Backside,
	styles.unified
);
const frontflip = new Trick(
	"Frontflip",
	frontflipB,
	stances.Frontside,
	styles.unified
);
const insideflip = new Trick(
	"Insideflip",
	insideflipB,
	stances.Inside,
	styles.unified
);
const outsideflip = new Trick(
	"Outsideflip",
	outsideflipB,
	stances.Outside,
	styles.unified
);

const full = new Trick("Full", backflipB, stances.Backside, styles.unified);
full.rotation = rotations.full;
full.landingStance = stances.BacksideComplete;
full.toLeg = legs.L;

const cork = new Trick(
	"Cork",
	gainerL,
	stances.BacksideComplete,
	styles.singular
);
cork.rotation = rotations.full;

cork.toLeg = legs.L;

const aerial = new Trick("Aerial", aerialL);
// aerial.stance = stances.InsideMega;
// aerial.rotation = rotations.zero;
aerial.takeoffStance = stances.InsideMega;
aerial.landingStance = stances.InsideHyper;
// aerial.takeoffStyle = styles.singular;
// aerial.direction = directions.Inside;
// aerial.landingStyle = styles.singular;
console.log(aerialL);

const atwist = new Trick(
	"ATwist",
	aerialL,
	stances.InsideMega,
	styles.singular
);
atwist.toLeg = legs.L;
atwist.landingStance = stances.BacksideComplete;
atwist.rotation = 270;
const btwist = new Trick("BTwist", atwist, stances.InsideMega, styles.singular);
btwist.landingStance = stances.BacksideComplete;

const doublecork = new Trick(
	"Doublecork",
	cork,
	"BacksideComplete",
	styles.singular
);
doublecork.direction = directions.Backwards;
doublecork.rotation = rotations.double;
doublecork.landingStance = stances.BacksideComplete;
doublecork.takeoffStance = stances.BacksideComplete;
doublecork.landingStyle = styles.singular;
doublecork.takeoffStyle = styles.singular;
doublecork.stance = stances.BacksideComplete;

const gms = new Trick("GMS", gmsR, stances.InsideHyper, styles.singular);
const gmTwist = new Trick(
	"GMTwist",
	gmsR,
	stances.InsideHyper,
	styles.singular
);
gmTwist.rotation = 270;
gmTwist.landingStance = stances.BacksideComplete;
gmTwist.toLeg = legs.L;
const kroc = new Trick("Kroc", gainerR, stances.BacksideHyper, styles.singular);
kroc.rotation = 360;
kroc.landingStance = stances.BacksideComplete;
kroc.toLeg = legs.L;

const webster = new Trick(
	"Webster",
	websterL,
	stances.FrontsideMega,
	styles.singular
);
const badsideWebster = new Trick(
	"Badside Webster",
	websterR,
	stances.FrontsideSemi,
	styles.singular
);

const raiz = new Trick("Raiz", raizR);
raiz.takeoffStance = stances.OutsideSemi;
raiz.landingStance = stances.BacksideComplete;
raiz.takeoffStyle = styles.singular;
raiz.landingStyle = styles.singular;

const lotus = new Trick(
	"Lotus",
	lotusL,
	stances.OutsideComplete,
	styles.singular
);
const gainer = new Trick(
	"Gainer",
	gainerL,
	stances.BacksideComplete,
	styles.singular
);
const badsideGainer = new Trick(
	"BadSideGainer",
	gainerR,
	stances.BacksideHyper,
	styles.singular
);
const gainerSwitch = new Trick(
	"GainerSwitch",
	gainerL,
	stances.BacksideComplete,
	styles.singular
);
gainerSwitch.toLeg = legs.L;
const corksnapu = new Trick(
	"Corksnapu",
	cork,
	stances.BacksideComplete,
	styles.singular
);

const cartwheel = new Trick(
	"Cartwheel",
	aerialL,
	stances.InsideMega,
	styles.singular
);
cartwheel.touchdowns = "Cart";
corksnapu.rotation = 720;

const touchdownRaiz = new Trick(
	"Touchdown Raiz",
	raizR,
	stances.OutsideSemi,
	styles.singular
);
touchdownRaiz.landingStance = "BacksideComplete";
touchdownRaiz.touchdowns = "Touchdown";

export const TrickListArr = [
	backflip,
	insideflip,
	frontflip,
	outsideflip,
	badsideGainer,
	gainer,
	gainerSwitch,
	aerial,
	atwist,
	btwist,
	gms,
	gmTwist,
	kroc,
	webster,
	badsideWebster,
	raiz,
	lotus,
	cartwheel,
	touchdownRaiz,
	full,
	cork,
	corksnapu,
	doublecork,
];

const popL = new Transition(
	"Pop",
	styles.singular,
	styles.unified,
	legs.L,
	legs.Both
);
const popR = new Transition(
	"Pop",
	styles.singular,
	styles.unified,
	legs.R,
	legs.Both
);
const hopR = new Transition(
	"Hop",
	styles.singular,
	styles.unified,
	legs.R,
	legs.R
);
const hopL = new Transition(
	"Hop",
	styles.singular,
	styles.unified,
	legs.L,
	legs.L
);
const punch = new Transition(
	"Punch",
	styles.unified,
	styles.unified,
	legs.Both,
	legs.Both
);
const punchL = new Transition(
	"Punch",
	styles.unified,
	styles.unified,
	legs.L,
	legs.Both
);
const punchR = new Transition(
	"Punch",
	styles.unified,
	styles.unified,
	legs.R,
	legs.Both
);
const bound = new Transition(
	"Bound",
	styles.unified,
	styles.unified,
	legs.Both,
	legs.Both
);
bound.landingStyle = styles.any;
const mislegR = new Transition(
	"Misleg",
	styles.singular,
	styles.singular,
	legs.R,
	legs.R
);
const mislegL = new Transition(
	"Misleg",
	styles.singular,
	styles.singular,
	legs.L,
	legs.L
);
const vanishLtoR = new Transition(
	"Vanish",
	styles.singular,
	styles.singular,
	legs.L,
	legs.R
);
const vanishRtoL = new Transition(
	"Vanish",
	styles.singular,
	styles.singular,
	legs.R,
	legs.L
);
const reversal = new Transition(
	"Reversal",
	styles.singular,
	styles.singular,
	legs.L,
	legs.L
);
const reversePopL = new Transition(
	"Reverse Pop",
	styles.unified,
	styles.singular,
	legs.Both,
	legs.L
);
const reversePopR = new Transition(
	"Reverse Pop",
	styles.unified,
	styles.singular,
	legs.Both,
	legs.R
);
const rapidL = new Transition(
	"Rapid",
	styles.singular,
	styles.singular,
	legs.L,
	legs.L
);
const rapidR = new Transition(
	"Rapid",
	styles.singular,
	styles.singular,
	legs.R,
	legs.R
);
const carryThrough = new Transition(
	"Carry Through",
	styles.singular,
	styles.singular,
	legs.LorR,
	legs.LorR
);
const wrapR = new Transition(
	"Wrap",
	styles.singular,
	styles.singular,
	legs.R,
	legs.R
);
wrapR.rotation = 180;
const skipLtoR = new Transition(
	"Skip",
	styles.singular,
	styles.singular,
	legs.L,
	legs.R
);
const skipRtoL = new Transition(
	"Skip",
	styles.singular,
	styles.singular,
	legs.R,
	legs.L
);
const cheatLtoR = new Transition(
	"Cheat",
	styles.singular,
	styles.singular,
	legs.L,
	legs.R
);
const cheatRtoL = new Transition(
	"Cheat",
	styles.singular,
	styles.singular,
	legs.R,
	legs.L
);
cheatRtoL.rotation = 180;
cheatLtoR.rotation = 180;
const redirectLtoR = new Transition(
	"Redirect",
	styles.singular,
	styles.singular,
	legs.L,
	legs.R
);
const redirectRtoL = new Transition(
	"Redirect",
	styles.singular,
	styles.singular,
	legs.R,
	legs.L
);
const swingLtoL = new Transition(
	"Swing",
	styles.singular,
	styles.singular,
	legs.L,
	legs.L
);
const swingRtoL = new Transition(
	"Swing",
	styles.singular,
	styles.singular,
	legs.R,
	legs.L
);
const swingLtoR = new Transition(
	"Swing",
	styles.singular,
	styles.singular,
	legs.L,
	legs.R
);
const swingRtoR = new Transition(
	"Swing",
	styles.singular,
	styles.singular,
	legs.R,
	legs.R
);
const bonelessL = new Transition(
	"Boneless",
	styles.unified,
	styles.singular,
	legs.Both,
	legs.L
);
const bonelessR = new Transition(
	"Boneless",
	styles.unified,
	styles.singular,
	legs.Both,
	legs.R
);
const jStep = new Transition(
	"J-Step",
	styles.unified,
	styles.singular,
	legs.Both,
	legs.L
);

transitions.sequential["Skip Reversal"] = redirectLtoR;
transitions.sequential.Cheat = cheatLtoR;
transitions.singular.Wrap = wrapR;
transitions.sequential.Skip = skipLtoR;
transitions.singular["Carry Through"] = carryThrough;
transitions.singular.Rapid = rapidR;
transitions.singular["Reverse Pop"] = reversePopL;
transitions.sequential.Reversal = reversal;
transitions.sequential.Vanish = vanishLtoR;
transitions.singular.Misleg = mislegR;
transitions.unified.Bound = bound;
transitions.unified.Pop = popL;
transitions.unified.Punch = punch;
transitions.singular.Swing = swingLtoL;
transitions.singular.Boneless = bonelessL;

// newComboStateArr.length = 0;
const backside = new Stance("Backside", backflip, styles.unified);
const frontside = new Stance("Frontside", frontflip, styles.unified);
const inside = new Stance("Inside", insideflip, styles.unified);
const outside = new Stance("Outside", outsideflip, styles.unified);
const backsideComplete = new Stance("BacksideComplete", gainer);
const backsideHyper = new Stance("BacksideHyper", badsideGainer);
const insideHyper = new Stance("InsideHyper", gms);
const insideMega = new Stance("InsideMega", aerial);
const outsideComplete = new Stance("OutsideComplete", lotus);
const outsideSemi = new Stance("OutsideSemi", raiz);
const frontsideSemi = new Stance("FrontsideSemi", badsideWebster);
const frontsideMega = new Stance("FrontsideMega", webster);

//Variation Declaration

const swipe = new Variation("Swipe", { kicks: "Round", pos: positions.M });
const round = new Variation("Round", { kicks: "Round", pos: positions.E });
const flash = new Variation("Flash", { kicks: "Round", pos: positions.B });

const lateRound = new Variation("Late Round", {
	kicks: "Round",
	pos: positions.Ex,
});
const snapu = new Variation("Snapu", {
	kicks: swipe,
	rotation: 360,
	pos: positions.M,
});
const shuriken = new Variation("Shuriken", { kicks: "Hook", pos: positions.M });
const hook = new Variation("Hook", { kicks: "Hook", pos: positions.En });
const lateHook = new Variation("Late Hook", {
	kicks: "Hook",
	pos: positions.Ex,
});
const dragonfly = new Variation("Dragonfly", {
	kicks: "Round",
	pos: positions.En,
});

// Arrays
export const transArr = [];
Object.keys(transitions).map((e) => {
	Object.keys(transitions[e]).map((c) => transArr.push(transitions[e][c]));
});
transArr.push(
	cheatRtoL,
	swingRtoL,
	swingRtoR,
	swingLtoR,
	vanishRtoL,
	popR,
	redirectRtoL,
	mislegL,
	skipRtoL,
	bonelessR,
	hopR,
	hopL,
	punchR,
	punchL,
	reversePopR,
	rapidL,
	jStep
);
stances.Backside = backside;
stances.Inside = inside;
stances.Frontside = frontside;
stances.Outside = outside;
stances.BacksideComplete = backsideComplete;
stances.BacksideHyper = backsideHyper;
stances.InsideHyper = insideHyper;
stances.InsideMega = insideMega;
stances.OutsideComplete = outsideComplete;
stances.OutsideSemi = outsideSemi;
stances.FrontsideMega = frontsideMega;
stances.FrontsideSemi = frontsideSemi;

export const stanceArr = [];
Object.keys(stances).map((e) => {
	stanceArr.push(stances[e]);
});

const basesArr = [
	backflipB,
	insideflipB,
	frontflipB,
	outsideflipB,
	gainerL,
	gainerR,
	gmsR,
	aerialL,
	websterL,
	websterR,
	raizR,
	lotusL,
];

export const kickVariationsArr = [
	dragonfly,
	flash,
	swipe,
	round,
	lateRound,
	snapu,
	hook,
	shuriken,
	lateHook,
];

// console.table(stanceArr);
// console.table(kickVariationsArr);
// console.table(basesArr);
console.table(stances);
console.table(TrickListArr);
