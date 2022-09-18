import React, { useState } from "react";
import ChooseCombo from "./ChooseTrick";

const AddComboItemToTricklist = ({
	tricklist_id,
	addItemopen,
	setAddItemopen,
	selected,
}) => {
	return (
		<>
			<div className='sticky top-0 text-zinc-300'>
				{!addItemopen && (
					<button
						className=' neumorphic active:neumorphicIn
							fit flex h-[10vw] w-[60vw]
							flex-col items-center justify-center rounded-full  bg-zinc-800 font-inter text-lg font-semibold text-zinc-400
							'
						onClick={() => setAddItemopen(!addItemopen)}>
						Add New Combo{" "}
						<span className='text-sm text-zinc-500'>{selected?.name}</span>
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
