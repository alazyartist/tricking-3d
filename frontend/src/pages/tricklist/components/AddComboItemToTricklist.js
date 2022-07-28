import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import ChooseTrick from "./ChooseTrick";

const AddComboItemToTricklist = ({ tricklist_id }) => {
	const [addItemopen, setAddItemopen] = useState(false);

	return (
		<div className='text-zinc-300'>
			<AiOutlinePlusCircle
				onClick={() => setAddItemopen(!addItemopen)}
				className='absolute bottom-[4.5rem] left-10 h-14 w-14'
			/>
			{addItemopen && (
				<ChooseTrick
					tricklist_id={tricklist_id}
					open={addItemopen}
					setOpen={setAddItemopen}
				/>
			)}
		</div>
	);
};

export default AddComboItemToTricklist;
