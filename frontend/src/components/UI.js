import React from "react";
import ActiveDevNote from "./ActiveDevNote";
import AnimationsDropwdown from "./AnimationsDropwdown";
import Controller from "./Controller";
import DurationSlider from "./DurationSlider";
import ModelDropdown from "./ModelDropdown";
import TimeSlider from "./TimeSlider";
import { Link } from "react-router-dom";
function UI() {
	return (
		<>
			<Link to='/3d/test'>
				<h1 className='font-inter absolute z-[1000] h-[47px] w-full rounded-b-xl border-none  bg-opacity-60 p-2 text-3xl font-bold text-zinc-300 '>
					Tricking-3d
				</h1>
			</Link>
			<div
				id='dropdowns-div'
				className='max-h-750px absolute z-[1001] ml-3 mt-[45px] flex gap-3'>
				<AnimationsDropwdown />
				<ModelDropdown />
			</div>
			<ActiveDevNote />
			<div
				id='controller'
				className='fixed left-0 bottom-0 z-[1002]  w-full bg-opacity-50 p-4'>
				<DurationSlider />
				<Controller />
			</div>
		</>
	);
}

export default UI;
