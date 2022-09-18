import React from "react";
import MakeNewTrickList from "./MakeNewTrickList";
import { FaPlusCircle } from "react-icons/fa";
{
	/*<FaPlusCircle />*/
}

const AddListButton = ({ setOpen, open }) => {
	return (
		<>
			{!open && (
				<button
					className=' 
					fit flex h-[10vw] w-[60vw]
					flex-row items-center justify-center rounded-full bg-zinc-800 font-inter text-lg font-semibold text-zinc-400 drop-shadow-lg
					'
					onClick={() => {
						setOpen(!open);
					}}>
					Add New Trick List
				</button>
			)}
			{open && <MakeNewTrickList setOpen={setOpen} />}
		</>
	);
};

export default AddListButton;
