import React from "react";
import ActiveDevNote from "./ActiveDevNote";
import AnimationsDropwdown from "./AnimationsDropwdown";
import Controller from "./Controller";
import DurationSlider from "./DurationSlider";
import ModelDropdown from "./ModelDropdown";
import TimeSlider from "./TimeSlider";

function UI() {
	return (
		<>
			<h1 className='font-inter absolute z-[1000] h-[47px] w-full rounded-b-xl border-none bg-zinc-800 bg-opacity-60 p-2 text-3xl font-bold text-zinc-300 shadow-zinc-900 drop-shadow-xl'>
				Tricking-3d
			</h1>
			<div
				id='dropdowns-div'
				className='max-h-750px absolute z-[1001] ml-3 mt-[45px] flex gap-3'>
				<AnimationsDropwdown />
				<ModelDropdown />
			</div>
			<ActiveDevNote />
			<div
				id='controller'
				className='absolute left-0 bottom-0 z-[1002] h-fit w-full bg-gray-800 bg-opacity-50 p-4'>
				<DurationSlider />
				<Controller />
			</div>
		</>
	);
}

export default UI;
