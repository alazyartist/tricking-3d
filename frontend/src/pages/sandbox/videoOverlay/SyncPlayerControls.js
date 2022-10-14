import React, { useEffect } from "react";
import { useVideoStore } from "./useVideoStore";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { useStore } from "../../../store/store";

const SyncPlayerControls = () => {
	const playBoth = useVideoStore((s) => s.playBoth);
	const setPlayBoth = useVideoStore((s) => s.setPlayBoth);
	const setVideoPlaying = useVideoStore((s) => s.setVideoPlaying);
	const setCanvasPlaying = useStore((s) => s.setIsPaused);

	useEffect(() => {
		if (playBoth) {
			setVideoPlaying(true);
			setCanvasPlaying(true);
		} else {
			setVideoPlaying(false);
			setCanvasPlaying(false);
		}
	}, [playBoth]);

	return (
		<div className='text-xl text-zinc-300'>
			{playBoth ? (
				<FaPlayCircle onClick={() => setPlayBoth(!playBoth)} />
			) : (
				<FaPauseCircle onClick={() => setPlayBoth(!playBoth)} />
			)}
		</div>
	);
};

export default SyncPlayerControls;
