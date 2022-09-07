import React from "react";
import DragableWrapper from "./Draggable.js";
//import { FaPlusCircle } from "react-icons/fa";

const TrickList_Component = ({ name, date, fn, swipe_left, swipe_right}) => {
	return (
		<DragableWrapper 
			drag_offset={60} 
			swipe_left={() => swipe_left()}
			swipe_right={() => swipe_right()}>
			<button
				onClick={() => fn()}
				className='break-all w-full rounded-md bg-blue-500 p-2 font-inter text-sm font-semibold text-zinc-200'>
				{name} | {date}
			</button>
		</DragableWrapper>
	);
};

export default TrickList_Component;
