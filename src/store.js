import create from "zustand";

export const useStore = create((set) => ({
	animationsArray: ["Bkick", "Backflip"],
	modelValue: true,
	isPlaying: false,
	setIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
	aI: 0,
	modelArray: [],
	updateAnimationArray: () =>
		set((state) => ({
			animationsArray: state.animationsArray,
		})),
	animationSelector: () =>
		set((state) => ({
			aI: (state.aI + 1) % state.animationsArray.length,
		})),
	modelSelector: () => set((state) => ({ modelValue: !state.modelValue })),
}));
