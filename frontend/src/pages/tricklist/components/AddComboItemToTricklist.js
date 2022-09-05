import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import ChooseCombo from "./ChooseTrick";

const AddComboItemToTricklist = ({
	tricklist_id,
	addItemopen,
	setAddItemopen,
}) => {
	return (
		<div className='sticky top-0 text-zinc-300'>
			{!addItemopen && (
				<AiOutlinePlusCircle
					onClick={() => setAddItemopen(!addItemopen)}
					className='h-8 w-8'
				/>
			)}
			{addItemopen && (
				<ChooseCombo
					tricklist_id={tricklist_id}
					open={addItemopen}
					setOpen={setAddItemopen}
				/>
			)}
		</div>
	);
};

export default AddComboItemToTricklist;
