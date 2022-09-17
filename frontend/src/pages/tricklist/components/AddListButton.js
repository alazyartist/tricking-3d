import React from "react";
import MakeNewTrickList from "./MakeNewTrickList"
import { FaPlusCircle } from "react-icons/fa";
{/*<FaPlusCircle />*/}

const AddListButton = ({ setOpen, open }) => {
	return (
		<>{
			!open &&
				<button
					className=' 
					flex flex-row justify-center items-center
					fit h-[10vw] w-[60vw] rounded-full bg-zinc-800 border-zinc-400 border-[6px] font-inter text-lg font-semibold text-zinc-400
					'
					onClick={() => { setOpen(!open) }}>
					[ Add New Trick List ]
				</button>
			}{
			open &&
				<MakeNewTrickList setOpen={setOpen}/>
			}</>
	);
};

export default AddListButton;
