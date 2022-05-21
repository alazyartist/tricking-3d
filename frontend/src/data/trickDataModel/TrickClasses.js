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
	constructor(name, trick, style) {
		this.name = name;
		this.trick = trick;
		this.style = style || styles.singular;
		this.leg = trick.fromLeg;
		this.direction = trick.direction;
	}
	getTrick() {
		return this.trick;
	}
}
