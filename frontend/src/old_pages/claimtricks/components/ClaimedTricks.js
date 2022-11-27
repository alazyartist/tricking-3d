import React, { useEffect, useState } from "react";
import { MdCircle, MdCheckCircle } from "../../../data/icons/MdIcons";
import { useClaimTrick, useUnClaimTrick } from "../../../api/useClaimTricks";
import useUserInfoByUUID from "../../../api/useUserInfoById";

const ClaimedTricks = ({ displayOnly, user_id, trick_id }) => {
	const [claimed, setClaimed] = useState(false);
	const { mutate: claim } = useClaimTrick();
	const { mutate: unclaim } = useUnClaimTrick();
	const { data: profileInfo } = useUserInfoByUUID(user_id);
	const isClaimed = profileInfo?.TricksClaimed?.some(
		(combo) => combo.trick_id === trick_id
	);

	const handleClaim = async () => {
		isClaimed ? unclaim({ user_id, trick_id }) : claim({ user_id, trick_id });
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
			className='h-full w-8 text-3xl text-emerald-500'>
			{isClaimed ? <MdCheckCircle /> : <MdCircle className='text-yellow-500' />}
		</div>
	);
};

export default ClaimedTricks;
