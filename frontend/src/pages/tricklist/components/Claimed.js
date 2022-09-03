import React, { useState } from "react";
import { MdCircle, MdCheckCircle } from "react-icons/md";
import { useClaimCombo } from "../../../api/useClaimCombo";

const Claimed = ({ combo, combo_id, user_id }) => {
	const [claimed, setClaimed] = useState(false);
	const { mutate: claim } = useClaimCombo();
	const handleClaim = () => {
		claim({ user_id, combo_id });
		//needs user_id,combo_id
	};
	return (
		<div
			onClick={() => {
				console.log(combo);
				// console.log(
				// "Claim",
				// listItem?.Combo.combo_id,
				// listItem.Combo.name)}
				// setClaimed(!claimed);
				handleClaim();
			}}
			className='h-8 w-8 place-items-end text-3xl text-emerald-500'>
			{claimed ? <MdCheckCircle /> : <MdCircle className='text-yellow-500' />}
		</div>
	);
};

export default Claimed;
