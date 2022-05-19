export class Base {
	constructor(name, direction, stance, fromLeg, toLeg, style) {
		this.name = name;
		this.direction = direction;
		this.fromLeg = fromLeg || legs.Both;
		this.toLeg = toLeg || legs.Both;
		this.rotation = 0;
		this.stance = stance;

		this.takeoffStance = stance || stances.Backside;
		this.landingStance = stance || stances.Backside;
		this.takeoffStyle = style || styles.singular;
		this.landingStyle = style || styles.singular;
	}
}

export class Trick extends Base {
	constructor(name, base, stance, style) {
		super(
			name,
			base.direction,
			base.stance,
			base.fromLeg,
			base.toLeg,
			base.style
		);
		this.name = name;
		this.base = base;
		this.rotation = base.rotation;
		this.direction = base.direction;
		this.takeoffStance = stance || this.base.takeoffstance;
		this.takeoffStyle = style || base.takeoffStyle;
		this.landingStance = stance || this.base.landingStance;
		this.landingStyle = style || this.base.landingstyle;
		this.stance = this.takeoffStance || base.stance;
		// this.variations = {
		// 	rotations,
		// 	kicks,
		// 	grabs,
		// 	shapes,
		// 	stances,
		// 	styles,
		// };
	}
	getStance() {
		return this.landingStance;
	}
}

export class Transition {
	constructor(name, fromStyle, toStyle, fromleg, toleg) {
		this.name = name;
		this.landingStance = stances.Any;
		this.landingStyle = fromStyle;
		this.transitionType = toStyle;
		this.takeoffStance = stances.Any;
		this.takeoffStyle = toStyle;
		this.fromLeg = fromleg;
		this.toLeg = toleg;
		this.rotation = 0;
	}
}

export class Variation {
	constructor(name, { rotation, kicks, grabs, shapes, touchdowns, axis, pos }) {
		this.name = name;
		this.adjustRotation = rotation;
		this.touchdowns = touchdowns;
		this.kicks = kicks;
		this.axis = axis;
		this.grabs = grabs;
		this.shapes = shapes;
		this.pos = pos;
	}
}

export class Stance {
	constructor(name, trick) {
		this.name = name;
		this.trick = trick;
		this.style = styles.singular;
		this.leg = trick.fromLeg;
		this.direction = trick.direction;
	}
	getTrick() {
		return this.trick;
	}
}

// legs, directions, positions, stanceOptions, stances,
export const legs = {
	L: "Left",
	R: "Right",
	LorR: "L or R",
	Both: "Both",
};

export const directions = {
	Backwards: "Backside: Traveling Backwards",
	Forwards: "Frontside: Traveling Forwards",
	Inside: "Inside: To the left",
	Outside: "Outside: To The right",
};
export const positions = {
	En: "Entrance",
	B: "Begininng",
	M: "Middle",
	E: "End",
	Ex: "Exit",
};
export const stanceOptions = {
	BIFO: ["B", "I", "F", "O"],
	CHMS: ["C", "H", "M", "S"],
};
export const stances = {
	Backside: "Backside",
	BacksideComplete: "BacksideComplete",
	BacksideHyper: "BacksideHyper",
	Inside: "Inside",
	InsideMega: "InsideMega",
	InsideHyper: "InsideHyper",
	Frontside: "Frontside",
	FrontsideSemi: "FrontsideSemi",
	FrontsideMega: "FrontsideMega",
	Outside: "Outside",
	OutsideComplete: "OutsideComplete",
	OutsideSemi: "OutsideSemi",
};

function BIFOCHMSSpread(arr1, arr2) {
	let newArr = [];
	let newUniqArr;
	for (let i = 0; i < arr1.length; i++) {
		for (let q = 0; q < arr2.length; q++) {
			let val = `${arr1[i]}${arr2[q]}`;
			if (val == "BS") {
				val = "FS";
			}
			if (val == "BM") {
				val = "FM";
			}
			if (val == "FC") {
				val = "BC";
			}
			if (val == "FH") {
				val = "BH";
			}
			newArr.push(val);
			newUniqArr = [...new Set(newArr)];
		}
	}
	return newUniqArr;
}
let any = BIFOCHMSSpread(stanceOptions.BIFO, stanceOptions.CHMS);
stances.Any = [any];
// stances.Any = "Any";

//Singular Sequential, Unified, Styles, Rotations
export const singular = {
	"Reverse Pop": "Reverse Pop",
	Swing: "Swing",
	Misleg: "Misleg",
	Rapid: "Rapid",
	"Carry Through": "Carry Through",
	Wrap: "Wrap",
};

export const sequential = {
	Vanish: "Vanish",
	Reversal: "Reversal",
	Skip: "Skip Vanish",
	"Skip Reversal": "Redirect",
	Cheat: "Cheat",
};
export const unified = {
	Punch: "Punch",
	Pop: "Pop",
	Bound: "Bound",
};

export const styles = {
	singular: "Singular",
	sequential: "Sequential",
	unified: "Unified",
	any: "Singular/Unified/Sequential",
};

export const transitions = { singular, sequential, unified };
// Variations = rotations, kicks, grabs, touchdowns, shapes
export const rotations = {
	zero: 0,
	half: 180,
	full: 360,
	1.5: 540,
	double: 720,
	2.5: 900,
	triple: 1080,
	3.5: 1260,
	quad: 1440,
};
export const kicks = {
	hook: "shuriken",
	round: "swipe",
	insideCrescent: "swipe",
	outsideCrescent: "shuriken",
	side: "dragonfly",
	back: "hook",
	front: "flash",
	split: "crowdAwakener",
	twist: "scissor",
	hawkeye: "hawkeye",
	axe: "axe",
};
export const grabs = {
	rodeo: "both hands--both feet",
	squirell: "one hand--one or both feet",
	terada: "",
	"tai fighter": "",
	rocketboi: "",
};
export const touchdowns = {
	touchdown: "left hand middle",
	broken: " right hand middle",
	"sailor moon": "right hand - entrance",
	"venus moon": "left hand - entrance",
};
export const shapes = {
	Pike: "legs together in L",
	XOut: "making an X shape",
	FigureFour: "making a 4 shape",
	Tuck: "ball",
	Layout: " | stretched out",
	DonutBoy: " D shaped",
	PeterPan: "peter pan",
	IronMan: "iron man",
	SuperMan: "super man",
	CrowdAwakener: " split kick",
	Sidewinder: "sidewinder",
	Helicoptero: "helicoptero",
	Cowboy: " grabing legs",
};

export const swings = {
	backSwing: "backswing",
	aerialSwing: "aerial:inside",
	masterSwing: "master:inside",
	frontSwing: "frontswing",
	raizSwing: "raiz:outside",
	lotusSwing: "lotus:outside",
};
export const pureSetups = {
	"J-Step": "J-Step",
	"Euro-Step": "Euro-Step",
	"K-Step": "K-Step",
	Cheat: "Cheat Step",
	Pivot: "Pivot Step",
	Spin: "Spin Step",
	Skip: "Skip Step",
};

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

const full = new Trick("full", backflipB, stances.Backside, styles.unified);
full.rotation = rotations.full;
full.direction = directions.Backwards;
full.landingStance = stances.Backside;
full.takeoffStance = stances.Backside;
full.landingStyle = styles.unified;
full.takeoffStyle = styles.unified;

const cork = new Trick("cork", gainerL);
cork.rotation = rotations.full;
cork.direction = full.direction;
cork.landingStance = stances.BacksideComplete;
cork.landingStyle = styles.singular;
cork.takeoffStyle = styles.singular;
cork.takeoffStance = stances.BacksideComplete;
cork.toLeg = legs.Both;

const aerial = new Trick("Aerial", aerialL);
aerial.rotation = rotations.zero;
aerial.takeoffStance = stances.InsideMega;
aerial.takeoffStyle = styles.singular;
aerial.direction = directions.Inside;
aerial.landingStance = stances.BacksideHyper;
aerial.landingStyle = styles.singular;
aerial.stance = stances.InsideMega;

const doublecork = new Trick("doublecork", gainerL);
doublecork.direction = directions.Backwards;
doublecork.rotation = rotations.double;
doublecork.landingStance = stances.BacksideComplete;
doublecork.takeoffStance = stances.BacksideComplete;
doublecork.landingStyle = styles.singular;
doublecork.takeoffStyle = styles.singular;
doublecork.stance = stances.BacksideComplete;

const gms = new Trick("GMS", gmsR, stances.InsideHyper, styles.singular);

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
	"Gainer",
	gainerR,
	stances.BacksideHyper,
	styles.singular
);
const corksnapu = new Trick(
	"Corksnapu",
	cork,
	stances.BacksideComplete,
	styles.singular
);

const cartwheel = new Trick(
	"Cartwheel",
	aerialL,
	stances.FrontsideMega,
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
touchdownRaiz.touchdowns = "Touchdown";

export const TrickListArr = [
	backflip,
	insideflip,
	frontflip,
	outsideflip,
	badsideGainer,
	gainer,
	aerial,
	gms,
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

const pop = new Transition(
	"Pop",
	styles.singular,
	styles.unified,
	legs.LorR,
	legs.Both
);
const punch = new Transition(
	"Punch",
	styles.unified,
	styles.unified,
	legs.Both,
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
const swing = new Transition(
	"Swing",
	styles.singular,
	styles.singular,
	legs.LorR,
	legs.LorR
);
const misleg = new Transition(
	"Misleg",
	styles.singular,
	styles.singular,
	legs.LorR,
	legs.LorR
);
const vanish = new Transition(
	"Vanish",
	styles.singular,
	styles.singular,
	legs.L,
	legs.R
);
const reversal = new Transition(
	"Reversal",
	styles.singular,
	styles.singular,
	legs.L,
	legs.L
);
const reversePop = new Transition(
	"Reverse Pop",
	styles.unified,
	styles.singular,
	legs.Both,
	legs.L
);
const rapid = new Transition(
	"Rapid",
	styles.singular,
	styles.singular,
	legs.LorR,
	legs.LorR
);
const carryThrough = new Transition(
	"Carry Through",
	styles.singular,
	styles.singular,
	legs.LorR,
	legs.LorR
);
const wrap = new Transition(
	"Wrap",
	styles.singular,
	styles.singular,
	legs.LorR,
	legs.LorR
);
wrap.rotation = 180;
const skipVanish = new Transition(
	"Skip Vanish",
	styles.singular,
	styles.singular,
	legs.LorR,
	legs.LorR
);
const cheatLtoR = new Transition(
	"CheatLtoR",
	styles.singular,
	styles.singular,
	legs.L,
	legs.R
);
const cheatRtoL = new Transition(
	"CheatRtoL",
	styles.singular,
	styles.singular,
	legs.R,
	legs.L
);
cheatRtoL.rotation = 180;
cheatLtoR.rotation = 180;
const redirect = new Transition(
	"Redirect:SkipReversal",
	styles.singular,
	styles.singular,
	legs.L,
	legs.R
);
const swingLtoL = new Transition(
	"SwingtoL",
	styles.singular,
	styles.singular,
	legs.L,
	legs.L
);
const swingRtoL = new Transition(
	"SwingtoL",
	styles.singular,
	styles.singular,
	legs.R,
	legs.L
);
const swingLtoR = new Transition(
	"SwingtoR",
	styles.singular,
	styles.singular,
	legs.L,
	legs.R
);
const swingRtoR = new Transition(
	"SwingtoR",
	styles.singular,
	styles.singular,
	legs.R,
	legs.R
);

transitions.sequential["Skip Reversal"] = redirect;
transitions.sequential.Cheat = cheatLtoR;
transitions.singular.Wrap = wrap;
transitions.sequential.Skip = skipVanish;
transitions.singular["Carry Through"] = carryThrough;
transitions.singular.Rapid = rapid;
transitions.singular["Reverse Pop"] = reversePop;
transitions.sequential.Reversal = reversal;
transitions.sequential.Vanish = vanish;
transitions.singular.Misleg = misleg;
unified.Bound = bound;
unified.Pop = pop;
unified.Punch = punch;
transitions.singular.Swing = swing;

// newComboStateArr.length = 0;
const backsideComplete = new Stance(stances.BacksideComplete, gainer);
const backside = new Stance(stances.Backside, backflip);
const frontside = new Stance(stances.Frontside, frontflip);
const inside = new Stance(stances.Inside, insideflip);
const outside = new Stance(stances.Outside, outsideflip);
const backsideHyper = new Stance(stances.BacksideHyper, badsideGainer);
const insideHyper = new Stance(stances.InsideHyper, gms);
const insideMega = new Stance(stances.InsideMega, aerial);
const outsideComplete = new Stance(stances.OutsideComplete, lotus);
const outsideSemi = new Stance(stances.OutsideSemi, raiz);
const frontsideSemi = new Stance(stances.FrontsideSemi, badsideWebster);
const frontsideMega = new Stance(stances.FrontsideMega, webster);

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

export const transArr = [];
Object.keys(transitions).map((e) => {
	Object.keys(transitions[e]).map((c) => transArr.push(transitions[e][c]));
});
transArr.push(cheatRtoL, swingLtoL, swingRtoL, swingRtoR, swingLtoR);
console.table(transArr);

export const stanceArr = [];
Object.keys(stances).map((e) => {
	stanceArr.push(stances[e]);
});
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

const bases = [
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
// console.log("TRANSITIONS");
// console.table(transitions.sequential);
// console.table(transitions.singular);
// console.table(transitions.unified);
console.table(stanceArr);
console.table(kickVariationsArr);
console.table(TrickListArr);
console.table(bases);
console.table(stances);
