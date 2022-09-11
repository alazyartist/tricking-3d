import React from "react";
import { FaPlusCircle } from "react-icons/fa";

const AddListButton = ({ setOpen, open }) => {
	return (
		<button
			className=' 
				flex flex-row justify-center items-center
				fit h-[10vw] w-[10vw] rounded-full bg-zinc-800 border-zinc-400 border-[6px] font-inter text-lg font-semibold text-zinc-400
			'
			onClick={() => {
				setOpen(!open);
			}}
		>
			{/*<FaPlusCircle />*/}
			+
		</button>
	);
};

export default AddListButton;
