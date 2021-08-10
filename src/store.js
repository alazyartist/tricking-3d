import React from "react";
import create from "zustand";

export const useStore = create((set) => ({
	animationsArray: ["bkick", "backflip", "corkscrew", "doublefull"],
	modelValue: 0,
	aI: 0,
	modelArray: [],
	updateAnimationArray: () =>
		set((state) => ({ animationsArray: state.animationsArray.push() })),
	animationSelector: () =>
		set((state) => ({
			aI: (state.aI + 1) % state.animationsArray.length,
		})),
	//increasePopulation: () => set(state => ({ bears: state.bears + 1 })),

	modelSelector: () => set((state) => ({ modelValue: state.modelValue + 1 })),
}));
