import React, { Suspense, useEffect, useState } from "react";
import { stanceArr, transArr, TrickListArr } from "../../data/TricklistClass";
import { stances } from "../../data/trickDataModel/TrickObjects";

import {
	Stance,
	Transition,
	Trick,
} from "../../data/trickDataModel/TrickClasses";
import ArrayDisplay from "./components/ArrayDisplay";
import { useComboMakerStore } from "../../store/comboMakerStore";
import CurrentStateInfo from "./components/CurrentStateInfo";
import ResetButton from "./components/ResetButton";
import NewComboDisplay from "./components/newComboDisplay";
import useComboMaker from "../../hooks/useComboMaker";
import AdvancedStanceCircle from "../../components/theory/AdvancedStanceCircle";
import { ReactComponent as StanceCircle } from "../../data/AdvancedStancesSVG.svg";
import StanceAnimationTest from "../../components/theory/stances/StanceAnimationTest";
import TransitionButtons from "./components/TransitionButtons";
import { Canvas } from "@react-three/fiber";
import Loader from "../../components/loaders/Loader";
import { TrickListScene } from "../../scenes/TrickListScene";
import { ComboMakerScene } from "../../scenes/ComboMakerScene";
import AddComboItem from "./components/AddComboItem";

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
		setCurrentStance(stances[e]?.name);
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
		// Handles Switching Legs to ComboEnd
		if (currentLeg !== newCombo[newCombo.length - 1]?.toLeg) {
			if (newCombo[newCombo.length - 1]?.toLeg) {
				setCurrentLeg(
					newCombo[newCombo.length - 1]?.toLeg ||
						newCombo[newCombo.length - 1]?.leg ||
						newCombo[newCombo.length - 2]?.leg ||
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
		<>
			<div id='stateInfo-button-wrapper' className='absolute right-10'>
				{/* CurrentState Display */}
				<CurrentStateInfo
					newCombo={newCombo}
					currentStance={currentStance}
					currentLeg={currentLeg}
					currentDirection={currentDirection}
				/>
			</div>
			<div id='comboMaker-wrapper' className='h-[80vh] w-[90vw] font-inter'>
				{/* Page Title */}
				<div
					id='pageTitle'
					className='select-none text-2xl font-bold text-zinc-400'>
					ComboMaker
				</div>
				<div
					id='app-content'
					className='flex h-[80vh] w-full flex-col place-content-start place-items-center overflow-y-auto overflow-x-hidden rounded-lg  p-2 text-zinc-300 '>
					{/* Output for 3dView */}
					<div
						id='3dCanvas'
						className='mt-2 h-[10rem] w-full rounded-xl bg-zinc-700'>
						<Canvas>
							<Suspense fallback={<Loader />}>
								<ComboMakerScene trick={newCombo.map((nC) => nC.name)} />
							</Suspense>
						</Canvas>
					</div>
					<div className='text-center font-bold text-zinc-300'>
						Animation Support Coming Soon!
					</div>
					{/* newCombo State Array */}
					<NewComboDisplay newCombo={newCombo} />
					{/* Button Container */}
					{/* <ArrayDisplay
						bg
						startOpen
						isEmpty={isEmpty}
						name={"Tricks"}
						arr={filteredTricks}
						f={(e) => handleTrickAdd(e)}
					/> */}
					<AddComboItem
						isEmpty={isEmpty}
						filteredTricks={filteredTricks}
						filteredTransitions={filteredTransitions}
						filteredStances={filteredStances}
						handleStanceAdd={handleStanceAdd}
						handleTrickAdd={handleTrickAdd}
						// f={(e) => handleTrickAdd(e)}
					/>
					<div
						id='selectables-container'
						className='grid h-full grid-flow-row grid-cols-2 place-content-center gap-2 '>
						{/* Current Options Array for Selection */}
						{/* FilteredTricks */}
						<div
							id='left-column-tricks-n-stances'
							className='flex w-full flex-col gap-2 '>
							{/* <ArrayDisplay
								bg
								startOpen
								isEmpty={isEmpty}
								name={"Tricks"}
								arr={filteredTricks}
								f={(e) => handleTrickAdd(e)}></ArrayDisplay> */}
							{/* FilteredStances
							{/*	<div className=''>
								<ArrayDisplay
									bg
									isCollapsable
									isAnimated
									name='Stances'
									arr={filteredStances}
									f={(e) => handleStanceAdd(e)}></ArrayDisplay>
							</div>
							*/}
						</div>
						<div
							id='right-column-transitions-stanceCircle'
							className='flex flex-col place-content-center justify-around'>
							{/* FilteredTransitions */}
							{/* <ArrayDisplay
								bg
								isCollapsable
								name={
									<TransitionButtons
										f={() => console.log("openedTransitions")}
										currentLeg={currentLeg}
									/>
								}
								arr={filteredTransitions}
								f={(e) => handleTrickAdd(e)}></ArrayDisplay> */}
							{/* StanceCircleAnimation */}
							{/* <div className='h-40 w-40'>
								<StanceAnimationTest
									handleStanceAdd={handleStanceAdd}
									isSmall
									currentStance={currentStance}
								/>
							</div> */}
						</div>
						{/* Background Color */}
						{/* <div className='absolute top-14 left-2.5 z-[-1] h-[85vh] w-[95vw] rounded-3xl bg-gradient-to-br from-zinc-400 to-sky-500 opacity-50'></div> */}
					</div>
					{/* Reset Buttons */}
					<div
						id='reset-buttons-container'
						className='flex flex-grow flex-row place-content-center place-items-center'>
						<ResetButton
							resetTricklist={resetTricklist}
							deleteLast={deleteLast}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default ComboMaker;
