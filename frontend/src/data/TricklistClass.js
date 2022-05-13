export class Base {
	constructor(name, direction, stance) {
		this.name = name;
		this.base = true;
		this.direction = direction;
		this.stance = stance;
		this.rotation = 0;
		this.takeoffStance = stance;
		this.landingStance = stance;
		this.takeoffStyle = styles.unified;
		this.landingStyle = styles.unified;
	}
}

export class Trick {
	constructor(name, base) {
		this.name = name;
		this.touchdowns = "";
		this.kicks = "";
		this.grabs = "";
		this.shapes = "";
		this.variations = {
			rotations,
			kicks,
			grabs,
			shapes,
			stances,
			styles,
		};
	}
}

export class Transition {
	constructor(name) {
		this.name = name;
		this.landingStance = "";
		this.landingStyle = "";
		this.transitionType = "";
		this.takeoffStance = "";
		this.takeoffStyle = "";
	}
}
export const directions = {
	Backwards: "Traveling Backwards",
	Forwards: "Traveling Forwards",
	Inside: "Inside: To the left",
	Outside: "Outside: To The right",
};
export const stances = {
	Backside: "Backside",
	Frontside: "Frontside",
	Inside: "Inside",
	Outside: "Outside",
	BacksideComplete: "BacksideComplete",
	OutsideComplete: "OutsideComplete",
	OutsideSemi: "OutsideSemi",
	FrontsideSemi: "FrontsideSemi",
	FrontsideMega: "FrontsideMega",
	InsideMega: "InsideMega",
	InsideHyper: "InsideHyper",
	BacksideHyper: "BacksideHyper",
};
export const styles = {
	singular: "Singular",
	sequential: "Sequential",
	unified: "Unified",
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
	"sailor moon": "left hand - entrance",
	"venus moon": "right hand - entrance",
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

export const transitions = {};

export const pureSetups = {
	"J-Step": "J-Step",
	"Euro-Step": "Euro-Step",
	"K-Step": "K-Step",
	Cheat: "Cheat Step",
	Pivot: "Pivot Step",
	Spin: "Spin Step",
	Skip: "Skip Step",
};
const backflip = new Base("Backflip", directions.Backwards, stances.Backside);
const frontflip = new Base("Frontflip", directions.Forwards, stances.Frontside);
const insideflip = new Base("Insideflip", directions.Inside, stances.Inside);
const outsideflip = new Base(
	"Outsideflip",
	directions.Outside,
	stances.Outside
);

const full = new Trick("full", frontflip);
full.rotation = rotations.full;
full.direction = directions.Backwards;
full.landingStance = stances.Backside;
full.takeoffStance = stances.Backside;
full.landingStyle = styles.unified;
full.takeoffStyle = styles.unified;

const cork = new Trick("cork");
cork.base = full;
cork.rotation = rotations.full;
cork.direction = full.direction;
cork.landingStance = stances.BacksideComplete;
cork.landingStyle = styles.sequential;
cork.takeoffStyle = styles.singular;
cork.takeoffStance = stances.BacksideComplete;

const aerial = new Trick("Aerial");
aerial.base = insideflip;
aerial.rotation = rotations.zero;
aerial.takeoffStance = stances.FrontsideMega;
aerial.takeoffStyle = styles.sequential;
aerial.direction = directions.Inside;
aerial.landingStance = stances.BacksideHyper;
aerial.landingStyle = styles.sequential;
const doublecork = new Trick("doublecork");
doublecork.base = backflip;
doublecork.direction = directions.Backwards;
doublecork.rotation = rotations.double;
doublecork.landingStance = stances.BacksideComplete;
doublecork.takeoffStance = stances.BacksideComplete;
doublecork.landingStyle = styles.singular;
doublecork.takeoffStyle = styles.singular;
export const TrickListArr = [
	aerial,
	backflip,
	frontflip,
	insideflip,
	outsideflip,
	full,
	cork,
	doublecork,
];
console.log(TrickListArr);
console.log(cork);
