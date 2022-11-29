import create from "zustand";
import { devtools, persist } from "zustand/middleware";
interface ClipData {
  name: String;
  startTime: Number;
  endTime: Number;
  bail: Number;
}
interface SummaryStore {
  trickMakerOpen: Boolean;
  setTrickMakerOpen: (value: Boolean) => void;
  clipData: ClipData;
  sessionid: String;
  setSessionid: (value: String) => void;
  setClipData: (value: ClipData) => void;
  sessionSources: any[];
  setSessionSources: (value: any) => void;
  srcid: string;
  setSrcid: (value: string) => void;
  vidsrc: string;
  setVidsrc: (value: string) => void;
  detailsVisible: Boolean;
  setDetailsVisible: (value: Boolean) => void;
  clipDetailsVisible: Boolean;
  setClipDetailsVisible: (value: Boolean) => void;
  vidIsPlaying: Boolean;
  setVidIsPlaying: (value: Boolean) => void;
  seekTime: Number;
  setSeekTime: (value: Number) => void;
  currentTime: Number;
  setCurrentTime: (value: Number) => void;
  sessionData: any[];
  clearSessionData: () => void;
  setSessionData: (value: any) => void;
  removeSessionData: (value: any) => void;
  source: string;
  clipCombo: any[];
  setClipCombo: (value: any) => void;
  setClipComboRaw: (value: any) => void;
  removeClipfromCombo: (value: any) => void;
  clearClipCombo: (value: any) => void;
}
export const useSessionSummariesStore = create<SummaryStore>(
  devtools(
    // persist(
    (set) => ({
      trickMakerOpen: false,
      setTrickMakerOpen: (value) => set(() => ({ trickMakerOpen: value })),
      clipData: { name: "", startTime: 10, endTime: 20, bail: 0 },
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
      clearSessionData: () => set(() => ({ sessionData: [] })),
      setSessionData: (value) =>
        set((s) => ({ sessionData: [...s.sessionData, value] })),
      removeSessionData: (value) =>
        set((s) => ({
          sessionData: [...s.sessionData].filter((data) => value !== data),
        })),
      source: "",
      clipCombo: [],
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
