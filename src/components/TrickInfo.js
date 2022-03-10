import React, { useEffect } from "react";
import { useStore } from "../store/store";
import { TrickInformation } from "../data/TrickInfoJson";

export default function TrickInfo() {
	const currentAnim = useStore((state) => state.currentAnim);
	const TrickInfoText = TrickInformation[currentAnim]?.toString();
	return (
		<div
			id='trick-info-container'
			className='m-4 grid basis-10/12 grid-flow-row place-content-start justify-items-start gap-2 align-middle text-zinc-400 '>
			<h2 id='trick-info-header' className='text-3xl font-black '>
				{currentAnim}
			</h2>
			<p id='trick-info' className='text-base font-light'>
				{TrickInfoText.length > 1 ? TrickInfoText : "Info Will Be Added Soon"}
			</p>
		</div>
	);
}
