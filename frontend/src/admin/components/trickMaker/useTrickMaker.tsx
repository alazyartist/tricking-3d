import { useTrickMakerStore } from "./TrickMakerStore";

const useTrickMaker = () => {
  const trickType = useTrickMakerStore((s) => s.trickType);
  const name = useTrickMakerStore((s) => s.name);
  //   const takeoffStance = useTrickMakerStore((s) => s.takeoffStance);
  //   const landingStance = useTrickMakerStore((s) => s.landingStance);
  //   const base_id = useTrickMakerStore((s) => s.base_id);
  //   const variationsArr = useTrickMakerStore((s) => s.variationsArr);
  //   const setTrickType = useTrickMakerStore((s) => s.setTrickType);
  //   const setName = useTrickMakerStore((s) => s.setName);
  //   const setTakeoffStance = useTrickMakerStore((s) => s.setTakeoffStance);
  //   const setLandingStance = useTrickMakerStore((s) => s.setLandingStance);
  //   const setBase_id = useTrickMakerStore((s) => s.setBase_id);
  //   const setVariationsArr = useTrickMakerStore((s) => s.setVariationsArr);
  //   const addVariation = useTrickMakerStore((s) => s.addVariation);
  //   const removeVariation = useTrickMakerStore((s) => s.removeVariation);

  return { trickType, name };
};

export default useTrickMaker;
