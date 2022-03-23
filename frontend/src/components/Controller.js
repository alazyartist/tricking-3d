import React from "react";
import { useStore } from "../store/store.js";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import { BiRevision } from "react-icons/bi";
import { ImLoop } from "react-icons/im";
import { MdSpeed, MdLoop } from "react-icons/md";
import { MediaButton } from "./reusable/Button.js";

function Controller() {
	const setIsPaused = useStore((state) => state.setIsPaused);
	const setIsPlaying = useStore((state) => state.setIsPaused);
	const setBounce = useStore((state) => state.setBounce);
	const isPaused = useStore((state) => state.isPaused);
	const bounce = useStore((state) => state.bounce);
	const setTimescale = useStore((state) => state.setTimescale);
	const timescale = useStore((state) => state.timescale);

	// Envoke Player Controller

	return (
		<div className='sticky bottom-0'>
			<div
				id='controller-container'
				className='
        flex
        justify-around text-sm
		'>
				<MediaButton
					id='bounce-button'
					f={setBounce}
					content={
						bounce ? (
							<BiRevision className='fill-gray-300 text-2xl' />
						) : (
							<ImLoop className='text-xl text-[gainsboro]' />
						)
					}
				/>
				<MediaButton
					id='reverse-button'
					f={() => setTimescale(-timescale)}
					content={
						timescale < 0 ? (
							<MdLoop className='text-2xl text-green-300' />
						) : (
							<MdLoop className='text-2xl text-red-300' />
						)
					}
				/>

				<MediaButton
					id='reverse-button'
					content={
						<FaStepBackward className='fill-slate-200 text-xl hover:fill-white' />
					}
				/>

				<MediaButton
					id='play-pause-button'
					class='rounded'
					f={setIsPaused}
					content={
						!isPaused ? (
							<FaPause className='fill-gray-800 p-0' />
						) : (
							<FaPlay className='flex items-center  justify-around fill-gray-800' />
						)
					}
					isPlayPause
				/>

				<MediaButton
					id='reverse-button'
					content={
						<FaStepForward className='fill-slate-200 text-xl hover:fill-white' />
					}
				/>

				<MediaButton
					id='reduce-speed-button'
					f={() => setTimescale(0.5 * timescale)}
					content={
						<div className='relative'>
							<MdSpeed className='fill-red-100 text-2xl' />
							<span className='absolute inset-x-0.5 top-6 text-[.9rem] '>
								{Math.abs(Number.parseFloat(timescale).toFixed(2))}
							</span>
						</div>
					}
				/>
				<MediaButton
					id='full-speed-button'
					f={() => setTimescale(1)}
					content={<MdSpeed className='fill-green-100 text-2xl' />}
				/>
			</div>
		</div>
	);
}

export default Controller;
