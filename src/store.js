import create from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create(
	devtools((set) => ({
		animationsArray: [],
		modelValue: true,
		isPlaying: true,
		isPaused: true,
		setIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
		setIsPaused: () => set((state) => ({ isPaused: !state.isPaused })),
		aI: 0,
		modelArray: [],
		updateAnimationArray: (value) =>
			set(() => ({
				animationsArray: [...value],
			})),
		animationSelector: () =>
			set((state) => ({
				aI: (state.aI + 1) % state.animationsArray.length,
				isPlaying: true,
				isPaused: true,
			})),
		modelSelector: () => set((state) => ({ modelValue: !state.modelValue })),
	}))
);
