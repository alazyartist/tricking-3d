import create from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create(
	devtools((set, api) => ({
		aI: 0,

		isFollowCam: true,
		setFollowCam: () => set((s) => ({ isFollowCam: !s.isFollowCam })),
		addToAnimationArray: (value) =>
			set((state) => ({ animationsArray: [...state.animationsArray, value] })),
		animationSelector: () =>
			set((state) => ({
				aI: (state.aI + 1) % state.animationsArray.length,
				isPlaying: true,
				isPaused: false,
			})),
		animationsArray: [],
		stanceColor: "#ffffff",
		setStanceColor: (value) => set(() => ({ stanceColor: value })),
		bounce: true,
		clipDuration: 0,
		currentAnim: "Touchdown Raiz",
		currentTime: 0,
		end: 1,
		modelValue: false,
		areInstructionsOpen: false,
		setInstructions: () =>
			set((s) => ({
				areInstructionsOpen: !s.areInstructionsOpen,
			})),
		activeModel: "Frank",
		isPlaying: true,
		setIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
		isPaused: false,
		isScrubbing: 0, // 0: No, 1: Start, 2: End
		loop: true,
		modelArray: ["Frank", "Kerwood", "Andrew"],
		setModel: (value) => set(() => ({ activeModel: value })),
		modelPosition: [],
		selectAnim: (value) => set(() => ({ currentAnim: value })),
		setBounce: () => set((state) => ({ bounce: !state.bounce })),
		setClipDuration: (value) => set(() => ({ clipDuration: value })),
		setCurrentTime: (value) => set(() => ({ currentTime: value })),
		setModelPosition: (value) => set(() => ({ modelPosition: [value] })),
		setIsPaused: () => set((state) => ({ isPaused: !state.isPaused })),
		setLoop: () => set((state) => ({ loop: !state.loop })),
		setScrubbing: (value) => set((state) => ({ isScrubbing: value })),
		setSlider: (value) => set(() => ({ timeSlider: value })),
		setSliderEnd: (value) => set(() => ({ end: value })),
		setSliderStart: (value) => set(() => ({ start: value })),
		showUI: true,
		showInfo: false,
		setInfo: () => set((s) => ({ showInfo: !s.showInfo })),
		setUI: () => set((s) => ({ showUI: !s.showUI })),
		dropdown: false,
		setDropdown: () => set((s) => ({ dropdown: !s.dropdown })),
		setTimescale: (value) => set(() => ({ timescale: value })),
		setTrimToggle: () => set((state) => ({ trimToggle: !state.trimToggle })),
		start: 0,
		timeSlider: 1,
		timescale: 0.25,
		trimToggle: false,
		updateAnimationArray: (value) =>
			set(() => ({ animationsArray: [...value] })),
	}))
);
