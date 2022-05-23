import { stances, styles, legs } from "./TrickObjects";

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
	getRotation() {
		return this.rotation;
	}
	getNewRotation(currentStance) {
		if (this.rotation == 0) {
			console.log("Im Zero Rotation Transition");
			return this.rotation;
		} else if (this.rotation == 180) {
			let newRot = stances[currentStance]?.getRotation() + (180 % 360);
			console.log("newRotation", newRot, stances[currentStance]?.getRotation());
			return newRot;
		}
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
	constructor(name, trick, style, rotation) {
		this.name = name;
		this.trick = trick;
		this.style = style || styles.singular;
		this.leg = trick.fromLeg;
		this.direction = trick.direction;
		this.stanceRotation = rotation || 0;
	}
	getRotation() {
		return this.stanceRotation;
	}
	getNewStance(currentLeg) {
		if (this.stanceRotation == 0 && currentLeg == "Both") {
			let curRot = "Backside";
			return curRot;
		} else if (this.stanceRotation == 90 && currentLeg == "Both") {
			let curRot = "Inside";
			return curRot;
		} else if (this.stanceRotation == 180 && currentLeg == "Both") {
			let curRot = "Frontside";
			return curRot;
		} else if (this.stanceRotation == 270 && currentLeg == "Both") {
			let curRot = "Outside";
			return curRot;
		}
		if (this.stanceRotation == 0 && currentLeg == "Left") {
			let curRot = "BacksideComplete";
			return curRot;
		} else if (this.stanceRotation == 90 && currentLeg == "Left") {
			let curRot = "InsideMega";
			return curRot;
		} else if (this.stanceRotation == 180 && currentLeg == "Left") {
			let curRot = "FrontsideMega";
			return curRot;
		} else if (this.stanceRotation == 270 && currentLeg == "Left") {
			let curRot = "OutsideComplete";
			return curRot;
		}
		if (this.stanceRotation == 0 && currentLeg == "Right") {
			let curRot = "BacksideHyper";
			return curRot;
		} else if (this.stanceRotation == 90 && currentLeg == "Right") {
			let curRot = "InsideHyper";
			return curRot;
		} else if (this.stanceRotation == 180 && currentLeg == "Right") {
			let curRot = "FrontsideSemi";
			return curRot;
		} else if (this.stanceRotation == 270 && currentLeg == "Right") {
			let curRot = "OutsideSemi";
			return curRot;
		}
	}

	getStanceByRotation(rotation, currentLeg) {
		if (rotation == 0 && currentLeg == "Both") {
			let curRot = "Backside";
			return curRot;
		} else if (rotation == 90 && currentLeg == "Both") {
			let curRot = "Inside";
			return curRot;
		} else if (rotation == 180 && currentLeg == "Both") {
			let curRot = "Frontside";
			return curRot;
		} else if (rotation == 270 && currentLeg == "Both") {
			let curRot = "Outside";
			return curRot;
		}
		if (rotation == 0 && currentLeg == "Left") {
			let curRot = "BacksideComplete";
			return curRot;
		} else if (rotation == 90 && currentLeg == "Left") {
			let curRot = "InsideMega";
			return curRot;
		} else if (rotation == 180 && currentLeg == "Left") {
			let curRot = "FrontsideMega";
			return curRot;
		} else if (rotation == 270 && currentLeg == "Left") {
			let curRot = "OutsideComplete";
			return curRot;
		}
		if (rotation == 0 && currentLeg == "Right") {
			let curRot = "BacksideHyper";
			return curRot;
		} else if (rotation == 90 && currentLeg == "Right") {
			let curRot = "InsideHyper";
			return curRot;
		} else if (rotation == 180 && currentLeg == "Right") {
			let curRot = "FrontsideSemi";
			return curRot;
		} else if (rotation == 270 && currentLeg == "Right") {
			let curRot = "OutsideSemi";
			return curRot;
		}
	}
	getTrick() {
		return this.trick;
	}
}
