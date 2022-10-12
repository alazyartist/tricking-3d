import React, { useEffect } from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import DraggableOpacity from "../ui/DraggableOpacity";
import { useVideoStore } from "./useVideoStore";
import { useSpring, animated, config } from "react-spring";
const VideoControls = () => {
	const videoPlaying = useVideoStore((s) => s.videoPlaying);
	const setVideoPlaying = useVideoStore((s) => s.setVideoPlaying);
	const videoOpacity = useVideoStore((s) => s.videoOpacity);
	const canvasOpacity = useVideoStore((s) => s.canvasOpacity);
	const vidTime = useVideoStore((s) => s.vidTime);
	const vidDuration = useVideoStore((s) => s.vidDuration);
	let time = Math.trunc((vidTime / vidDuration) * 100).toString() + "%";
	const timeSpring = useSpring({
		to: { width: time },
		config: config.stiff,
	});
	return (
		<div className='flex flex-col'>
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
			<div className='h-3 w-full bg-zinc-300'>
				<animated.div
					style={{ ...timeSpring }}
					className={`h-full bg-teal-500`}></animated.div>
			</div>
		</div>
	);
};

export default VideoControls;
