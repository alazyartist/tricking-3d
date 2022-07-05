import create from "zustand";
import { devtools } from "zustand/middleware";

export const useComboMakerStore = create(
	devtools((set) => ({
		currentStance: "BacksideComplete",
		currentDirection: "Backwards",
		currentLeg: "Left",
		fromTrick: "Select another Trick",
		toTrick: "Select A Trick",
		array: [],
		setCurrentStance: (value) => set(() => ({ currentStance: value })),
		setCurrentDirection: (value) => set(() => ({ currentDirection: value })),
		setCurrentLeg: (value) => set(() => ({ currentLeg: value })),
		setFromTrick: (value) => set(() => ({ fromTrick: value })),
		setToTrick: (value) => set(() => ({ toTrick: value })),
		setArray: (value) => set(() => ({ array: value })),
	}))
);
