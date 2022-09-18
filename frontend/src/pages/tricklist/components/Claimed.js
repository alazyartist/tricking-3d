import React, { useEffect, useState } from "react";
import { MdCircle, MdCheckCircle } from "react-icons/md";
import { useClaimCombo, useUnClaimCombo } from "../../../api/useClaimCombo";
import useUserInfoByUUID from "../../../api/useUserInfoById";

const Claimed = ({ displayOnly, combo, combo_id, user_id }) => {
	const [claimed, setClaimed] = useState(false);
	const { mutate: claim } = useClaimCombo();
	const { mutate: unclaim } = useUnClaimCombo();
	const { data: profileInfo } = useUserInfoByUUID(user_id);
	const isClaimed = profileInfo?.CombosClaimed?.some(
		(combo) => combo.combo_id === combo_id
	);

	const handleClaim = async () => {
		isClaimed ? unclaim({ user_id, combo_id }) : claim({ user_id, combo_id });
	};
	return (
		<div
			onClick={() => {
				// console.log(
				// "Claim",
				// listItem?.Combo.combo_id,
				// listItem.Combo.name)}
				setClaimed(!claimed);
				!displayOnly && handleClaim();
			}}
			className='absolute right-4 h-full w-8 translate-y-[-50%] text-3xl text-emerald-500'>
			{isClaimed ? <MdCheckCircle /> : <MdCircle className='text-yellow-500' />}
		</div>
	);
};

export default Claimed;
