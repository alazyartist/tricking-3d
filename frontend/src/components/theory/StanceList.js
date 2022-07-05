import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { stances } from "../../data/trickDataModel/TrickObjects";
import { stanceArr } from "../../data/TricklistClass";
import { useComboMakerStore } from "../../store/comboMakerStore";
import ArrayDisplay from "../../pages/comboMaker/components/ArrayDisplay";
import TransitionButtons from "../../pages/comboMaker/components/TransitionButtons.js";
function StanceList({ setCurrentStance, currentStance }) {
	const currentLeg = useComboMakerStore((s) => s.currentLeg);
	const setCurrentLeg = useComboMakerStore((s) => s.setCurrentLeg);
	const currentDirection = useComboMakerStore((s) => s.currentDirection);
	const setCurrentDirection = useComboMakerStore((s) => s.setCurrentDirection);
	let filteredStances = stanceArr.filter(
		(e) => e.direction == currentDirection || e.leg == currentLeg
	);
	// setCurrentLeg("Left");
	const nav = useNavigate();
	useEffect(() => {
		console.log(currentLeg);
		console.log(currentDirection);
		setCurrentStance(stances[currentStance].getNewStance(currentLeg));
	}, [currentLeg, currentDirection]);

	function whichLeg(toLeg) {
		switch (toLeg) {
			case "Left":
				return (
					<TransitionButtons
						f={() => {
							setCurrentLeg("Left");
						}}
						currentLeg={"Left"}
					/>
				);

			case "Both":
				return (
					<TransitionButtons
						f={() => {
							setCurrentLeg("Both");
						}}
						currentLeg={"Both"}
					/>
				);
			case "Right":
				return (
					<TransitionButtons
						f={() => {
							setCurrentLeg("Right");
						}}
						currentLeg={"Right"}
					/>
				);
		}
	}

	return (
		<>
			<div className='m-2 h-10 rounded-xl bg-zinc-300'>
				<ArrayDisplay
					isCollapsable
					name={"StanceList"}
					arr={stanceArr}
					f={(e) => {
						setCurrentDirection(e.direction);
						setCurrentLeg(e.leg);
						setCurrentStance(e.name);
						// nav(e.name);
					}}></ArrayDisplay>
			</div>
			<div className='rounded-xl bg-zinc-300'>
				<div className='mx-2 flex w-[80vw] place-content-center gap-2 overflow-hidden overflow-x-auto '>
					{/* {filteredStances.map((st) => (
						<div
							onClick={() => setCurrentStance(st.name)}
							className=' no-scrollbar flex flex-col place-content-center place-items-center '>
							<div>{st.name}</div>
                            </div>
                        ))} */}
					<TransitionButtons
						f={() => {
							setCurrentLeg("Right");
						}}
						currentLeg={"Right"}
					/>
					<TransitionButtons
						f={() => setCurrentLeg("Both")}
						currentLeg={"Both"}
					/>
					<TransitionButtons
						f={() => {
							setCurrentLeg("Left");
						}}
						currentLeg={"Left"}
					/>
				</div>
			</div>
			<div className=''></div>
		</>
	);
}

export default StanceList;
