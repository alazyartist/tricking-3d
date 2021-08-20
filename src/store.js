import create from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create(
	devtools((set) => ({
		animationsArray: [
			//Uncomment Below Array and everything works fine. Not the solution desired.
			"Au",
			"BackFlip",
			"BadRaiz",
			"Cartwheel",
			"FrontFlip",
			"Helicoptero",
			"Idle",
			"RoundKick",
		],
		modelValue: true,
		isPlaying: true,
		isPaused: true,
		setIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
		setIsPaused: () => set((state) => ({ isPaused: !state.isPaused })),
		aI: 0,
		modelArray: [],
		updateAnimationArray: (value) =>
			set((state) => ({
				animationsArray: [...state.animationsArray, value],
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
