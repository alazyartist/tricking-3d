export class Trick {
	constructor(name) {
		this.name = name;
		this.direction = "";
		this.takeoffStance = "";
		this.takeoffStyle = "";
		this.base = "";
		this.rotation = "";
		this.kicks = "";
		this.grabs = "";
		this.shapes = "";
		this.variations = {
			rotations,
			kicks,
			grabs,
			shapes,
		};
		this.landingStance = "";
		this.landingStyle = "";
		this.touchdowns = "";
	}
}

export class Base {
	constructor(name, direction, stance) {
		this.name = name;
		this.direction = direction;
		this.stance = stance;
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
	singular: "singular",
	sequential: "sequential",
	unified: "unified",
};
export const rotations = {
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
const backflip = new Trick("Backflip");
backflip.base = "base";
backflip.direction = directions.Backwards;
backflip.takeoffStyle = styles.unified;
backflip.landingStyle = styles.unified;
backflip.landingStance = stances.BacksideComplete;
backflip.takeoffStance = stances.BacksideComplete;

const frontflip = new Trick("Frontflip");
frontflip.base = "base";
frontflip.direction = directions.Forwards;
frontflip.landingStyle = styles.unified;
frontflip.takeoffStyle = styles.unified;
frontflip.landingStance = stances.Frontside;
frontflip.takeoffStance = stances.Frontside;

const insideflip = new Trick("insideflip");
insideflip.base = "base";
insideflip.direction = directions.Inside;
insideflip.landingStyle = styles.unified;
insideflip.takeoffStyle = styles.unified;
insideflip.landingStance = stances.FrontsideMega;
insideflip.takeoffStance = stances.FrontsideMega;

const outsideflip = new Trick("outsideflip");
outsideflip.base = "base";
outsideflip.direction = directions.Outside;
outsideflip.landingStyle = styles.unified;
outsideflip.takeoffStyle = styles.unified;
outsideflip.landingStance = stances.FrontsideMega;
outsideflip.takeoffStance = stances.FrontsideMega;

const full = new Trick("full");
full.base = backflip;
full.direction = directions.Backwards;
full.landingStance = stances.BacksideComplete;
full.takeoffStance = stances.BacksideComplete;
full.landingStyle = styles.unified;
full.takeoffStyle = styles.unified;

const cork = new Trick("cork");
cork.base = full;
cork.direction = full.direction;
cork.landingStance = stances.BacksideComplete;
cork.landingStyle = styles.sequential;
cork.takeoffStyle = styles.singular;
cork.takeoffStance = stances.BacksideComplete;

const aerial = new Trick("Aerial");
aerial.base = insideflip;
aerial.takeoffStance = stances.FrontsideMega;
aerial.takeoffStyle = styles.sequential;
aerial.direction = directions.Inside;
aerial.landingStance = stances.BacksideHyper;
aerial.landingStyle = styles.sequential;
const doublecork = new Trick("doublecork");

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
