import React, { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import { TrickInformation } from "../../data/TrickInfoJson";
import Interact from "../../pages/dash/components/Interact";
import TrickInfoComments from "./TrickInfoComments";
import { useGetTricksById } from "../../api/useGetTricks";
import { useGetComboById } from "../../api/useGetCombos";
import TrickOrComboDetails from "./trickInfo/TrickOrComboDetails";

export default function TrickInfo() {
	const setInfo = useStore((state) => state.setInfo);
	const [count, setCount] = useState(0);
	const trick_id = useStore((state) => state.trick_id);
	const trickOrCombo = useStore((state) => state.trickOrCombo);
	const currentAnim = useStore((state) => state.currentAnim);
	const [details, setDetails] = useState();

	const { data: trickDetails } = useGetTricksById(trick_id);
	const { data: comboDetails } = useGetComboById(trick_id);
	useEffect(() => {
		if (trickOrCombo === "Trick") {
			setDetails(trickDetails);
		} else if (trickOrCombo === "Combo") {
			setDetails(comboDetails);
		}
	}, [trick_id, comboDetails, trickDetails]);
	useEffect(() => {}, [details]);
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
						<div className='flex gap-3'>
							<h5>{trickOrCombo}</h5>
							{details?.[0]?.trickType && (
								<h5>
									<span className='pr-2'>|</span> {details?.[0]?.trickType}
								</h5>
							)}
						</div>

						<TrickOrComboDetails
							details={details?.[0]}
							trickOrCombo={trickOrCombo}
						/>

						<TrickInfoComments count={count} />
						<Interact count={count} setCount={setCount} />
					</div>
				</div>
			</div>
		</>
	);
}
