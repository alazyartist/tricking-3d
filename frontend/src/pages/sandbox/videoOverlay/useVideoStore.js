import create from "zustand";
export const useVideoStore = create((set, api) => ({
	videoPlaying: false,
	setVideoPlaying: () =>
		set((s) => ({
			videoPlaying: !s.videoPlaying,
		})),
	videoSource: "",
	setVideoSource: (value) => set(() => ({ videoSource: value })),
}));
