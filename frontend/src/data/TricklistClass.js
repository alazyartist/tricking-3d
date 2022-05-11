export class Trick {
	constructor(name) {
		this.name = name;
		this.takeoffStance = "";
		this.takeoffStyle = "";
		this.base = "";
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

export const stances = {
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
	singular: "",
	sequential: "",
	unified: "",
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

const cork = new Trick("cork");
cork.base = "full";
cork.landingStance = stances.BacksideComplete;
cork.landingStyle = styles.sequential;
cork.takeoffStyle = styles.singular;
cork.takeoffStance = stances.BacksideComplete;
console.log(cork);
