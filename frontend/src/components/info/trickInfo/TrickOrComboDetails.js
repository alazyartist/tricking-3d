import React, { useEffect, useState } from "react";
import StanceRemap from "./StanceRemap";
import { useGetTricksById } from "../../../api/useGetTricks";

const TrickOrComboDetails = ({ trickOrCombo, details }) => {
	const [trickInfo, setTrickInfo] = useState();
	const [trickInfoOpen, setTrickInfoOpen] = useState();
	useEffect(() => {
		setTrickInfo(details);
	}, [details]);
	useEffect(() => {
		console.log(trickInfo, trickOrCombo);
	}, [trickInfo]);
	const handleClick = (trick) => {
		setTrickInfo(trick);
		setTrickInfoOpen(!trickInfoOpen);
	};
	return (
		<div>
			{trickOrCombo === "Trick" && (
				<TrickDetailDisplay
					trick_id={trickInfo?.trick_id}
					details={trickInfo}
				/>
			)}
			{trickOrCombo === "Combo" && (
				<div className='flex gap-2'>
					{details?.comboArray?.length &&
						details?.comboArray?.map((trick) => {
							return (
								<div>
									<div
										onClick={() => handleClick(trick)}
										className='rounded-xl bg-zinc-800 p-2'
										key={trick?.trick_id}>
										{trick?.name}
									</div>
									{trickInfoOpen && (
										<TrickDetailDisplay
											comboTrick
											key={trick.trick_id + Math.random() * 100}
											trick={trick}
											trick_id={trickInfo?.trick_id}
											details={trickInfo}
										/>
									)}
								</div>
							);
						})}
				</div>
			)}
		</div>
	);
};

const TrickDetailDisplay = ({ trick, trick_id, comboTrick }) => {
	const [details, setDetails] = useState(trick);
	const { data } = useGetTricksById(trick_id);
	useEffect(() => {
		data && setDetails(data[0]);
		console.log(data?.[0]);
	}, [data]);
	return (
		<div className='flex flex-col place-items-center text-center'>
			{comboTrick
				? details?.name === trick?.name && (
						<div className='flex flex-col gap-4'>
							<div>{details?.base_id} </div>
							<div className='flex gap-2'>
								<StanceRemap stance={details?.takeoffStance} />
								<StanceRemap stance={details?.landingStance} />
							</div>
							<div className='flex flex-col'>
								{details?.Variations.map((v) => (
									<div>{v.Variation?.name}</div>
								))}
								{details?.Variations?.length &&
									details?.Variations?.map(
										(v) =>
											v.Variation.variationType === "Rotation" &&
											parseInt(v.Variation.value)
									)?.reduce((pv, cv) => pv + cv)}
							</div>
						</div>
				  )
				: details?.base_id && (
						<div className='flex flex-col gap-4'>
							<div className='text-center'>
								{(details?.base_id !== details?.name && details?.base_id) ||
									`Base Trick`}
							</div>
							<div className='flex gap-2'>
								<StanceRemap stance={details?.takeoffStance} />
								<StanceRemap stance={details?.landingStance} />
							</div>
							<div className='flex flex-col'>
								{details?.Variations.map((v) => (
									<div>{v.Variation.name}</div>
								))}
							</div>
						</div>
				  )}
		</div>
	);
};

export default TrickOrComboDetails;
