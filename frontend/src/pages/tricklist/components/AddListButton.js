import React from "react";

const AddListButton = ({ setOpen, open }) => {
	return (
		<button
			onClick={() => {
				setOpen(!open);
			}}
			className='rounded-full bg-blue-500 p-3 font-inter font-semibold text-zinc-200'>
			Make New List
		</button>
	);
};

export default AddListButton;
