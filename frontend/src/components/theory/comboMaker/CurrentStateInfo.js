import React, { useState } from "react";

function CurrentStateInfo({
	currentDirection,
	currentLeg,
	currentStance,
	newCombo,
}) {
	const [isOpen, setIsOpen] = useState();
	return (
		<div
			id='CurrentState'
			className={`${
				isOpen && "absolute top-3 left-3 z-[1001] w-[94vw]"
			}  w-full rounded-md bg-sky-300 p-2 text-sm text-zinc-700`}>
			<div onClick={() => setIsOpen(!isOpen)} className=''>
				{`${currentStance}`}
			</div>

			{isOpen && (
				<div onClick={() => setIsOpen(!isOpen)} className=''>
					<div id='CurrentStance'>{`Current Stance: ${currentStance}`}</div>
					<div>{`From: ${
						newCombo[newCombo.length - 2]?.name || "Pick another Trick"
					}`}</div>
					<div>{`To: ${
						newCombo[newCombo.length - 1]?.name || "Pick A Trick"
					}`}</div>
					<div>{`Current direction: ${currentDirection}`}</div>
					<div key={currentLeg + 1}>{`Landing Leg: ${currentLeg}`}</div>
				</div>
			)}
		</div>
	);
}

export default CurrentStateInfo;
