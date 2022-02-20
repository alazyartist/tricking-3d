import React, { useEffect, useRef, useCallback } from "react";
import { useStore } from "../store/store";
function DurationSlider() {
	let start = useStore((state) => state.start);
	let end = useStore((state) => state.end);
	const setSliderStart = useStore((state) => state.setSliderStart);
	const setSliderEnd = useStore((state) => state.setSliderEnd);

	useEffect(() => setSliderStart(start), [setSliderStart, start]);
	useEffect(() => setSliderEnd(end), [setSliderEnd, end]);

	const startRef = useRef(null);
	const endRef = useRef(null);
	const range = useRef(null);

	// Convert to percentage
	const getPercent = useCallback(
		(value) =>
			Math.round(value * 100 - (start * 100) / (end * 100 - start * 100 * 100)),
		[start, end]
	);

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
			id='Slider'
			className=' relative z-0 flex h-[50px] w-full min-w-full items-center justify-center rounded-lg bg-transparent align-middle'>
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
						{Number.parseFloat(start).toFixed(2)}
					</div>
					<div
						id='slider__right-value'
						className='z-60 absolute top-[-40px] right-[-10px] rounded-lg bg-red-500 p-1'>
						{Number.parseFloat(end).toFixed(2)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default DurationSlider;