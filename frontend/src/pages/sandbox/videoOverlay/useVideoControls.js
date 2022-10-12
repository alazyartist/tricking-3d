import React, { useEffect } from "react";
import { useStore } from "../../../store/store";
import { useVideoStore } from "./useVideoStore";
const useVideoControls = (vid) => {
	const timescale = useStore((s) => s.timescale);
	const videoPlaying = useVideoStore((s) => s.videoPlaying);
	const startTime = useVideoStore((s) => s.startTime);
	const endTime = useVideoStore((s) => s.endTime);
	const vidTime = useVideoStore((s) => s.vidTime);
	const vidSrc = useVideoStore((s) => s.videoSource);
	const setEndTime = useVideoStore((s) => s.setEndTime);
	const setStartTime = useVideoStore((s) => s.setStartTime);
	const setVidDuration = useVideoStore((s) => s.setVidDuration);
	useEffect(() => {
		if (vidTime > endTime) {
			vid.currentTime = startTime;
		}
		if (vidTime < startTime) {
			vid.currentTime = startTime;
		}
	}, [vidTime]);
	useEffect(() => {
		if (vid?.duration) {
			setVidDuration(vid?.duration);
			setStartTime(0);
			setEndTime(vid?.duration);
		}
	}, [vidSrc]);
	useEffect(() => {
		if (vid) {
			videoPlaying ? vid.pause() : vid.play();

			// if (timescale > 0.1 && timescale < 2) {
			// 	vid.playbackRate = timescale;
			// }
		}
	}, [videoPlaying, timescale]);
	return;
};

export default useVideoControls;
