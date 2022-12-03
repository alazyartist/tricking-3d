import create from "zustand";
interface VideoStore {
  videoPlaying: boolean;
  setVideoPlaying: (value: boolean) => void;
  videoSource: string;
  setVideoSource: (value: string) => void;
  videoOpacity: number;
  setVideoOpacity: (value: number) => void;
  canvasOpacity: number;
  setCanvasOpacity: (value: number) => void;
  vidTime: number;
  setVidTime: (value: number) => void;
  scrubbing: boolean;
  setScrubbing: (value: boolean) => void;
  startTime: number;
  setStartTime: (value: number) => void;
  endTime: number;
  setEndTime: (value: number) => void;
  vidDuration: number;
  setVidDuration: (value: number) => void;
  playBoth: boolean;
  setPlayBoth: (value: boolean) => void;
}
export const useVideoStore = create<VideoStore>((set, api) => ({
  videoPlaying: true,
  setVideoPlaying: (value) =>
    set((s) => ({
      videoPlaying: value ?? !s.videoPlaying,
    })),
  videoSource: "",
  setVideoSource: (value) => set(() => ({ videoSource: value })),
  videoOpacity: 1,
  setVideoOpacity: (value) => set(() => ({ videoOpacity: value })),
  canvasOpacity: 1,
  setCanvasOpacity: (value) => set(() => ({ canvasOpacity: value })),
  vidTime: 0,
  setVidTime: (value) => set(() => ({ vidTime: value })),
  scrubbing: false,
  setScrubbing: (value) => set(() => ({ scrubbing: value })),
  startTime: 0,
  setStartTime: (value) => set(() => ({ startTime: value })),
  endTime: 0,
  setEndTime: (value) => set(() => ({ endTime: value })),
  vidDuration: 0,
  setVidDuration: (value) => set(() => ({ vidDuration: value })),
  playBoth: false,
  setPlayBoth: (value) => set(() => ({ playBoth: value })),
}));
