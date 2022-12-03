import {
  Base,
  Trick,
  Stance,
  Variation,
  Transition,
  Kick,
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
  "Backside",
  legs.Both,
  legs.Both,
  styles.unified
);
const frontflipB = new Base(
  "Frontflip",
  directions.Forwards,
  "Frontside",
  legs.Both,
  legs.Both,
  styles.unified
);
const insideflipB = new Base(
  "Insideflip",
  directions.Inside,
  "Inside",
  legs.Both,
  legs.Both,
  styles.unified
);
const outsideflipB = new Base(
  "Outsideflip",
  directions.Outside,
  "Outside",
  legs.Both,
  legs.Both,
  styles.unified
);
//Left
const gainerL = new Base(
  "Gainer",
  directions.Backwards,
  "BacksideComplete",
  legs.L,
  legs.R
);
const websterL = new Base(
  "Webster",
  directions.Forwards,
  "FrontsideMega",
  legs.L,
  legs.R
);
const aerialL = new Base(
  "Aerial",
  directions.Inside,
  "InsideMega",
  legs.L,
  legs.R
);
const lotusL = new Base(
  "Lotus",
  directions.Outside,
  "OutsideComplete",
  legs.L,
  legs.L
);
//Right
const gainerR = new Base(
  "GainerR",
  directions.Backwards,
  "BacksideHyper",
  legs.R,
  legs.L,
  styles.singular
);
gainerR.landingStance = "BacksideComplete";
const websterR = new Base(
  "WebsterR",
  directions.Forwards,
  "FrontsideSemi",
  legs.R,
  legs.L,
  styles.singular
);
const gmsR = new Base(
  "Gms",
  directions.Inside,
  "InsideHyper",
  legs.R,
  legs.R,
  styles.singular
);
const raizR = new Base(
  "Raiz",
  directions.Outside,
  "OutsideSemi",
  legs.R,
  legs.L,
  styles.singular
);
raizR.rotation = 180;

const backflip = new Trick("Backflip", backflipB, "Backside", styles.unified);
const frontflip = new Trick(
  "Frontflip",
  frontflipB,
  "Frontside",
  styles.unified
);
const insideflip = new Trick(
  "Insideflip",
  insideflipB,
  "Inside",
  styles.unified
);
const outsideflip = new Trick(
  "Outsideflip",
  outsideflipB,
  "Outside",
  styles.unified
);

const full = new Trick("Full", backflipB, "Backside", styles.unified);
full.rotation = rotations.full;
full.landingStance = "BacksideComplete";
full.toLeg = legs.L;

const cork = new Trick("Cork", gainerL, "BacksideComplete", styles.singular);
cork.rotation = rotations.full;

cork.toLeg = legs.L;

const aerial = new Trick("Aerial", aerialL, "InsideMega", styles.singular);
// aerial.stance = "InsideMega";
// aerial.rotation = rotations.zero;
aerial.takeoffStance = "InsideMega";
aerial.landingStance = "InsideHyper";
aerial.takeoffStyle = styles.singular;
// aerial.direction = directions.Inside;
aerial.landingStyle = styles.singular;

const atwist = new Trick("ATwist", aerialL, "InsideMega", styles.singular);
atwist.toLeg = legs.L;
atwist.landingStance = "BacksideComplete";
atwist.rotation = 270;
const btwist = new Trick("Btwist", atwist, "InsideMega", styles.singular);
btwist.landingStance = "BacksideComplete";

const doublecork = new Trick(
  "Doublecork",
  cork,
  "BacksideComplete",
  styles.singular
);
doublecork.direction = directions.Backwards;
doublecork.rotation = rotations.double;
doublecork.landingStance = "BacksideComplete";
doublecork.takeoffStance = "BacksideComplete";
doublecork.landingStyle = styles.singular;
doublecork.takeoffStyle = styles.singular;

const gms = new Trick("GMS", gmsR, "InsideHyper", styles.singular);
const gmTwist = new Trick("GMTwist", gmsR, "InsideHyper", styles.singular);
gmTwist.rotation = 270;
gmTwist.landingStance = "BacksideComplete";
gmTwist.toLeg = legs.L;
const kroc = new Trick("Kroc", gainerR, "BacksideHyper", styles.singular);
kroc.rotation = 360;
kroc.landingStance = "BacksideComplete";
kroc.toLeg = legs.L;

const webster = new Trick(
  "Webster",
  websterL,
  "FrontsideMega",
  styles.singular
);
const badsideWebster = new Trick(
  "Badside Webster",
  websterR,
  "FrontsideSemi",
  styles.singular
);

const raiz = new Trick("Raiz", raizR);
raiz.takeoffStance = "OutsideSemi";
raiz.landingStance = "BacksideComplete";
raiz.takeoffStyle = styles.singular;
raiz.landingStyle = styles.singular;

const lotus = new Trick("Lotus", lotusL, "OutsideComplete", styles.singular);
const gainer = new Trick(
  "Gainer",
  gainerL,
  "BacksideComplete",
  styles.singular
);
gainer.landingStance = "BacksideHyper";
const badsideGainer = new Trick(
  "GainerR",
  gainerR,
  "BacksideHyper",
  styles.singular
);
badsideGainer.landingStance = "BacksideComplete";
const gainerSwitch = new Trick(
  "GainerSwitch",
  gainerL,
  "BacksideComplete",
  styles.singular
);
gainerSwitch.toLeg = legs.L;
const corksnapu = new Trick(
  "Corksnapu",
  cork,
  "BacksideComplete",
  styles.singular
);

const cartwheel = new Trick(
  "Cartwheel",
  aerialL,
  "InsideMega",
  styles.singular
);
cartwheel.touchdowns = "Cart";
corksnapu.rotation = 720;

const touchdownRaiz = new Trick(
  "Touchdown Raiz",
  raizR,
  "OutsideSemi",
  styles.singular
);
touchdownRaiz.landingStance = "BacksideComplete";
touchdownRaiz.touchdowns = "Touchdown";

const wrapFull = new Trick("WrapFull", full, "BacksideHyper", styles.singular);
wrapFull.fromLeg = "Right";
wrapFull.landingStance = "BacksideComplete";

const frontFull = new Trick(
  "Frontfull",
  frontflip,
  "Frontside",
  styles.unified
);
frontFull.rotation = 360;

const raizTwist = new Trick("Raiz Twist", raiz, "OutsideSemi", styles.singular);
raizTwist.rotation = 540;

export const TrickListArr: any[] = [
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
  wrapFull,
  frontFull,
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
carryThrough.rotation = 180;
export const wrapR = new Transition(
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
cheatLtoR.rotation = 180;
const cheatRtoL = new Transition(
  "Cheat",
  styles.singular,
  styles.singular,
  legs.R,
  legs.L
);
cheatRtoL.rotation = 180;
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

// transitions.singular.Misleg = mislegR;
// transitions.sequential["Skip Reversal"] = redirectLtoR;
// transitions.sequential.Cheat = cheatLtoR;
// transitions.singular.Wrap = wrapR;
// transitions.sequential.Skip = skipLtoR;
// transitions.singular["Carry Through"] = carryThrough;
// transitions.singular.Rapid = rapidR;
// transitions.singular["Reverse Pop"] = reversePopL;
// transitions.sequential.Reversal = reversal;
// transitions.sequential.Vanish = vanishLtoR;
// transitions.unified.Bound = bound;
// transitions.unified.Pop = popL;
// transitions.unified.Punch = punch;
// transitions.singular.Swing = swingLtoL;
// transitions.singular.Boneless = bonelessL;

const backside = new Stance("Backside", backflip, styles.unified, 0);
const frontside = new Stance("Frontside", frontflip, styles.unified, 180);
const inside = new Stance("Inside", insideflip, styles.unified, 90);
const outside = new Stance("Outside", outsideflip, styles.unified, 270);
const backsideComplete = new Stance(
  "BacksideComplete",
  gainer,
  styles.singular,
  0
);
const backsideHyper = new Stance(
  "BacksideHyper",
  badsideGainer,
  styles.singular,
  0
);
const insideHyper = new Stance("InsideHyper", gms, styles.singular, 90);
const insideMega = new Stance("InsideMega", aerial, styles.singular, 90);
const outsideComplete = new Stance(
  "OutsideComplete",
  lotus,
  styles.singular,
  270
);
const outsideSemi = new Stance("OutsideSemi", raiz, styles.singular, 270);
const frontsideSemi = new Stance(
  "FrontsideSemi",
  badsideWebster,
  styles.singular,
  180
);
const frontsideMega = new Stance(
  "FrontsideMega",
  webster,
  styles.singular,
  180
);

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
const dragonflyR = new Variation("Dragonfly", {
  kicks: "Round",
  pos: positions.En,
});
const dragonflyH = new Variation("Dragonfly", {
  kicks: "Round",
  pos: positions.En,
});
//Backside
const bs180r = new Kick("Backside", "FrontsideMega", 180, "Round", "Backside");
const bs360h = new Kick("Backside", "BacksideHyper", 360, "Hook", "Backside");
const bs540r = new Kick("Backside", "FrontsideMega", 540, "Round", "Backside");
const bs720h = new Kick("Backside", "BacksideHyper", 720, "Hook", "Backside");
const bs900r = new Kick("Backside", "FrontsideMega", 900, "Round", "Backside");
const bs1080h = new Kick("Backside", "BacksideHyper", 1080, "Hook", "Backside");
const bs1260r = new Kick(
  "Backside",
  "FrontsideMega",
  1260,
  "Round",
  "Backside"
);
const bs1440h = new Kick("Backside", "BacksideHyper", 1440, "Hook", "Backside");
//Vanish
const v180r = new Kick(
  "BacksideHyper",
  "FrontsideMega",
  180,
  "Round",
  "Vanish"
);
const v360h = new Kick("BacksideHyper", "BacksideHyper", 360, "Hook", "Vanish");
const v540r = new Kick(
  "BacksideHyper",
  "FrontsideMega",
  540,
  "Round",
  "Vanish"
);
const v720h = new Kick("BacksideHyper", "BacksideHyper", 720, "Hook", "Vanish");
const v900r = new Kick(
  "BacksideHyper",
  "FrontsideMega",
  900,
  "Round",
  "Vanish"
);
const v1080h = new Kick(
  "BacksideHyper",
  "BacksideHyper",
  1080,
  "Hook",
  "Vanish"
);
const v1260r = new Kick(
  "BacksideHyper",
  "FrontsideMega",
  1260,
  "Round",
  "Vanish"
);
const v1440h = new Kick(
  "BacksideHyper",
  "BacksideHyper",
  1440,
  "Hook",
  "Vanish"
);
//Swing
const s180r = new Kick(
  "BacksideComplete",
  "FrontsideMega",
  180,
  "Round",
  "Swing"
);
const s360h = new Kick(
  "BacksideComplete",
  "BacksideHyper",
  360,
  "Hook",
  "Swing"
);
const s540r = new Kick(
  "BacksideComplete",
  "FrontsideMega",
  540,
  "Round",
  "Swing"
);
const s720h = new Kick(
  "BacksideComplete",
  "BacksideHyper",
  720,
  "Hook",
  "Swing"
);
const s900r = new Kick(
  "BacksideComplete",
  "FrontsideMega",
  900,
  "Round",
  "Swing"
);
const s1080h = new Kick(
  "BacksideComplete",
  "BacksideHyper",
  1080,
  "Hook",
  "Swing"
);
const s1260r = new Kick(
  "BacksideComplete",
  "FrontsideMega",
  1260,
  "Round",
  "Swing"
);
const s1440h = new Kick(
  "BacksideComplete",
  "BacksideHyper",
  1440,
  "Hook",
  "Swing"
);
//Pop
const p180h = new Kick("Frontside", "BacksideHyper", 180, "Hook", "Pop");
const p360r = new Kick("Frontside", "FrontsideMega", 360, "Round", "Pop");
const p540h = new Kick("Frontside", "BacksideHyper", 540, "Hook", "Pop");
const p720r = new Kick("Frontside", "FrontsideMega", 720, "Round", "Pop");
const p900h = new Kick("Frontside", "BacksideHyper", 900, "Hook", "Pop");
const p1080r = new Kick("Frontside", "FrontsideMega", 1080, "Round", "Pop");
const p1260h = new Kick("Frontside", "BacksideHyper", 1260, "Hook", "Pop");
const p1440r = new Kick("Frontside", "FrontsideMega", 1440, "Round", "Pop");
//Wrap
const w180h = new Kick("FrontsideSemi", "BacksideHyper", 180, "Hook", "Wrap");
const w360r = new Kick("FrontsideSemi", "FrontsideMega", 360, "Round", "Wrap");
const w540h = new Kick("FrontsideSemi", "BacksideHyper", 540, "Hook", "Wrap");
const w720r = new Kick("FrontsideSemi", "FrontsideMega", 720, "Round", "Wrap");
const w900h = new Kick("FrontsideSemi", "BacksideHyper", 900, "Hook", "Wrap");
const w1080r = new Kick(
  "FrontsideSemi",
  "FrontsideMega",
  1080,
  "Round",
  "Wrap"
);
const w1260h = new Kick("FrontsideSemi", "BacksideHyper", 1260, "Hook", "Wrap");
const w1440r = new Kick(
  "FrontsideSemi",
  "FrontsideMega",
  1440,
  "Round",
  "Wrap"
);
//StepOver
const so180h = new Kick(
  "FrontsideMega",
  "BacksideHyper",
  180,
  "Hook",
  "StepOver"
);
const so360r = new Kick(
  "FrontsideMega",
  "FrontsideMega",
  360,
  "Round",
  "StepOver"
);
const so540h = new Kick(
  "FrontsideMega",
  "BacksideHyper",
  540,
  "Hook",
  "StepOver"
);
const so720r = new Kick(
  "FrontsideMega",
  "FrontsideMega",
  720,
  "Round",
  "StepOver"
);
const so900h = new Kick(
  "FrontsideMega",
  "BacksideHyper",
  900,
  "Hook",
  "StepOver"
);
const so1080r = new Kick(
  "FrontsideMega",
  "FrontsideMega",
  1080,
  "Round",
  "StepOver"
);
const so1260h = new Kick(
  "FrontsideMega",
  "BacksideHyper",
  1260,
  "Hook",
  "StepOver"
);
const so1440r = new Kick(
  "FrontsideMega",
  "FrontsideMega",
  1440,
  "Round",
  "StepOver"
);

// Arrays
export const Kicks = [
  bs180r,
  bs360h,
  bs540r,
  bs720h,
  bs900r,
  bs1080h,
  bs1260r,
  bs1440h,
  v180r,
  v360h,
  v540r,
  v720h,
  v900r,
  v1080h,
  v1260r,
  v1440h,
  s180r,
  s360h,
  s540r,
  s720h,
  s900r,
  s1080h,
  s1260r,
  s1440h,
  w180h,
  w360r,
  w540h,
  w720r,
  w900h,
  w1080r,
  w1260h,
  w1440r,
  p180h,
  p360r,
  p540h,
  p720r,
  p900h,
  p1080r,
  p1260h,
  p1440r,
  so180h,
  so360r,
  so540h,
  so720r,
  so900h,
  so1080r,
  so1260h,
  so1440r,
];
export const transArr = [
  swingLtoL,
  swingLtoR,
  swingRtoL,
  swingRtoR,
  reversal,
  vanishLtoR,
  vanishRtoL,
  mislegL,
  mislegR,
  rapidL,
  rapidR,
  hopR,
  hopL,
  skipLtoR,
  skipRtoL,
  redirectLtoR,
  redirectRtoL,
  cheatLtoR,
  cheatRtoL,
  carryThrough,
  wrapR,
  bonelessL,
  bonelessR,
  popL,
  popR,
  reversePopL,
  reversePopR,
  punchL,
  punchR,
  punch,
  bound,
  jStep,
];
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

TrickListArr.push(...Kicks);
export const basesArr = [
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
  dragonflyR,
  dragonflyH,
  flash,
  swipe,
  round,
  lateRound,
  snapu,
  hook,
  shuriken,
  lateHook,
];

const newMap = basesArr.map((base) => {
  return {
    name: base.name,
    direction: base.direction,
    fromLeg: base.fromLeg,
    toLeg: base.toLeg,
    rotation: base.rotation,
    stance_id: base.takeoffStance,
    takeoffStance: base.takeoffStance,
    landingStance: base.landingStance,
  };
});

/*
console.log("newmap", newMap);
console.table(stanceArr);
console.table(kickVariationsArr);
console.table(basesArr);
console.table(stances);
console.table(transArr);
console.table(TrickListArr);
console.table(Kicks);
*/
