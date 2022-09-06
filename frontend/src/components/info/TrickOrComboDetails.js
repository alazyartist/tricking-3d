import React from "react";

const TrickOrComboDetails = ({ trickOrCombo, details }) => {
	return (
		<div>
			{trickOrCombo === "Trick" && (
				<div>
					{details?.[0]?.base_id !== undefined && (
						<>
							<div>
								Base{" "}
								{(details?.[0]?.base_id === details?.[0]?.name &&
									details?.[0]?.name) ||
									`Base Trick`}
							</div>
							<div className='flex gap-2'>
								<div>{details?.[0]?.takeoffStance}</div>
								<div>{details?.[0]?.landingStance}</div>
							</div>
							<div>Type {details?.[0]?.trickType}</div>
						</>
					)}
				</div>
			)}
			{trickOrCombo === "Combo" && (
				<div className='flex gap-2'>
					{details?.[0]?.comboArray?.length &&
						details?.[0]?.comboArray?.map((trick) => {
							return (
								<>
									<div
										className='rounded-xl bg-zinc-800 p-2'
										key={trick?.trick_id}>
										{trick?.name}
									</div>
								</>
							);
						})}
				</div>
			)}
		</div>
	);
};

export default TrickOrComboDetails;
