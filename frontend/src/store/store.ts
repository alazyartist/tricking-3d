import create, { PartialState, State } from "zustand";
import { devtools } from "zustand/middleware";
interface Store {
  aI: number;
  setSpeedControl: (value: Boolean) => void;
  speedControl: Boolean;
  isFollowCam: Boolean;
  setFollowCam: () => void;
  addToAnimationArray: (value: String[]) => void;
  animationSelector: () => void;
  animationsArray: any[];
  currVersions: String[];
  stanceColor: String;
  setStanceColor: (value: String) => void;
  bounce: Boolean;
  clipDuration: number;
  currentAnim: String;
  currentTime: number;
  end: number;
  modelValue: Boolean;
  areInstructionsOpen: Boolean;
  setInstructions: () => void;
  activeModel: String;
  activeBackground: String;
  isPlaying: Boolean;
  setIsPlaying: () => void;
  isPaused: Boolean;
  isScrubbing: number; // 0: No, 1: Start, 2: End
  loop: Boolean;
  modelArray: ["Frank", "Kerwood", "Andrew", "Sam Caspio"];
  backgroundArray: ["Torque", "BluesBackground", "JapanShrine", "The Void"];
  setModel: (value: string) => void;
  setBackground: (value: string) => void;
  modelPosition: number[];
  selectAnim: (value: string) => void;
  setBounce: () => void;
  setClipDuration: (value: number) => void;
  setCurrentTime: (value: number) => void;
  setModelPosition: (value: number) => void;
  setIsPaused: () => void;
  setLoop: () => void;
  setScrubbing: (value: number) => void;
  setSlider: (value: number) => void;
  setSliderEnd: (value: number) => void;
  setSliderStart: (value: number) => void;
  showUI: Boolean;
  selected_TrickList: null;
  setSelected_TrickList: (value: any) => void;
  showInfo: Boolean;
  setInfo: () => void;
  setUI: () => void;
  dropdown: Boolean;
  setDropdown: () => void;
  setTimescale: (value: number) => void;
  setTrimToggle: () => void;
  start: number;
  timeSlider: number;
  timescale: number;
  trimToggle: Boolean;
  updateAnimationArray: (value: Array<any>) => void;

  setVersions: (value: any) => void;
  trick_id: String;
  setTrick_id: (value: String) => void;
  trickOrCombo: String;
  setTrickOrCombo: (value: String) => void;
}
export const useStore = create<Store>(
  devtools((set, get) => ({
    aI: 0,
    setSpeedControl: (value) => set(() => ({ speedControl: value })),
    speedControl: false,
    isFollowCam: true,
    setFollowCam: () => set((s) => ({ isFollowCam: !s.isFollowCam })),
    addToAnimationArray: (value) =>
      set((state) => ({ animationsArray: [...state.animationsArray, value] })),
    animationSelector: () =>
      set((state: Store) => ({
        aI: (state.aI + 1) % state.animationsArray.length,
        isPlaying: true,
        isPaused: false,
      })),
    animationsArray: [],
    currVersions: [],
    stanceColor: "#ffffff",
    setStanceColor: (value) => set(() => ({ stanceColor: value })),
    bounce: true,
    clipDuration: 0,
    currentAnim: "touchdown-Raiz",
    currentTime: 0,
    end: 1,
    modelValue: false,
    areInstructionsOpen: false,
    setInstructions: () =>
      set((s) => ({
        areInstructionsOpen: !s.areInstructionsOpen,
      })),
    activeModel: "Frank",
    activeBackground: "Torque",
    isPlaying: true,
    setIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
    isPaused: false,
    isScrubbing: 0, // 0: No, 1: Start, 2: End
    loop: true,
    modelArray: ["Frank", "Kerwood", "Andrew", "Sam Caspio"],
    backgroundArray: ["Torque", "BluesBackground", "JapanShrine", "The Void"],
    setModel: (value) => set(() => ({ activeModel: value })),
    setBackground: (value) => set(() => ({ activeBackground: value })),
    modelPosition: [],
    selectAnim: (value) => set(() => ({ currentAnim: value })),
    setBounce: () => set((state) => ({ bounce: !state.bounce })),
    setClipDuration: (value) => set(() => ({ clipDuration: value })),
    setCurrentTime: (value) => set(() => ({ currentTime: value })),
    setModelPosition: (value) => set(() => ({ modelPosition: [value] })),
    setIsPaused: () => set((state) => ({ isPaused: !state.isPaused })),
    setLoop: () => set((state) => ({ loop: !state.loop })),
    setScrubbing: (value) => set((state) => ({ isScrubbing: value })),
    setSlider: (value) => set(() => ({ timeSlider: value })),
    setSliderEnd: (value) => set(() => ({ end: value })),
    setSliderStart: (value) => set(() => ({ start: value })),
    showUI: true,
    selected_TrickList: null,
    setSelected_TrickList: (value) =>
      set(() => ({ selected_TrickList: value })),
    showInfo: false,
    setInfo: () => set((s) => ({ showInfo: !s.showInfo })),
    setUI: () => set((s) => ({ showUI: !s.showUI })),
    dropdown: false,
    setDropdown: () => set((s) => ({ dropdown: !s.dropdown })),
    setTimescale: (value) => set(() => ({ timescale: value })),
    setTrimToggle: () => set((state) => ({ trimToggle: !state.trimToggle })),
    start: 0,
    timeSlider: 1,
    timescale: 0.25,
    trimToggle: false,
    updateAnimationArray: (value) =>
      set(() => ({ animationsArray: [...value] })),

    setVersions: (value) => set(() => ({ currVersions: [...value] })),
    trick_id: "",
    setTrick_id: (value) => set((s) => ({ trick_id: value })),
    trickOrCombo: "",
    setTrickOrCombo: (value) => set((s) => ({ trickOrCombo: value })),
  }))
);