import React, { useEffect } from "react";
import { useStore } from "../store/store";
function TimeSlider() {
	let timeSlider = useStore((state) => state.timeSlider);
	let timescale = useStore((state) => state.timescale);
	const setSlider = useStore((state) => state.setSlider);
	const setTimescale = useStore((state) => state.setTimescale);

	useEffect(() => setTimescale(timeSlider), [timeSlider]);
	useEffect(() => {
		setSlider(timescale);
	}, [timescale]);

	return (
		<div className='relative rounded-lg py-4'>
			<input
				className={"my-5 w-full bg-transparent"}
				type={"range"}
				min={0}
				max={150}
				step={0.1}
				value={Math.abs(timeSlider * 100)}
				onChange={(e) => setSlider(e.target.value / 100)}
			/>
		</div>
	);
}

export default TimeSlider;