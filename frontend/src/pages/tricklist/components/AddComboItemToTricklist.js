import React, { useState } from "react";
import ChooseCombo from "./ChooseTrick";

const AddComboItemToTricklist = ({
	tricklist_id,
	addItemopen,
	setAddItemopen,
}) => {
	return (
		<>
			<div className='sticky top-0 text-zinc-300'>
				{!addItemopen && (
					<button
						className=' 
							fit flex h-[10vw] w-[60vw]
							flex-row items-center justify-center rounded-full border-[6px] border-zinc-400 bg-zinc-800 font-inter text-lg font-semibold text-zinc-400
							'
						onClick={() => setAddItemopen(!addItemopen)}>
						Add New Combo
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
		</>
	);
};

export default AddComboItemToTricklist;
