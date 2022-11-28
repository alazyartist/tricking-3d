import React from "react";
import { MediaButton } from "../../../components/media/MediaButton";
import {
	MdOutlineVisibility,
	MdOutlineVisibilityOff,
} from "../../../data/icons/MdIcons";
import { useStore } from "../../../store/store";
function ShowHideToggle() {
	const showUI = useStore((s) => s.showUI);
	const setUI = useStore((s) => s.setUI);
	return (
		<MediaButton
			id='show-hide-toggle'
			content={
				showUI ? (
					<MdOutlineVisibility className='fill-gray-300 text-2xl' />
				) : (
					<MdOutlineVisibilityOff className='fill-gray-300 text-2xl' />
				)
			}
			f={setUI}
		/>
	);
}

export default ShowHideToggle;
