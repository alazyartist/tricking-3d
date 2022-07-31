import React from "react";
import { MdSave } from "react-icons/md";

const SaveCombo = ({ setComboName, comboName, setSave, save }) => {
	return (
		<div
			className='flex 
        place-items-center justify-between'>
			<input
				placeholder={"Name your combo!"}
				onChange={(e) => setComboName(e.target.value)}
				className={"w-[75vw] rounded-xl bg-transparent p-2"}
				type={"text"}
				value={comboName}
			/>
			<div className='h-fit w-fit text-4xl' onClick={() => setSave(!save)}>
				<MdSave />
			</div>
		</div>
	);
};

export default SaveCombo;
