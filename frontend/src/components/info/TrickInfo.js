import React, { useEffect } from "react";
import { useStore } from "../../store/store";
import { TrickInformation } from "../../data/TrickInfoJson";

export default function TrickInfo() {
	const setInfo = useStore((state) => state.setInfo);
	const currentAnim = useStore((state) => state.currentAnim);
	const TrickInfoText = TrickInformation[currentAnim]?.toString();
	return (
		<div id='modal-conatiner' className='absolute z-20 h-full w-full '>
			<div id='trick-info-containers-reposition' className='relative top-20'>
				<div
					id='trick-info-container'
					className='z-30 m-10 flex h-auto w-auto flex-col place-items-center rounded-3xl bg-zinc-500 p-4 align-middle text-zinc-200 '>
					<h2
						id='trick-info-header'
						className='justify-center text-3xl font-black '>
						{currentAnim}
					</h2>
					<p id='trick-info' className='justify-center text-base font-light'>
						{TrickInfoText?.length > 1
							? TrickInfoText
							: "Info Will Be Added Soon"}
					</p>
				</div>
			</div>
			<div
				id='trick-info-modal-bg'
				className='absolute top-0 z-[-1] h-full w-full bg-zinc-300 bg-opacity-40 filter'
				onClick={() => setInfo()}></div>
		</div>
	);
}
