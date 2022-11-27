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
		<div
			className={`flex h-full w-full flex-col ${
				Claimed?.length ? "place-content-start" : "place-content-center"
			} gap-2 p-2 text-center`}>
			{(Claimed?.length &&
				Claimed?.map((list) => (
					<div
						onClick={() => list.Animation && handleUpdateAnim(list)}
						className='flex place-items-center gap-3 rounded-xl   bg-zinc-800 p-2 text-lg'>
						{list.Animation && <IoIosPlay className='text-emerald-500' />}
						<div>{list?.name}</div>
					</div>
				))) ||
				"No ClaimedTricks to Display"}
		</div>
	);
};

export default ClaimedDisplay;
