import React from "react";
import { MdSave } from "../../../data/icons/MdIcons";

const SaveCombo = ({ setComboName, comboName, setSave, save }) => {
	return (
		<div
			className='flex 
        place-items-center justify-between'>
			<input
				onChange={(e) => setComboName(e.target.value)}
				className={"w-[75%] rounded-xl bg-transparent p-2"}
				type={"text"}
				placeholder='Name You Combo'
				value={comboName}
			/>
			<div className='h-fit w-fit text-4xl' onClick={() => setSave(!save)}>
				<MdSave />
			</div>
		</div>
	);
};

export default SaveCombo;
