import React, { useEffect, useState } from "react";
import { stanceArr, transArr, TrickListArr } from "../../data/TricklistClass";
import { stances } from "../../data/trickDataModel/TrickObjects";

import {
	Stance,
	Transition,
	Trick,
} from "../../data/trickDataModel/TrickClasses";
import ArrayDisplay from "./comboMaker/ArrayDisplay";
import { useComboMakerStore } from "../../store/comboMakerStore";
import CurrentStateInfo from "./comboMaker/CurrentStateInfo";
import ResetButton from "./comboMaker/ResetButton";
import NewComboDisplay from "./comboMaker/newComboDisplay";
import useComboMaker from "./comboMaker/useComboMaker";
import AdvancedStanceCircle from "./AdvancedStanceCircle";
import { ReactComponent as StanceCircle } from "../../data/AdvancedStancesSVG.svg";
import StanceAnimationTest from "./stances/StanceAnimationTest";
import TransitionButtons from "./comboMaker/TransitionButtons";

let newCombo = [];
function ComboMaker() {
	const [combo, setcombo] = useState();

	const {
		currentDirection,
		currentLeg,
		currentStance,
		currentTransition,
		isDelete,
		isTrick,
		setCurrentLeg,
		setCurrentStance,
		setCurrentDirection,
		setIsDelete,
		setIsTrick,
	} = useComboMaker(combo, setcombo, newCombo);

	//OnClick handlers
	function handleTrickAdd(e) {
		setcombo(e);
		setCurrentLeg(e.toLeg);
	}
	function handleStanceAdd(e) {
		setCurrentStance(stances[e] ? stances[e]?.name : currentStance);
		setCurrentLeg(e.getTrick().fromLeg);
		setcombo(e);
	}
	function resetTricklist() {
		newCombo = [];
		setcombo();
		setCurrentLeg("Left");
		setCurrentStance("BacksideComplete");
		setCurrentDirection("Backwards");
		setIsTrick(true);
	}
	function deleteLast() {
		setIsDelete(!isDelete);
		if (currentLeg !== newCombo[newCombo.length - 1]?.toLeg) {
			if (newCombo[newCombo.length - 1]?.toLeg) {
				setCurrentLeg(
					newCombo[newCombo.length - 2]?.toLeg ||
						newCombo[newCombo.length - 1]?.leg ||
						"Left"
				);
			}
		}
	}

	//Filters
	let filteredStances = stanceArr.filter(
		(e) =>
			(e.leg == currentLeg && !isTrick) ||
			(isTrick && e.landingStyle == stances[currentStance].landingStyle)
	);
	let filteredTricks = TrickListArr.filter(
		(e) => e.takeoffStance == currentStance && e.fromLeg == currentLeg
	);
	let isEmpty = filteredTricks.length == 0;
	let filteredTransitions = transArr.filter(
		(e) =>
			(!isEmpty && e.fromLeg == stances[currentStance]?.leg) ||
			(isEmpty && e.fromLeg == currentLeg)
	);
	// let rotation = currentTransition?.getNewRotation(currentStance);
	return (
		<div className='font-inter h-[80vh] w-[90vw]'>
			<div id='pageTitle' className=' text-2xl font-bold text-zinc-400'>
				ComboMaker
			</div>
			<div
				className=' flex h-[80vh] w-full
			 flex-col place-content-center place-items-center overflow-y-auto rounded-lg bg-sky-500 p-2 text-zinc-300'>
				<div className=''>
					<div>
						{/* CurrentState Display */}
						<div className=''>
							<CurrentStateInfo
								newCombo={newCombo}
								currentStance={currentStance}
								currentLeg={currentLeg}
								currentDirection={currentDirection}
							/>
						</div>
					</div>
					{/* Stance Container */}
					{/* <div
						id='stanceContainer'
						className={"flex w-full place-content-center place-items-center"}>
						<StanceAnimationTest currentStance={currentStance} />
					</div> */}
					{/* Combo State Array */}
					<NewComboDisplay newCombo={newCombo} />
					<div
						id='arrayContainer'
						className='grid grid-flow-row grid-cols-2 gap-2'>
						{/* Current Options Array for Selection */}
						{/* FilteredTricks */}
						<div className='flex w-full '>
							<ArrayDisplay
								bg
								startOpen
								isEmpty={isEmpty}
								name={"Tricks"}
								arr={filteredTricks}
								f={(e) => handleTrickAdd(e)}></ArrayDisplay>
						</div>
						<div className='flex flex-col gap-4 py-2'>
							{/* FilteredTransitions */}
							<ArrayDisplay
								isCollapsable
								name={<TransitionButtons currentLeg={currentLeg} />}
								arr={filteredTransitions}
								f={(e) => handleTrickAdd(e)}></ArrayDisplay>
							{/* FilteredStances */}
							<div className='h-40 w-40'>
								<StanceAnimationTest isSmall currentStance={currentStance} />
							</div>
							<div className=''>
								<ArrayDisplay
									bg
									isCollapsable
									isAnimated
									name='Stances'
									arr={filteredStances}
									f={(e) => handleStanceAdd(e)}></ArrayDisplay>
							</div>
						</div>
						{/* <div className=' flex w-full place-content-center rounded bg-zinc-600'>
						Timeline
					</div> */}
						<div className='fixed bottom-0 left-[20%] flex flex-row place-content-center place-items-center'>
							<ResetButton
								resetTricklist={resetTricklist}
								deleteLast={deleteLast}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ComboMaker;
