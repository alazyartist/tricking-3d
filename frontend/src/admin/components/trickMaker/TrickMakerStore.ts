import create from "zustand";
interface TrickMakerStore {
  trickType: string;
  name: null | string;
  takeoffStance: any;
  landingStance: any;
  landingStancePoints: number;
  variationsArr: any[];
  basePoints: number;
  base_id: string;
  getTrickInfo: () => void;
  clearTrickInfo: () => void;
  setTrickType: (value: string) => void;
  setName: (value: string) => void;
  setTakeoffStance: (value: any) => void;
  setLandingStance: (value: any) => void;
  setLandingStancePoints: (value: number) => void;
  setVariationsArr: (value: any) => void;
  addVariation: (value: any) => void;
  removeVariation: (value: any) => void;
  setBase_id: (value: string) => void;
  setBasePoints: (value: number) => void;
}
export const useTrickMakerStore = create<TrickMakerStore>((set, get) => ({
  trickType: "Invert",
  name: null,
  takeoffStance: "",
  landingStance: "",
  landingStancePoints: 0,
  variationsArr: [],
  basePoints: 0,
  base_id: "",
  getTrickInfo: () => ({
    trickType: get().trickType,
    name: get().name,
    takeoffStance: get().takeoffStance,
    landingStance: get().landingStance,
    variationsArr: get().variationsArr,
    base_id: get().base_id,
  }),
  clearTrickInfo: () =>
    set((s) => ({
      trickType: s.trickType,
      name: s.name,
      takeoffStance: s.takeoffStance,
      landingStance: s.landingStance,
      variationsArr: s.variationsArr,
      base_id: s.base_id,
    })),
  setTrickType: (value) => set(() => ({ trickType: value })),
  setName: (value) => set(() => ({ name: value })),
  setTakeoffStance: (value) => set(() => ({ takeoffStance: value })),
  setLandingStance: (value) => set(() => ({ landingStance: value })),
  setLandingStancePoints: (value) =>
    set(() => ({ landingStancePoints: value })),
  setVariationsArr: (value) => set((s) => ({ variationsArr: value })),
  addVariation: (value) =>
    set((s) => ({ variationsArr: [...s.variationsArr, value] })),
  removeVariation: (value) =>
    set((s) => ({
      variationsArr: [...s.variationsArr]?.filter((t, i) => t !== value),
    })),
  setBase_id: (value) => set(() => ({ base_id: value })),
  setBasePoints: (value) => set(() => ({ basePoints: value })),
}));
