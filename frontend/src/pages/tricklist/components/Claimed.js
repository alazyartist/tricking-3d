import React, { useState } from "react";
import { MdCircle, MdCheckCircle } from "react-icons/md";

const Claimed = ({ combo }) => {
	const [claimed, setClaimed] = useState(false);

	return (
		<div
			onClick={() => {
				console.log(combo);
				// console.log(
				// "Claim",
				// listItem?.Combo.combo_id,
				// listItem.Combo.name)}
				setClaimed(!claimed);
			}}
			className='h-8 w-8 place-items-end text-3xl text-emerald-500'>
			{claimed ? <MdCheckCircle /> : <MdCircle className='text-yellow-500' />}
		</div>
	);
};

export default Claimed;
