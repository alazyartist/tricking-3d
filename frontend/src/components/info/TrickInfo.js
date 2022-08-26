import React, { useState } from "react";
import { useStore } from "../../store/store";
import { TrickInformation } from "../../data/TrickInfoJson";
import Interact from "../../pages/dash/components/Interact";
import TrickInfoComments from "./TrickInfoComments";
import { useGetTricksById } from "../../api/useGetTricks";

export default function TrickInfo() {
	const setInfo = useStore((state) => state.setInfo);
	const [count, setCount] = useState(0);
	const trick_id = useStore((state) => state.trick_id);
	const currentAnim = useStore((state) => state.currentAnim);

	const { data: trickDetails } = useGetTricksById(trick_id);
	console.log(trickDetails);
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
						<div className='text-xs text-zinc-500'>{trick_id}</div>
						<p
							id='trick-info'
							className='mt-4 w-[50vw] justify-center font-inter text-base font-light md:text-lg'>
							{TrickInfoText?.length > 1
								? TrickInfoText
								: trickDetails?.length
								? trickDetails?.[0]?.name
								: "Info Will Be Added Soon"}
						</p>
						{trickDetails?.[0]?.base_id !== undefined && (
							<>
								<div>
									Base{" "}
									{(trickDetails?.[0]?.base_id === trickDetails?.[0]?.name &&
										trickDetails?.[0]?.name) ||
										`Base Trick`}
								</div>
								<div className='flex gap-2'>
									<div>{trickDetails?.[0]?.takeoffStance}</div>
									<div>{trickDetails?.[0]?.landingStance}</div>
								</div>
								<div>Type {trickDetails?.[0]?.trickType}</div>
							</>
						)}
						<TrickInfoComments count={count} />
						<Interact count={count} setCount={setCount} />
					</div>
				</div>
			</div>
		</>
	);
}
