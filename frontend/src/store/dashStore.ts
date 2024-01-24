import create from "zustand";
import { devtools } from "zustand/middleware";

interface DashStore {
  vidsrc: string | null;
  setVidSrc: (value: string) => void;
  clipStart: number;
  setClipStart: (value: number) => void;
  clipEnd: number;
  setClipEnd: (value: number) => void;
}

export const useDashStore = create<DashStore>(
  devtools((set, get) => ({
    vidsrc: null,
    setVidSrc: (value) => set({ vidsrc: value }),
    clipStart: 0,
    setClipStart: (value) => set({ clipStart: value }),
    clipEnd: 0,
    setClipEnd: (value) => set({ clipEnd: value }),
  }))
);
