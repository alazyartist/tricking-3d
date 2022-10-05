import React from "react";
import ActiveDevNote from "../../../components/info/ActiveDevNote";
import Controller from "../../../components/media/Controller";
import DurationSlider from "./DurationSlider";
import ModalNav from "./ModalNav";
import VideoOverlay from "./VideoOverlay";

function UI() {
	return (
		<>
			<div className='pt-3'></div>
			<ModalNav />
			<ActiveDevNote />
			<VideoOverlay />
			<div
				id='controller'
				className='fixed left-0 bottom-0 z-[2] w-full bg-opacity-50 p-4 pb-7  md:left-[10vw] md:w-[80vw] xl:left-[30vw] xl:w-[40vw]'>
				<DurationSlider />
				<Controller />
			</div>
		</>
	);
}

export default UI;
