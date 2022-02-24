import React, { useEffect } from "react";
import { useStore } from "../store/store";
import { TrickInformation } from "../data/TrickInfoJson";

export default function TrickInfo() {
	const currentAnim = useStore((state) => state.currentAnim);

	return (
		<div className='m-4 grid grid-flow-row place-content-start justify-items-start gap-2 align-middle text-zinc-400 '>
			<h2 className='text-3xl font-black '>{currentAnim}</h2>
			<p className='text-base font-light'>
				{TrickInformation[currentAnim]?.toString()}
			</p>
		</div>
	);
}
