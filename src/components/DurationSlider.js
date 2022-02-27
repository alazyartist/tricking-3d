import React, { useEffect, useRef, useCallback } from "react";
import { useStore } from "../store/store";
import { TrimToggle } from "./Button";
import { FaCheckCircle } from "react-icons/fa";
<<<<<<< Updated upstream
function DurationSlider() {
	let start = useStore((state) => state.start);
	let end = useStore((state) => state.end);
	let clipDuration = useStore((state) => state.clipDuration);
	let currentTime = useStore((state) => state.currentTime);
=======
>>>>>>> Stashed changes

function DurationSlider() {
	let clipDuration  = useStore((s) => s.clipDuration);
	let currentTime   = useStore((s) => s.currentTime);
	let end           = useStore((s) => s.end);
	let start         = useStore((s) => s.start);
  let offsetBumper  = .05;

<<<<<<< Updated upstream
	useEffect(() => setSliderStart(start), [setSliderStart, start]);
	useEffect(() => setSliderEnd(end), [setSliderEnd, end]);
=======
	const currentAnim     = useStore((s) => s.currentAnim);
	const setSliderEnd    = useStore((s) => s.setSliderEnd);
	const setSliderStart  = useStore((s) => s.setSliderStart);
	const setTrimToggle   = useStore((s) => s.setTrimToggle);
	const trimToggle      = useStore((s) => s.trimToggle);
>>>>>>> Stashed changes

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
		<div className='flex flex-row items-center gap-3 self-center'>
			<div
				id='Slider'
				className=' relative z-0 flex h-[50px] w-full items-center justify-center rounded-lg bg-transparent align-middle'>
				<input
					className='pointer-events-none absolute top-0 z-[12] my-5 w-full bg-transparent'
					type='range'
					id='playhead'
					min={0}
					max={clipDuration}
					step={0.0001}
					value={currentTime}
					readOnly
				/>
				<input
					className={
						"z-3 pointer-events-none absolute top-0 my-5 w-full bg-transparent"
					}
					type={"range"}
					double={"true"}
					id='start'
					ref={startRef}
					min={0}
					max={1}
					step={0.01}
					value={start}
					onChange={(event) => {
						const value = Math.max(+event.target.value, start - 1);
						setSliderStart(value);
						event.target.value = value.toString();
					}}
				/>
				<input
					className={
						" z-4 pointer-events-none absolute left-0 top-0 my-5 w-full bg-transparent"
					}
					type={"range"}
					double={"true"}
					id='end'
					ref={endRef}
					min={0}
					max={1}
					value={end}
					step={0.01}
					onChange={(event) => {
						const value = Math.min(+event.target.value, end + 1);
						setSliderEnd(value);
						event.target.value = value.toString();
					}}
          onMouseDown={(event) => {
            console.log("End: Drag Start")
            actions[currentAnim].timeScale = 0;
          }}
          onMouseUp={(event) => {
            console.log("End: Drag End");
          }}
				/>

				<div id='slider' className='mx-4 flex text-base'>
					<div id='slider__track' className='z-1 absolute left-0 h-2' />
					<div
						ref={range}
						id='slider__range'
						className=' z-2 absolute h-2 bg-green-200'>
						<div
							id='slider__left-value'
							className='z-60 absolute left-[-10px] top-[-40px] items-center justify-center rounded-lg bg-green-500 p-1'>
							{Number.parseFloat(start * clipDuration).toFixed(2)}
						</div>
						<div
							id='slider__right-value'
							className='absolute top-[-40px] right-[-10px] z-50 rounded-lg bg-red-500 p-1'>
							{Number.parseFloat(end * clipDuration).toFixed(2)}
						</div>
					</div>
				</div>
			</div>
			<TrimToggle
				id='trimToggle'
				content={
					trimToggle ? (
						<FaCheckCircle className='h-8 w-8 fill-gray-500' />
					) : (
						<FaCheckCircle className='h-8 w-8 fill-green-600' />
					)
				}
				f={() => setTrimToggle()}
			/>
		</div>
	);
}

export default DurationSlider;
