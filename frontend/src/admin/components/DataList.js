import React from "react";
import { FaCheck, FaCircle } from "react-icons/fa";
import useGetCombos from "../../api/useGetCombos";
import useGetTricks from "../../api/useGetTricks";

const DataList = () => {
	const { data: tricks } = useGetTricks();
	const { data: combos } = useGetCombos();
	return (
		<div className='no-scrollbar flex max-h-[50vh] w-[70vw] flex-col place-items-center gap-2 overflow-y-scroll rounded-xl pb-14'>
			<h1 className='sticky top-0 h-full w-full bg-zinc-800 p-2 text-center text-xl font-bold'>
				TRICKS, STANCES, &#38; TRANSITIONS
			</h1>
			<div>
				{tricks?.map((trick) => (
					<div className=' grid  w-full grid-cols-6 justify-between p-2 odd:bg-zinc-700'>
						<div className='col-span-3'>{trick?.name}</div>
						<div className='col-span-2 flex place-items-center text-sm'>
							{trick?.type}
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
					<div className='grid w-[70vw] grid-cols-4 justify-between p-2 odd:bg-zinc-700'>
						<div className='col-span-2'>{combo?.name}</div>
						<div className='flex place-content-end place-items-center gap-2'>
							DA
							{combo?.defaultAnimation && (
								<FaCheck className='text-emerald-500' />
							)}
						</div>
						<div className='flex place-content-end place-items-center gap-2'>
							C
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
