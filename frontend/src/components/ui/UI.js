import React from "react";
import ActiveDevNote from "../info/ActiveDevNote";
import AnimationsDropwdown from "./AnimationsDropwdown";
import Controller from "../media/Controller";
import DurationSlider from "./DurationSlider";
import ModelDropdown from "./ModelDropdown";
import TimeSlider from "./TimeSlider";
import { Link } from "react-router-dom";
import InfoButton from "./InfoButton";
import Header from "../Header";
import InstructionsModal from "../InstructionsModal";
function UI() {
	return (
		<>
			<div
				id='dropdowns-div'
				className='max-h-750px absolute z-20 ml-3 mt-[45px] flex gap-3'>
				<AnimationsDropwdown className='z-30' />
				<InfoButton />
				<ModelDropdown className='z-40' />
			</div>
			<ActiveDevNote />
			<div
				id='controller'
				className='fixed left-0 bottom-0 z-[2] w-full bg-opacity-50 p-4  md:left-[10vw] md:w-[80vw] xl:left-[30vw] xl:w-[40vw]'>
				<DurationSlider />
				<Controller />
				<InstructionsModal />
			</div>
		</>
	);
}

export default UI;
