import React, { useEffect, useRef, useCallback } from "react";
import { useStore } from "../store/store";
import { TrimToggle } from "./Button";
import { FaCheckCircle } from "react-icons/fa";

function DurationSlider() {
	let clipDuration = useStore((s) => s.clipDuration);
	let currentTime = useStore((s) => s.currentTime);
	let offsetBumper = 0.05;

	const end = useStore((s) => s.end);
	const setSliderEnd = useStore((s) => s.setSliderEnd);
	const setSliderStart = useStore((s) => s.setSliderStart);
	const setTrimToggle = useStore((s) => s.setTrimToggle);
	const start = useStore((s) => s.start);
	const trimToggle = useStore((s) => s.trimToggle);
	const setIsPaused = useStore((s) => s.setIsPaused);
	const setScrubbing = useStore((s) => s.setScrubbing);

	const startRef = useRef(null);
	const endRef = useRef(null);
	const range = useRef(null);
	const getPercent = useCallback(
		(value) =>
			Math.round(value * 100 - (start * 100) / (end * 100 - start * 100 * 100)),
		[start, end]
	);

	// Set Start Slider
	useEffect(() => {
		setSliderStart(start);
	}, [setSliderStart, start]);
	useEffect(() => {
		setSliderEnd(end);
	}, [setSliderEnd, end]);

	// Set width of the range to decrease from the left side
	useEffect(() => {
		if (endRef.current) {
			const minPercent = getPercent(start);
			const maxPercent = getPercent(+endRef.current.value); // Preceding with '+' converts the value from type string to type number
			if (range.current) {
				range.current.style.left = `${minPercent}%`;
				range.current.style.width = `${maxPercent - minPercent}%`;
			}
		}
	}, [start, getPercent]);

	// Set width of the range to decrease from the right side
	useEffect(() => {
		if (startRef.current) {
			const minPercent = getPercent(+startRef.current.value);
			const maxPercent = getPercent(end);

			if (range.current) {
				range.current.style.width = `${maxPercent - minPercent}%`;
			}
		}
	}, [end, getPercent]);

	return (
		<div
			id='duration-slider-container'
			className='mb-1 items-center gap-3 self-center pt-0'>
			{/* <TrimToggle
				id='trim-toggle-container'
				content={
					trimToggle ? (
						<FaCheckCircle className='h-8 w-8 fill-gray-500' />
					) : (
						<FaCheckCircle className='h-8 w-8 fill-green-600' />
					)
				}
				f={() => setTrimToggle()}
			/> */}
			<div
				id='duration-slider'
				className=' relative z-0 flex h-[40px] w-full items-center justify-center rounded-lg bg-transparent align-middle'>
				<input
					id='playhead'
					className='pointer-events-none absolute top-0 z-[12] my-5 w-full bg-transparent p-0'
					type='range'
					min={0}
					max={clipDuration}
					step={0.0001}
					value={currentTime}
					readOnly
				/>
				<input
					id='start'
					className={
						"z-3 pointer-events-none absolute top-0 my-5 w-full bg-transparent"
					}
					type={"range"}
					double={"true"}
					ref={startRef}
					min={0}
					max={1}
					step={0.01}
					value={start}
					onChange={(event) => {
						let value = Math.max(+event.target.value, start - 1);
						if (value > end - offsetBumper) {
							value = end - offsetBumper;
						}
						setSliderStart(value);
						event.target.value = value;
					}}
					onMouseDown={(event) => {
						setScrubbing(1);
						setIsPaused(true);
					}}
					onMouseUp={(event) => {
						setScrubbing(0);
						setIsPaused(false);
					}}
				/>
				<input
					id='end'
					className={
						" z-4 pointer-events-none absolute left-0 top-0 my-5 w-full bg-transparent"
					}
					type={"range"}
					double={"true"}
					ref={endRef}
					min={0}
					max={1}
					value={end}
					step={0.01}
					onChange={(event) => {
						let value = Math.min(+event.target.value, end + 1);
						if (value < start + offsetBumper) {
							value = start + offsetBumper;
						}
						setSliderEnd(value);
						event.target.value = value;
					}}
					onMouseDown={(event) => {
						setScrubbing(2);
						setIsPaused(true);
					}}
					onMouseUp={(event) => {
						setScrubbing(0);
						setIsPaused(false);
					}}
				/>

				<div id='duration-timestamp-container' className='mx-4 flex text-base'>
					<div
						id='timestamp-container'
						ref={range}
						className=' z-2 absolute h-2 '>
						<div
							id='start-timestamp'
							className='
                z-60 
                absolute 
                left-[-25px]
                top-[-22px] 
                h-[16px]
                w-[32px]
                rounded 
                bg-green-500 
                text-xs
                text-slate-200 
              '>
							{Number.parseFloat(start * clipDuration).toFixed(2)}
						</div>
						<div
							id='end-timestamp'
							className='
                z-60 
                absolute 
                right-[-25px]
                top-[-22px] 
                h-[16px]
                w-[32px]
                rounded 
                bg-red-500 
                text-xs
                text-slate-200 
              '>
							{Number.parseFloat(end * clipDuration).toFixed(2)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DurationSlider;
