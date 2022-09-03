import React from "react";

const AddListButton = ({ setOpen, open }) => {
	return (
		<button
			onClick={() => {
				setOpen(!open);
			}}
			className=' h-fit w-2/5 rounded-full bg-blue-500 p-2 font-inter text-sm font-semibold text-zinc-200'>
			Make New List
		</button>
	);
};

export default AddListButton;
