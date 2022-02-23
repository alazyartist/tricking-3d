import React from "react";
import { useStore } from "../store/store.js";
import { FaPlay, FaPause, FaCheckCircle } from "react-icons/fa";
import { Button, TrimToggle } from "../components/Button.js";

function Controller() {
	const setIsPaused = useStore((state) => state.setIsPaused);
	const setIsPlaying = useStore((state) => state.setIsPaused);
	const setBounce = useStore((state) => state.setBounce);
	const isPaused = useStore((state) => state.isPaused);
	const bounce = useStore((state) => state.bounce);
	const setTimescale = useStore((state) => state.setTimescale);
	const timescale = useStore((state) => state.timescale);
	const trimToggle = useStore((state) => state.trimToggle);
	const setTrimToggle = useStore((state) => state.setTrimToggle);
	return (
		<>
			<div className='z-[-5] grid grid-cols-3 justify-around justify-items-stretch gap-5 text-base'>
				<Button
					f={setIsPaused}
					content={!isPaused ? <FaPause /> : <FaPlay />}
				/>
				<Button f={setBounce} content={bounce ? "Bounce" : "Loop"} />
				<Button f={setIsPlaying} content={isPaused ? "Paused" : "Playing"} />
				<Button f={() => setTimescale(-timescale)} content='Reverse' />
				<Button
					f={() => setTimescale(0.5 * timescale)}
					content={`SlowMo ${Math.abs(
						Number.parseFloat(timescale).toFixed(2)
					)}`}
				/>
				<Button f={() => setTimescale(1)} content='FullSpeed' />
			</div>
			<TrimToggle
				className={trimToggle ? " " : "checked"}
				id='trimToggle'
				content={
					trimToggle ? (
						<FaCheckCircle className='m-4 h-20 w-20 fill-gray-500' />
					) : (
						<FaCheckCircle className='m-4 h-20 w-20 fill-green-500' />
					)
				}
				f={() => setTrimToggle()}
			/>
		</>
	);
}

export default Controller;
