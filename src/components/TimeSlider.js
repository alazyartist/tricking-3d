import React, { useEffect } from "react";
import { useStore } from "../store/store";
function TimeSlider() {
	let timeSlider = useStore((state) => state.timeSlider);
	let timescale = useStore((state) => state.timescale);
	const setSlider = useStore((state) => state.setSlider);
	const setTimescale = useStore((state) => state.setTimescale);
	useEffect(() => {
		const ele = document.querySelector(".buble");
		if (ele) {
			ele.style.left = `${Number(timeSlider / 4)}px}`;
		}
	});
	useEffect(() => setTimescale(timeSlider), [timeSlider]);
	useEffect(() => {
		setSlider(timescale);
	}, [timescale]);

	return (
		<div>
			<input
				type={"range"}
				min={0}
				max={100}
				step={0.1}
				value={Math.abs(timeSlider * 100)}
				onChange={(e) => setSlider(e.target.value / 100)}
			/>
			<div className='buble absolute'></div>
		</div>
	);
}

export default TimeSlider;
