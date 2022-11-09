import React from "react";
import { useGetTrickParts } from "../../../api/useGetTricks";
import StanceRemap from "../../../components/info/trickInfo/StanceRemap";
import { MdClose } from "../../../data/icons/MdIcons";
import { useSessionSummariesStore } from "./SessionSummaryStore";
const details = {
	base_id: "Backflip",
	Variations: [
		{ Variation: { name: "Fulltwist" } },
		{ Variation: { name: "hyper" } },
	],
	name: "Cork.hyper",
	landingStance: "BacksideHyper",
	takeoffStance: "BacksideComplete",
};
const MakeNewTrickModal = () => {
	const { data: trickParts } = useGetTrickParts();
	const trickMakerOpen = useSessionSummariesStore((s) => s.trickMakerOpen);
	const setTrickMakerOpen = useSessionSummariesStore(
		(s) => s.setTrickMakerOpen
	);
	console.log(trickParts);
	return trickMakerOpen ? (
		<div className='z-100 absolute top-[5vh] left-[15vw] h-[80vh] w-[70vw] rounded-xl bg-zinc-800'>
			<MdClose
				className={`absolute top-2 right-2 text-5xl text-zinc-300`}
				onClick={() => setTrickMakerOpen()}
			/>
			<div className='flex w-full place-content-center '>
				<input
					type={"text"}
					value={details?.name}
					className=' bg-transparent text-center font-titan text-3xl text-zinc-300'
				/>
			</div>
			<div className='m-2 flex flex-col items-center gap-4 text-3xl text-zinc-300'>
				<div className='flex items-center gap-2 rounded-md border-2 border-zinc-700'>
					<StanceRemap trickMaker={true} stance={details?.takeoffStance} />
					<div className='flex flex-col gap-2'>
						<div className='rounded-md border-[1px] border-zinc-400 p-1 px-4 text-center'>
							{(details?.base_id !== details?.name && details?.base_id) ||
								`Base Trick`}
						</div>
						<div className='flex flex-col'>
							{details?.Variations.map((v) => (
								<div
									key={`${v.id}+${Math.random()}`}
									className='border-2 border-purple-400 p-1 px-4 first:rounded-t-md first:border-b-[1px] last:rounded-b-md last:border-t-[1px]'>
									{v?.Variation?.name}
								</div>
							))}
						</div>
					</div>
					<StanceRemap trickMaker={true} stance={details?.landingStance} />
				</div>
			</div>
		</div>
	) : null;
};

export default MakeNewTrickModal;
