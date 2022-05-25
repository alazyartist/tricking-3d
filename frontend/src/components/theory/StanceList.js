import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { stanceArr } from "../../data/TricklistClass";
import { useComboMakerStore } from "../../store/comboMakerStore";
import ArrayDisplay from "./comboMaker/ArrayDisplay";
import TransitionButtons from "./comboMaker/TransitionButtons";
function StanceList({ setCurrentStance, currentStance }) {
	const currentLeg = useComboMakerStore((s) => s.currentLeg);
	const setCurrentLeg = useComboMakerStore((s) => s.setCurrentLeg);
	const currentDirection = useComboMakerStore((s) => s.currentDirection);
	const setCurrentDirection = useComboMakerStore((s) => s.setCurrentDirection);
	let filteredStances = stanceArr.filter(
		(e) =>
			e.leg == currentLeg ||
			(e.direction == currentDirection && e.leg == "Both")
	);
	// setCurrentLeg("Left");
	const nav = useNavigate();
	useEffect(() => {
		console.log(currentLeg);
		console.log(currentDirection);
	}, [currentLeg, currentStance, currentDirection]);
	return (
		<>
			<div className='mt-2 rounded-xl bg-zinc-300'>
				<div className='flex'>
					<ArrayDisplay
						bg
						stanceList
						startOpen
						name='Stances'
						arr={filteredStances}
						f={(e) => {
							setCurrentDirection(e.direction);
							setCurrentLeg(e.leg);
							setCurrentStance(e.name);
							// nav(e.name);
						}}></ArrayDisplay>
					<div className=''>
						<TransitionButtons
							f={() => {
								setCurrentLeg("Left");
							}}
							currentLeg={"Left"}
						/>
						<TransitionButtons
							f={() => {
								setCurrentLeg("Right");
							}}
							currentLeg={"Right"}
						/>
						<TransitionButtons
							f={() => {
								setCurrentLeg("Both");
							}}
							currentLeg={"Both"}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default StanceList;
