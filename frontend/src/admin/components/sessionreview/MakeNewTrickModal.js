import React from "react";
import { MdClose } from "../../../data/icons/MdIcons";
import { useSessionSummariesStore } from "./SessionSummaryStore";

const MakeNewTrickModal = () => {
	const trickMakerOpen = useSessionSummariesStore((s) => s.trickMakerOpen);
	const setTrickMakerOpen = useSessionSummariesStore(
		(s) => s.setTrickMakerOpen
	);
	return trickMakerOpen ? (
		<div className='z-100 absolute top-[5vh] left-[15vw] h-[80vh] w-[70vw] rounded-xl bg-red-500'>
			<MdClose onClick={() => setTrickMakerOpen()} />
			<div>MakeNewTrickModal</div>
		</div>
	) : null;
};

export default MakeNewTrickModal;
