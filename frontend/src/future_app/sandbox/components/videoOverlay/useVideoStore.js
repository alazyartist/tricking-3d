import create from "zustand";
export const useVideoStore = create((set, api) => ({
	videoPlaying: true,
	setVideoPlaying: () =>
		set((s) => ({
			videoPlaying: !s.videoPlaying,
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
