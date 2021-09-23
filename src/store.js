import create from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create(
	devtools((set) => ({
		animationsArray: [],
		modelValue: true,
		isPlaying: true,
		setIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
		isPaused: false,
		setIsPaused: () => set((state) => ({ isPaused: !state.isPaused })),
		timescale: 1,
		setTimescale: (value) => set((state) => ({ timescale: value })),
		loop: true,
		setLoop: () => set((state) => ({ loop: !state.loop })),
		bounce: true,
		setBounce: () => set((state) => ({ bounce: !state.bounce })),
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
		position: [],
		setFredPosition: (value) => set(() => ({ position: [value] })),
	}))
);
