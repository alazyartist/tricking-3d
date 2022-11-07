import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useSessionSummariesStore = create(
	devtools(
		persist(
			(set) => ({
				sessionSources: [],
				setSessionSources: (value) => set(() => ({ sessionSources: value })),
				vidsrc: "",
				setVidsrc: (value) => set(() => ({ vidsrc: value })),
				detailsVisible: false,
				setDetailsVisible: (value) =>
					set((s) => ({ detailsVisible: !s.detailsVisible })),
				vidIsPlaying: false,
				setVidIsPlaying: (value) =>
					set((s) => ({ vidIsPlaying: !s.vidIsPlaying })),
				currentTime: 0,
				setCurrentTime: (value) => set(() => ({ currentTime: value })),
				sessionData: [{}],
				setSessionData: (value) => set((s) => ({ sessionData: [...s, value] })),
				activeClipData: {},
				setActiveClipData: (value) =>
					set((s) => ({ activeClipData: { ...value } })),
				source: "",
			}),
			{ name: "SessionSummaryStore" }
		)
	)
);
