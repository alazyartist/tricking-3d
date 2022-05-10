import React from "react";
import { ReactComponent as AOAT } from "../../data/AnatomyOfATrick.svg";
import { ReactComponent as AOAC } from "../../data/AnatomyOfACombo.svg";
import AOATText from "../../components/theory/AOATText";
function AnatomyOfATrick() {
	return (
		<div className='w-[80vw]'>
			<div className='sticky top-0 h-14'></div>
			<div className='font-inter mt-4 flex flex-col place-content-center place-items-center font-bold text-white'>
				AnatomyOfATrick
			</div>

			<AOAT className='w-[80vw] rounded-xl bg-zinc-400 text-zinc-400' />
			<AOATText />
			<AOAC className='mt-4 w-[80vw] rounded-xl bg-zinc-400 text-zinc-400' />
		</div>
	);
}

export default AnatomyOfATrick;
