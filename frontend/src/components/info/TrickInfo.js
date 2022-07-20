import React, { useState } from "react";
import { useStore } from "../../store/store";
import { TrickInformation } from "../../data/TrickInfoJson";
import Interact from "../../pages/dash/components/Interact";
import TrickInfoComments from "./TrickInfoComments";

export default function TrickInfo() {
	const setInfo = useStore((state) => state.setInfo);
	const [count, setCount] = useState();

	const currentAnim = useStore((state) => state.currentAnim);
	const TrickInfoText = TrickInformation[currentAnim]?.toString();
	return (
		<>
			<div
				id='modal-conatiner'
				className='fixed top-0 left-0 z-[1000] h-full w-full '>
				<div id='trick-info-containers-reposition' className='relative top-20'>
					<div
						id='trick-info-container'
						className='z-30 m-10 flex h-auto w-auto flex-col place-items-center p-4 align-middle text-zinc-200 '>
						<h2
							id='trick-info-header'
							className='justify-center text-3xl font-black '>
							{currentAnim}
						</h2>
						<p
							id='trick-info'
							className='mt-4 w-[50vw] justify-center font-inter text-base font-light md:text-lg'>
							{TrickInfoText?.length > 1
								? TrickInfoText
								: "Info Will Be Added Soon"}
						</p>
						<TrickInfoComments count={count} />
						<Interact count={count} setCount={setCount} />
					</div>
				</div>
			</div>
		</>
	);
}
