import React from "react";
import { FaPlusCircle } from "react-icons/fa";

const AddListButton = ({ setOpen, open }) => {
	return (
		<button
			onClick={() => {
				setOpen(!open);
			}}
			className=' fit h-fit rounded-full bg-blue-500 p-2 font-inter text-sm font-semibold text-zinc-200'>
			<FaPlusCircle />
		</button>
	);
};

export default AddListButton;
