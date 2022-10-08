import React, { useEffect } from "react";
import { useStore } from "../../../store/store";
import { useVideoStore } from "./useVideoStore";
const useVideoControls = (vid) => {
	const timescale = useStore((s) => s.timescale);
	const videoPlaying = useVideoStore((s) => s.videoPlaying);

	useEffect(() => {
		if (vid) {
			videoPlaying ? vid.play() : vid.pause();

			// if (timescale > 0.1 && timescale < 2) {
			// 	vid.playbackRate = timescale;
			// }
		}
	}, [videoPlaying, timescale]);
	return;
};

export default useVideoControls;
