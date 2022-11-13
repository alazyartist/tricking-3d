import create from "zustand";

export const useTrickMakerStore = create((set, get) => ({
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
