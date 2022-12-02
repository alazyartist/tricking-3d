// legs, directions, positions, stanceOptions, stances,
export const legs = {
  L: "Left",
  R: "Right",
  LorR: "L or R",
  Both: "Both",
};

export const directions = {
  Backwards: "Backwards",
  Forwards: "Forwards:",
  Inside: "Inside:Left",
  Outside: "Outside:Right",
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

export const stances: any = {
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
      //@ts-ignore
      newUniqArr = [...new Set(newArr)];
    }
  }
  return newUniqArr;
}
// let any = BIFOCHMSSpread(stanceOptions.BIFO, stanceOptions.CHMS);
// stances.Any = [any];
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
