import React, { useEffect, useState } from "react";

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
			{trickOrCombo === "Trick" && <TrickDetailDisplay details={trickInfo} />}
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

const TrickDetailDisplay = ({ trick, details, comboTrick }) => {
	return (
		<div>
			{details?.base_id &&
				!comboTrick &&(
					<>
						<div>
							Base{" "}
							{(details?.base_id === details?.name && details?.name) ||
								`Base Trick`}
						</div>
						<div className='flex gap-2'>
							<div>{details?.takeoffStance}</div>
							<div>{details?.landingStance}</div>
						</div>
						<div>Type {details?.trickType}</div>
					</>
				)}
			{comboTrick && trick?.name === details?.name && (
				<div className='flex flex-col'>
					<div>
						Base{" "}
						{(details?.base_id === details?.name && details?.name) ||
							`Base Trick`}
					</div>
					<div className='flex gap-2'>
						<div>{details?.takeoffStance}</div>
						<div>{details?.landingStance}</div>
					</div>
					<div>Type {details?.trickType}</div>
				</div>
			)}
		</div>
	);
};

export default TrickOrComboDetails;
