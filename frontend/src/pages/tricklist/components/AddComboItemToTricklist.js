import React, { useState } from "react";
import ChooseCombo from "./ChooseTrick";

const AddComboItemToTricklist = ({
	tricklist_id,
	addItemopen,
	setAddItemopen,
}) => {
	return (
		<>
			{
				<div className='sticky top-0 text-zinc-300'>
					{!addItemopen && (
						<button
							className=' 
							flex flex-row justify-center items-center
							fit h-[10vw] w-[60vw] rounded-full bg-zinc-800 border-zinc-400 border-[6px] font-inter text-lg font-semibold text-zinc-400
							'
							onClick={() => setAddItemopen(!addItemopen)}>
							[ Add New Combo ]
						</button>
					)}
					{addItemopen && (
						<ChooseCombo
							tricklist_id={tricklist_id}
							open={addItemopen}
							setOpen={setAddItemopen}
						/>
					)}
				</div>
			}
		</>
	);
};

export default AddComboItemToTricklist;
