import create from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create(
	devtools((set) => ({
		animationsArray: ["Bkick", "Backflip"],
		modelValue: true,
		isPlaying: false,
		isPaused: true,
		setIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
		setIsPaused: () => set((state) => ({ isPaused: !state.isPaused })),
		aI: 0,
		modelArray: [],
		updateAnimationArray: () =>
			set((state, value) => ({
				animationsArray: value,
				...state.animationsArray,
			})),
		animationSelector: () =>
			set((state) => ({
				aI: (state.aI + 1) % state.animationsArray.length,
			})),
		modelSelector: () => set((state) => ({ modelValue: !state.modelValue })),
	}))
);
