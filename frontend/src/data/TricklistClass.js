import { FaStarAndCrescent } from "react-icons/fa";

export class Base {
	constructor(name, direction, stance) {
		this.name = name;
		this.base = "IsBaseClass";
		this.direction = direction;
		this.stance = stance;
		this.rotation = 0;
		this.takeoffStance = stance;
		this.landingStance = stances.B;
		this.takeoffStyle = styles.unified;
		this.landingStyle = styles.unified;
	}
}

export class Trick {
	constructor(name, base, stance, style) {
		this.name = name;
		this.base = base.name;
		this.rotation = base.rotation;
		this.direction = base.direction;
		this.takeoffStance = stance || base.stance;
		this.takeoffStyle = style || base.style;
		this.landingStance = stance || base.stance;
		this.landingStyle = style || base.style;
		this.stance = this.takeoffStance || base.stance;
		this.fromLeg = this.landingStance;
		// this.variations = {
		// 	rotations,
		// 	kicks,
		// 	grabs,
		// 	shapes,
		// 	stances,
		// 	styles,
		// };
	}
}

export class Transition {
	constructor(
		name,
		fromStyle,
		toStyle,
		fromleg = `${styles.unified}`,
		toleg = `${styles.unified}`
	) {
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
	constructor(name, baseStance, leg, trick) {
		this.name = name;
		this.baseStance = baseStance;
		this.trick = trick;
		this.style = styles.singular;
		this.leg = leg;
		this.direction = trick.direction;
	}
}
export const legs = {
	L: "Left",
	R: "Right",
	LorR: "L or R",
	Both: "Both",
};
export const combo = function combo() {
	let combo = [];
	for (let i = 0; i < arguments.length; i++) {
		combo.push(arguments[i]);
	}
	return combo;
};
export const directions = {
	Backwards: "Traveling Backwards",
	Forwards: "Traveling Forwards",
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
	B: "Backside",
	I: "Inside",
	F: "Frontside",
	O: "Outside",
	BC: "BacksideComplete",
	OC: "OutsideComplete",
	OS: "OutsideSemi",
	FS: "FrontsideSemi",
	FM: "FrontsideMega",
	IM: "InsideMega",
	IH: "InsideHyper",
	BH: "BacksideHyper",
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
// stances.Any = [...any];
stances.Any = "Any";
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

export const transitions = { singular, sequential, unified };
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
const backflip = new Base("Backflip", directions.Backwards, stances.B);
const frontflip = new Base("Frontflip", directions.Forwards, stances.F);
const insideflip = new Base("Insideflip", directions.Inside, stances.I);
const outsideflip = new Base("Outsideflip", directions.Outside, stances.O);

const full = new Trick("full", backflip);
full.rotation = rotations.full;
full.direction = directions.Backwards;
full.landingStance = stances.B;
full.takeoffStance = stances.B;
full.landingStyle = styles.unified;
full.takeoffStyle = styles.unified;

const cork = new Trick("cork", backflip);
cork.rotation = rotations.full;
cork.direction = full.direction;
cork.landingStance = stances.BC;
cork.landingStyle = styles.sequential;
cork.takeoffStyle = styles.singular;
cork.takeoffStance = stances.BC;

const aerial = new Trick("Aerial", insideflip);
aerial.rotation = rotations.zero;
aerial.takeoffStance = stances.IM;
aerial.takeoffStyle = styles.sequential;
aerial.direction = directions.Inside;
aerial.landingStance = stances.BH;
aerial.landingStyle = styles.sequential;
aerial.stance = stances.IM;

const doublecork = new Trick("doublecork", backflip);
doublecork.direction = directions.Backwards;
doublecork.rotation = rotations.double;
doublecork.landingStance = stances.BC;
doublecork.takeoffStance = stances.BC;
doublecork.landingStyle = styles.singular;
doublecork.takeoffStyle = styles.singular;
doublecork.stance = stances.BC;

const gms = new Trick("GMS", insideflip);
gms.landingStance = stances.IM;
gms.takeoffStance = stances.IH;
gms.takeoffStyle = styles.singular;
gms.landingStyle = styles.sequential;

const webster = new Trick("Webster", frontflip, stances.FM, styles.singular);

const raiz = new Trick("Raiz", outsideflip);
raiz.takeoffStance = stances.OS;
raiz.landingStance = stances.BC;
raiz.takeoffStyle = styles.singular;
raiz.landingStyle = styles.sequential;

const lotus = new Trick("Lotus", outsideflip, stances.OC, styles.singular);
const gainer = new Trick("Gainer", backflip, stances.BC, styles.singular);
const corksnapu = new Trick("Corksnapu", backflip, stances.BC, styles.singular);

const cartwheel = new Trick(
	"Cartwheel",
	insideflip,
	stances.FM,
	styles.singular
);
cartwheel.touchdowns = "Cart";
corksnapu.rotation = 720;

const touchdownRaiz = new Trick(
	"Touchdown Raiz",
	outsideflip,
	stances.OS,
	styles.singular
);
touchdownRaiz.touchdowns = "Touchdown";

export const TrickListArr = [
	backflip,
	insideflip,
	frontflip,
	outsideflip,
	gainer,
	aerial,
	gms,
	webster,
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
	legs.L,
	legs.Both
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
const cheat = new Transition(
	"Cheat",
	styles.singular,
	styles.singular,
	legs.LorR,
	legs.LorR
);
cheat.rotation = 180;
const redirect = new Transition(
	"Redirect:SkipReversal",
	styles.singular,
	styles.singular,
	legs.LorR,
	legs.LorR
);

transitions.sequential["Skip Reversal"] = redirect;
transitions.sequential.Cheat = cheat;
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

const backsideComplete = new Stance(stances.BC, stances.B, legs.L, gainer);

// newComboStateArr.length = 0;
const backside = new Stance(stances.B, stances.B, legs.Both, backflip);
const frontside = new Stance(stances.F, stances.F, legs.Both, frontflip);
const inside = new Stance(stances.I, stances.I, legs.Both, insideflip);
const outside = new Stance(stances.O, stances.O, legs.Both, outsideflip);
const backsideHyper = new Stance(stances.BH, stances.B, legs.R, gainer);
const insideHyper = new Stance(stances.IH, stances.I, legs.R, gms);
const insideMega = new Stance(stances.IM, stances.I, legs.L, aerial);
const outsideComplete = new Stance(stances.OC, stances.O, legs.L, lotus);
const outsideSemi = new Stance(stances.OS, stances.O, legs.R, raiz);
const frontsideSemi = new Stance(stances.FS, stances.F, legs.R, webster);
const frontsideMega = new Stance(stances.FM, stances.F, legs.L, webster);

stances.B = backside;
stances.I = inside;
stances.F = frontside;
stances.O = outside;
stances.BC = backsideComplete;
stances.BH = backsideHyper;
stances.IH = insideHyper;
stances.IM = insideMega;
stances.OC = outsideComplete;
stances.OS = outsideSemi;
stances.FM = frontsideMega;
stances.FS = frontsideSemi;

export const transArr = [];
Object.keys(transitions).map((e) => {
	Object.keys(transitions[e]).map((c) => transArr.push(transitions[e][c]));
});
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
// console.log("TRANSITIONS");
// console.table(transitions.sequential);
// console.table(transitions.singular);
// console.table(transitions.unified);
console.table(TrickListArr);
console.table(stanceArr);
console.table(kickVariationsArr);
console.table(stances);
