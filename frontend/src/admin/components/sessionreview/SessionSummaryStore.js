import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useSessionSummariesStore = create(
	devtools(
		persist(
			(set) => ({
				playerVisible: false,
				setPlayerVisible: (value) => set(() => ({ playerVisible: value })),
				vidsrc: "",
				setVidSrc: (value) => set(() => ({ vidSrc: value })),
				detailsVisible: "",
				setDetailsVisible: (value) => set(() => ({ DetailsVisible: value })),
				vidisPlaying: false,
				setVidIsPlaying: (value) => set(() => ({ vidisPlaying: value })),
				currentTime: 0,
				setCurrentTime: (value) => set(() => ({ currentTime: value })),
				sessionData: [{}],
				setSessionData: (value) => set((s) => ({ sessionData: [...s, value] })),
				activeSessionData: {},
				setActiveSessionData: (value) =>
					set((s) => ({ activeSessionData: { ...value } })),
				source: "",
			}),
			{ name: "SessionSummaryStore" }
		)
	)
);
