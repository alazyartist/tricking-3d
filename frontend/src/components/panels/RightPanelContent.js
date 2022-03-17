import React from "react";
import Controller from "../Controller";
import DurationSlider from "../DurationSlider";
import TimeSlider from "../TimeSlider";
import AnimationsDropdown from "../AnimationsDropwdown";
import ModelDropdown from "../ModelDropdown";

function RightPanelContent() {
	return (
		<>
			<DurationSlider />
			<Controller />
			<TimeSlider />
			<ModelDropdown />
			<AnimationsDropdown />
		</>
	);
}

export default RightPanelContent;
