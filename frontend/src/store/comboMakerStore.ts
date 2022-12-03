import create from "zustand";
import { devtools } from "zustand/middleware";
interface ComboMakerStore {
  currentStance: any;
  currentDirection: any;
  currentLeg: any;
  fromTrick: any;
  toTrick: any;
  array: any[];
  setCurrentStance: (value: any) => void;
  setCurrentDirection: (value: any) => void;
  setCurrentLeg: (value: any) => void;
  setFromTrick: (value: any) => void;
  setToTrick: (value: any) => void;
  setArray: (value: any) => void;
}
export const useComboMakerStore = create<ComboMakerStore>(
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
