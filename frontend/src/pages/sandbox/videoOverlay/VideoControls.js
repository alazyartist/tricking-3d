import React from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import DraggableOpacity from "../ui/DraggableOpacity";
import { useVideoStore } from "./useVideoStore";

const VideoControls = () => {
	const videoPlaying = useVideoStore((s) => s.videoPlaying);
	const setVideoPlaying = useVideoStore((s) => s.setVideoPlaying);
	const videoOpacity = useVideoStore((s) => s.videoOpacity);
	const canvasOpacity = useVideoStore((s) => s.canvasOpacity);
	const vidTime = useVideoStore((s) => s.vidTime);
	const vidDuration = useVideoStore((s) => s.vidDuration);
	return (
		<div className='flex place-content-center place-items-center gap-2 rounded-lg bg-zinc-800 p-2'>
			<div onClick={() => setVideoPlaying()}>
				{videoPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
			</div>
			<DraggableOpacity drag_offset_limit={80}>
				<div className='select-none'>Video</div>
				<span className='text-xs'>{Math.trunc(videoOpacity * 100)}%</span>
			</DraggableOpacity>
			<DraggableOpacity canvas drag_offset_limit={80}>
				<div>3D</div>
				<span className='text-xs'>{Math.trunc(canvasOpacity * 100)}%</span>
			</DraggableOpacity>
			<span>
				{parseInt(vidTime)} /{parseInt(vidDuration)}
			</span>
		</div>
	);
};

export default VideoControls;
