import create from "zustand";

export const useTrickMakerStore = create((set) => ({
	trickType: "",
	name: "",
	takeoffStance: "",
	landingStance: "",
	variationsArr: [],
	base_id: "",
	setTrickType: (value) => set(() => ({ trickType: value })),
	setName: (value) => set(() => ({ name: value })),
	setTakeoffStance: (value) => set(() => ({ takeoffStance: value })),
	setLandingStance: (value) => set(() => ({ landingStance: value })),
	setVariationsArr: (value) => set((s) => ({ variationsArr: value })),
	addVariation: (value) =>
		set((s) => ({ variationsArr: [...s.variationsArr, value] })),
	removeVariation: (value) =>
		set((s) => ({
			variationsArr: [...s.variationsArr]?.filter((t, i) => t !== value),
		})),
	setBase_id: (value) => set(() => ({ base_id: value })),
}));
