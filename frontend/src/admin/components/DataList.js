import React from "react";
import { FaCheck, FaCircle } from "react-icons/fa";
import useGetCombos from "../../api/useGetCombos";
import useGetTricks, { useGetTrickPoints } from "../../api/useGetTricks";

const DataList = () => {
	const { data: tricks } = useGetTricks();
	const { data: combos } = useGetCombos();
	const { data: trickPoints } = useGetTrickPoints();
	return (
		<div className='no-scrollbar flex max-h-[50vh] w-full flex-col place-items-center gap-2 overflow-y-scroll rounded-xl pb-14'>
			<h1 className='sticky top-0 h-full w-full bg-zinc-800 p-2 text-center text-xl font-bold'>
				TRICKS, STANCES, &#38; TRANSITIONS
			</h1>
			<div className='w-full'>
				{tricks
					?.sort((a, b) => {
						if (a.type < b.type) return 1;
						if (a.type > b.type) return -1;
						if (a.name < b.name) return -1;
						if (a.name > b.name) return 1;
						return 0;
					})
					?.map((trick) => (
						<div
							key={Math.random()}
							onClick={() => console.log(trick)}
							className=' grid  w-full grid-cols-6 justify-between p-2 odd:bg-zinc-700'>
							<div className='col-span-3'>{trick?.name}</div>
							<div className='col-span-1 flex place-items-center text-sm'>
								{trick?.type}
							</div>
							<div className='col-span-1'>
								{trickPoints?.map((tp) => {
									return tp?.name === trick?.name && tp?.Total;
								})}
								{trick.type === "Stance" && trick.pointValue}
								{trick.type === "Transition" && trick.pointValue}
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
						className='grid w-[70vw] grid-cols-4 justify-between p-2 odd:bg-zinc-700'>
						<div className='col-span-2'>{combo?.name}</div>
						<div className='flex place-content-end place-items-center gap-2'>
							DA
							{combo?.defaultAnimation && (
								<FaCheck className='text-emerald-500' />
							)}
						</div>
						<div className='flex place-content-end place-items-center gap-2'>
							CA
							{combo?.comboArray ? (
								<FaCheck className='text-emerald-500' />
							) : (
								<FaCircle className='text-red-700' />
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default DataList;
