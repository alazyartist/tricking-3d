import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useSessionSummariesStore = create(
	devtools(
		// persist(
		(set) => ({
			trickMakerOpen: false,
			setTrickMakerOpen: (value) => set(() => ({ trickMakerOpen: value })),
			clipData: { name: "testName", startTime: 10, endTime: 20, bail: 0 },
			sessionid: "",
			setSessionid: (value) => set(() => ({ sessionid: value })),
			setClipData: (value) =>
				set((s) => ({ clipData: { ...s.clipData, ...value } })),
			sessionSources: [],
			setSessionSources: (value) => set(() => ({ sessionSources: value })),
			srcid: "",
			setSrcid: (value) => set(() => ({ srcid: value })),
			vidsrc: "",
			setVidsrc: (value) => set(() => ({ vidsrc: value })),
			detailsVisible: false,
			setDetailsVisible: (value) =>
				set((s) => ({ detailsVisible: !s.detailsVisible })),
			clipDetailsVisible: false,
			setClipDetailsVisible: (value) =>
				set((s) => ({ clipDetailsVisible: !s.clipDetailsVisible })),
			vidIsPlaying: false,
			setVidIsPlaying: (value) =>
				set((s) => ({ vidIsPlaying: !s.vidIsPlaying })),
			seekTime: 0,
			setSeekTime: (value) => set(() => ({ seekTime: value })),
			currentTime: 0,
			setCurrentTime: (value) => set(() => ({ currentTime: value })),
			sessionData: [],
			setSessionData: (value) =>
				set((s) => ({ sessionData: [...s.sessionData, value] })),
			removeSessionData: (value) =>
				set((s) => ({
					sessionData: [...s.sessionData].filter((data) => value !== data),
				})),
			source: "",
			clipCombo: [],
			clearClipCombo: () => set((s) => ({ clipCombo: null })),
			setClipCombo: (value) =>
				set((s) => ({ clipCombo: [...s.clipCombo, value] })),
			setClipComboRaw: (value) => set((s) => ({ clipCombo: value })),
			removeClipfromCombo: (value) =>
				set((s) => ({
					clipCombo: [...s.clipCombo].filter((t, i) => i !== value),
				})),
			clearClipCombo: (value) => set((s) => ({ clipCombo: [] })),
		})
		// { name: "SessionSummaryStore" }
	)
);
