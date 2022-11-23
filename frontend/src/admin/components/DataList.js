import React from "react";
import { FaCheck, FaCircle } from "react-icons/fa";
import useGetCombos from "../../api/useGetCombos";
import useGetTricks, { useGetTrickPoints } from "../../api/useGetTricks";
import DataListCommandBar from "../DataListCommandBar";
import MakeNewTrickModal from "./sessionreview/MakeNewTrickModal";
import { useSessionSummariesStore } from "./sessionreview/SessionSummaryStore";

const DataList = () => {
	const { data: tricks } = useGetTricks();
	const { data: combos } = useGetCombos();
	const { data: trickPoints, refetch } = useGetTrickPoints();
	let trickMakerOpen = useSessionSummariesStore((s) => s.trickMakerOpen);
	return (
		<div className='no-scrollbar flex max-h-[70vh] w-full flex-col place-items-center gap-2 overflow-y-scroll rounded-xl pb-14'>
			<h1
				onClick={() => refetch()}
				className='sticky top-0 h-full w-full bg-zinc-800 p-2 text-center text-xl font-bold'>
				TRICKS, STANCES, &#38; TRANSITIONS
			</h1>
			<div className='w-[70vw] text-sm'>
				{tricks
					?.sort((a, b) => {
						if (a.type < b.type) return 1;
						if (a.type > b.type) return -1;
						if (a.base_id > b.base_id) return 1;
						if (a.base_id < b.base_id) return -1;
						if (a.pointValue > b.pointValue) return 1;
						if (b.pointValue < a.pointValue) return -1;

						return a.name?.localeCompare(b.name, undefined, {
							numeric: true,
							sensitivity: "base",
						});
					})
					?.map((trick) => (
						<div
							key={Math.random()}
							onClick={() => console.log(trick)}
							className=' grid  w-full grid-cols-6 place-items-center justify-between  p-2 odd:bg-zinc-700'>
							<div className='col-span-3 max-w-[1/3] place-self-start'>
								{trick?.name}
							</div>
							<div className='col-span-1 flex place-items-center text-sm'>
								{trick?.type.slice(0, 6)}
							</div>
							<div className='col-span-1'>
								{trick.pointValue}
								{/* {trickPoints?.map((tp) => {
									return tp?.name === trick?.name && tp?.Total?.toFixed(2);
								})}
								{trick.type === "Stance" && trick.pointValue?.toFixed(2)}
								{trick.type === "Transition" && trick.pointValue?.toFixed(2)} */}
							</div>
							<div className='col-span-1 flex place-content-end place-items-center gap-2'>
								DA
								{trick?.defaultAnimation ? (
									<FaCheck className='text-emerald-500' />
								) : (
									<FaCircle className='text-red-700' />
								)}
							</div>
						</div>
					))}
			</div>
			<h1 className='sticky top-0 h-full w-full bg-zinc-800 p-2 text-center text-xl font-bold'>
				Combos
			</h1>
			<div>
				{combos?.map((combo) => (
					<div
						key={Math.random()}
						className='grid w-[70vw] grid-cols-4 place-content-center place-items-center justify-between p-2 text-sm odd:bg-zinc-700'>
						<div className=' col-span-2 max-w-[120px] place-self-start overflow-hidden whitespace-pre-wrap md:max-w-[400px]'>
							{combo?.name}
						</div>
						<div className='text-center'>{combo?.pointValue}</div>
						<div className='flex place-content-end place-items-center gap-2'>
							DA
							{combo?.defaultAnimation ? (
								<FaCheck className='text-emerald-500' />
							) : (
								<FaCircle className='text-red-700' />
							)}
						</div>
						{/* <div className='flex place-content-end place-items-center gap-2'>
							CA
							{combo?.comboArray ? (
								<FaCheck className='text-emerald-500' />
							) : (
								<FaCircle className='text-red-700' />
							)}
						</div> */}
					</div>
				))}
			</div>
			<DataListCommandBar />
			{trickMakerOpen ? <MakeNewTrickModal /> : null}
		</div>
	);
};

export default DataList;
