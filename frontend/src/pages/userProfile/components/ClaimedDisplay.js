import React from "react";
import { IoIosPlay } from "react-icons/io";
import { useStore } from "../../../store/store";

const ClaimedDisplay = ({ Claimed }) => {
	const setModel = useStore((s) => s.setModel);
	const selectAnim = useStore((s) => s.selectAnim);
	const setTimescale = useStore((s) => s.setTimescale);

	const handleUpdateAnim = (listItem) => {
		setTimescale(0.89);
		setModel(listItem?.Animation?.model);
		selectAnim(listItem?.Animation?.animationName);
	};
	return (
		<div className='flex flex-col gap-2'>
			{(Claimed?.length &&
				Claimed?.map((list) => (
					<div
						onClick={() => handleUpdateAnim(list)}
						className='place-items-center flex gap-3 rounded-xl   bg-emerald-800 p-2 text-lg'>
						<IoIosPlay />
						<div>{list?.name}</div>
					</div>
				))) ||
				"No ClaimedTricks to Display"}
		</div>
	);
};

export default ClaimedDisplay;
