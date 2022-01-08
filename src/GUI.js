import { Pane } from "tweakpane";
import * as EssentialsPlugin from "@tweakpane/plugin-essentials";
import { useStore } from "./store";

export function Gui() {
	// const aI = useStore((state) => state.aI);
	const isPlaying = useStore((state) => state.isPlaying);
	const isPaused = useStore((state) => state.isPaused);
	const setIsPlaying = useStore((state) => state.setIsPlaying);
	const setIsPaused = useStore((state) => state.setIsPaused);
	const setTimescale = useStore((state) => state.setTimescale);
	const timescale = useStore((state) => state.timescale);
	const setLoop = useStore((state) => state.setLoop);
	const setBounce = useStore((state) => state.setBounce);
	const aI = useStore((state) => state.aI);
	const animationsArray = useStore((state) => state.animationsArray);
	// const currentAnimation = useStore((state) => state.animationsArray[aI]);
	//Tweakpane GUI Setup
	let activeAnimimation = animationsArray[aI];
	const PARAMS = {
		timescale: timescale,
		play: isPlaying,
		paused: isPaused,
		// activeAnimation: activeAnimimation,
		// currentAnim: animationsArray,
		// currentAnimation: currentAnimation,
		// xyz: positionparam,
	};
	const guiRight = new Pane({
		//TODO: figure out why this double renders
		// container: document.getElementById("tweak"),
	});
	// guiRight.addMonitor(PARAMS, "xyz", {
	// 	multiline: true,
	// });
	//Add EssentailPlugin
	guiRight.registerPlugin(EssentialsPlugin);
	//Add Button Grid
	guiRight
		.addBlade({
			view: "buttongrid",
			size: [3, 2],
			cells: (x, y) => ({
				title: [
					["Start", "Pause", "SlowMo"],
					["Loop", "Bounce", "Reverse"],
				][y][x],
			}),
			label: "buttongrid",
		})
		.on("click", (ev) => {
			//Play
			if (ev.cell.title === "Start") {
				setIsPlaying();
			}
			//Pause
			if (ev.cell.title === "Pause") {
				setIsPaused();
			}
			//SlowMo
			if (ev.cell.title === "SlowMo") {
				setTimescale(0.35);
			}
			// Loop
			if (ev.cell.title === "Loop") {
				setLoop();
			}
			// Bounce
			if (ev.cell.title === "Bounce") {
				setBounce();
			}
			//Reverse
			if (ev.cell.title === "Reverse") {
				setTimescale(-timescale);
			}
		});
	guiRight
		.addInput(PARAMS, "timescale", {
			label: "PlaybackSpeed",
			min: -1,
			max: 1,
			step: 0.01,
		})
		.on("change", (ev) => {
			setTimescale(ev.value);
		});
	guiRight.addMonitor(PARAMS, "play");
	guiRight.addMonitor(PARAMS, "paused");
	// guiRight.addInput(PARAMS, "currentAnim", {
	// options: { test: "test", test1: "test1" },
	// guiRight.addMonitor(PARAMS, "activeAnimation");
	// guiRight.addMonitor(PARAMS, "currentAnimation");
}
