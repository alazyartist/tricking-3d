import React from "react";
import Controller from "../media/Controller";
import DurationSlider from "../ui/DurationSlider";
import TimeSlider from "../ui/TimeSlider";
import ModelDropdown from "../ui/ModelDropdown";

function RightPanelContent() {
	return (
		<>
			<DurationSlider />
			<Controller />
			<TimeSlider />
			<ModelDropdown />
		</>
	);
}

export default RightPanelContent;
