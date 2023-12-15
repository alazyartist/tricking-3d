import { tricks, transitions, sessiondata } from "@prisma/client";
import create from "zustand";
import { devtools } from "zustand/middleware";
interface ClipData extends Partial<sessiondata> {
  id?: string;
  name?: string;
  srcid?: string;
  vidsrc?: string;
  admin?: string;
  shorthand?: string;
  startTime?: number;
  endTime?: number;
  bail?: number;
  clipLabel?: any | any[];
  user_id?: string;
}

interface SummaryStore {
  trickMakerOpen: boolean;
  setTrickMakerOpen: (value: boolean) => void;
  clipData: ClipData;
  sessionid: string;
  setSessionid: (value: string) => void;
  setClipData: (value: ClipData) => void;
  sessionSources: any[];
  setSessionSources: (value: any) => void;
  shorthand: string | null;
  setShorthand: (value: string) => void;
  srcid: string;
  setSrcid: (value: string) => void;
  vidsrc: string | null;
  setVidsrc: (value: string | null) => void;
  vidDuration: number | null;
  setVidDuration: (value: number | null) => void;
  detailsVisible: boolean;
  setDetailsVisible: () => void;
  clipDetailsVisible: boolean;
  setClipDetailsVisible: () => void;
  vidIsPlaying: boolean;
  setVidIsPlaying: (value?: boolean) => void;
  seekTime: number;
  setSeekTime: (value: number) => void;
  currentTime: number;
  setCurrentTime: (value: number) => void;
  sessionData: any[];
  clearSessionData: () => void;
  updateSessionData: (value) => void;
  setSessionData: (value: any | any[]) => void;
  removeSessionData: (value: any) => void;
  source: string;
  clipCombo: Array<tricks | transitions>;
  setClipCombo: (value: any) => void;
  setClipComboAppend: (value: any[]) => void;
  setClipComboRaw: (value: any) => void;
  removeClipfromCombo: (value: any) => void;
  clearClipCombo: () => void;
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
      shorthand: null,
      setShorthand: (value) => set(() => ({ shorthand: value })),
      setSrcid: (value) => set(() => ({ srcid: value })),
      vidsrc: "",
      setVidsrc: (value) => set(() => ({ vidsrc: value })),
      vidDuration: null,
      setVidDuration: (value: number) => set(() => ({ vidDuration: value })),
      detailsVisible: false,
      setDetailsVisible: () =>
        set((s) => ({ detailsVisible: !s.detailsVisible })),
      clipDetailsVisible: false,
      setClipDetailsVisible: () =>
        set((s) => ({ clipDetailsVisible: !s.clipDetailsVisible })),
      vidIsPlaying: true,
      setVidIsPlaying: (value) =>
        set((s) => ({ vidIsPlaying: value || !s.vidIsPlaying })),
      seekTime: 0,
      setSeekTime: (value) => set(() => ({ seekTime: value })),
      currentTime: 0,
      setCurrentTime: (value) => set(() => ({ currentTime: value })),
      sessionData: [],
      clearSessionData: () => set(() => ({ sessionData: [] })),
      setSessionData: (value) =>
        set((s) => ({ sessionData: [...s.sessionData, value] })),
      updateSessionData: (value) => {
        set((s) => ({
          sessionData: [...s.sessionData].map((data) => {
            if (data.id === value.id) {
              return { ...value };
            } else return data;
          }),
        }));
      },
      removeSessionData: (value) =>
        set((s) => ({
          sessionData: [...s.sessionData].filter((data) => value !== data),
        })),
      source: "",
      clipCombo: [],
      setClipCombo: (value) =>
        set((s) => ({ clipCombo: [...s.clipCombo, value] })),
      setClipComboAppend: (value) =>
        set((s) => ({ clipCombo: [...s.clipCombo, ...value] })),
      setClipComboRaw: (value) => set((s) => ({ clipCombo: value })),
      removeClipfromCombo: (value) =>
        set((s) => ({
          clipCombo: [...s.clipCombo].filter((t, i) => i !== value),
        })),
      clearClipCombo: () => set((s) => ({ clipCombo: [] })),
    })
    // { name: "SessionSummaryStore" }
  )
);
