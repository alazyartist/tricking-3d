import React from "react";
import { useVideoStore } from "./useVideoStore";

const VideoControls = () => {
	const videoPlaying = useVideoStore((s) => s.videoPlaying);
	const setVideoPlaying = useVideoStore((s) => s.setVideoPlaying);
	return (
		<>
			<div onClick={() => setVideoPlaying()}>
				{videoPlaying ? "Pause" : "Play"}
			</div>

			<div>Video Opacity</div>
			<div>3D Opacity</div>
		</>
	);
};

export default VideoControls;
