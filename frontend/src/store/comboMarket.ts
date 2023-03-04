import create from "zustand";
import { devtools } from "zustand/middleware";

interface ComboMarket {
  type: string;
  name: string;
  start_position: string;
  start_leg: string;
  end_position: string;
  end_leg: string;
  variation_array: any[];

  setEndPosition: (value: any) => void;
  setEndLeg: (value: any) => void;
  setVariationArray: (value: any) => void;
};
export const useComboMarkey = create<ComboMarket>(
  devtools((set) => ({
    type: "trick type",
    name: "trick name",
    start_position: "Start Position",
    start_leg: "Start Leg",
    end_position: "End Position",
    end_leg: "End Lef",
    array: [],
    setEndPosition: (value) => set(() => ({ end_position: value })),
    setEndLeg: (value) => set(() => ({ end_leg: value })),
    setVariationArray: (value) => set(() => ({ variation_array: value })),
  }))
);
