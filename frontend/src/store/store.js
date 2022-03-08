import create from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create(
	devtools((set, api) => ({
		aI: 0,
		addToAnimationArray: (value) =>
			set((state) => ({ animationsArray: [...state.animationsArray, value] })),
		animationSelector: () =>
			set((state) => ({
				aI: (state.aI + 1) % state.animationsArray.length,
				isPlaying: true,
				isPaused: false,
			})),
		animationsArray: [],
		bounce: true,
		clipDuration: 0,
		currentAnim: "BTwist",
		currentTime: 0,
		end: 1,
		modelValue: "Frank",
		isPlaying: true,
		setIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
		isPaused: false,
		isScrubbing: 0, // 0: No, 1: Start, 2: End
		loop: true,
		setLoop: () => set((state) => ({ loop: !state.loop })),
		bounce: true,
		setBounce: () => set((state) => ({ bounce: !state.bounce })),
		aI: 0,
		modelArray: ["Frank", "AlexKerwood", "AndrewKohrt"],
		updateAnimationArray: (value) =>
			set(() => ({
				animationsArray: [...value],
			})),
		addToAnimationArray: (value) =>
			set((state) => ({
				animationsArray: [...state.animationsArray, value],
			})),
		animationSelector: () =>
			set((state) => ({
				aI: (state.aI + 1) % state.animationsArray.length,
				isPlaying: true,
				isPaused: false,
			})),
		selectAnim: (value) =>
			set(() => ({
				currentAnim: value,
			})),
		currentAnim: "Backflip",
		modelSelector: (value) => set(() => ({ modelValue: value })),
		position: [],
		selectAnim: (value) => set(() => ({ currentAnim: value })),
		setBounce: () => set((state) => ({ bounce: !state.bounce })),
		setClipDuration: (value) => set(() => ({ clipDuration: value })),
		setCurrentTime: (value) => set(() => ({ currentTime: value })),
		setFredPosition: (value) => set(() => ({ position: [value] })),
		setIsPaused: () => set((state) => ({ isPaused: !state.isPaused })),
		setLoop: () => set((state) => ({ loop: !state.loop })),
		setScrubbing: (value) => set((state) => ({ isScrubbing: value })),
		setSlider: (value) => set(() => ({ timeSlider: value })),
		setSliderEnd: (value) => set(() => ({ end: value })),
		setSliderStart: (value) => set(() => ({ start: value })),
		setTimescale: (value) => set(() => ({ timescale: value })),
		setTrimToggle: () => set((state) => ({ trimToggle: !state.trimToggle })),
		start: 0,
		timeSlider: 1,
		timescale: 1,
		trimToggle: false,
		updateAnimationArray: (value) =>
			set(() => ({ animationsArray: [...value] })),
	}))
);
