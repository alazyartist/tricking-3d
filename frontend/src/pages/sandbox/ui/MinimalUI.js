import React from "react";
import { MediaButton } from "../media/MediaButton";
import { MdLoop, MdInfo, MdInfoOutline } from "react-icons/md";
import { FaPause, FaPlay } from "react-icons/fa";
import { useStore } from "../../store/store";
import { Link } from "react-router-dom";
function MinimalUI() {
	const setIsPaused = useStore((s) => s.setIsPaused);
	const isPaused = useStore((s) => s.isPaused);
	const showInfo = useStore((s) => s.showInfo);
	const setInfo = useStore((s) => s.setInfo);
	const timescale = useStore((s) => s.timescale);
	const setTimescale = useStore((s) => s.setTimescale);
	return (
		<>
			<div
				id='minimal-ui-container'
				className='absolute bottom-16 right-4 z-10 m-2 w-fit'>
				<div id='container' className='flex flex-col gap-2'>
					<MediaButton
						id='info-minimal'
						content={
							showInfo ? (
								<MdInfo className='fill-gray-300 text-3xl' />
							) : (
								<MdInfoOutline className='fill-gray-300 text-3xl' />
							)
						}
						f={setInfo}
					/>
					<MediaButton
						id='play-pause-minimal'
						f={setIsPaused}
						content={
							!isPaused ? (
								<FaPause className='fill-gray-800' />
							) : (
								<FaPlay className=' fill-gray-800' />
							)
						}
						isPlayPause
					/>
					<MediaButton
						id='reverse-button'
						f={() => setTimescale(-timescale)}
						content={
							timescale < 0 ? (
								<MdLoop className='text-3xl text-green-300' />
							) : (
								<MdLoop className='text-3xl text-red-300' />
							)
						}
					/>
				</div>
			</div>
		</>
	);
}

export default MinimalUI;
