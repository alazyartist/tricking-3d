import React, { useEffect, useState } from "react";
import {
	Stance,
	Transition,
	Trick,
} from "../../../data/trickDataModel/TrickClasses";
import { stances } from "../../../data/trickDataModel/TrickObjects";
import { useComboMakerStore } from "../../../store/comboMakerStore";

function useComboMaker(combo, setcombo, newCombo) {
	const [isDelete, setIsDelete] = useState(false);
	const [isTrick, setIsTrick] = useState(false);
	const currentStance = useComboMakerStore((s) => s.currentStance);
	const setCurrentStance = useComboMakerStore((s) => s.setCurrentStance);
	const currentDirection = useComboMakerStore((s) => s.currentDirection);
	const setCurrentDirection = useComboMakerStore((s) => s.setCurrentDirection);
	const currentLeg = useComboMakerStore((s) => s.currentLeg);
	const setCurrentLeg = useComboMakerStore((s) => s.setCurrentLeg);

	useEffect(() => {
		//Stance Type Behavior
		if (combo instanceof Stance) {
			let pivot = `Pivot to`;
			//AutoAdd Pivot on stance change.
			if (combo.direction !== currentDirection && newCombo.length && !isTrick) {
				newCombo.push(pivot);
			}
			//update current state
			setCurrentStance(combo.name);
			setCurrentDirection(combo.direction);
			setIsTrick(false);
		}
		//Trick Type behavior
		if (combo instanceof Trick) {
			setCurrentStance(combo.getStance());
			setIsTrick(true);
		}
		//Transition type behavior
		if (combo instanceof Transition) {
			setIsTrick(false);
		}

		// Updates newCombo to be displayed
		if (combo) {
			setcombo(combo);
			newCombo.push(combo);
			setcombo("");
		}

		//Auto-Remove Pivot-to from newCombo when removing tricks
		if (newCombo[newCombo.length - 1] == "Pivot to") {
			setIsDelete(!isDelete);
		}
	}, [
		combo,
		currentDirection,
		setcombo,
		newCombo,
		isTrick,
		currentStance,
		isDelete,
		setIsDelete,
	]);
	//Handle Delete from newCombo
	useEffect(() => {
		newCombo.pop();
		setcombo("");
	}, [isDelete, setIsDelete]);
	//Ignore this.

	useEffect(() => {
		if (
			stances[currentStance].direction == currentDirection &&
			stances[currentStance].leg !== currentLeg
		) {
			console.log(stances[currentStance]);
			console.log("Don'tMatch");
		}
	}, [currentStance, currentDirection, currentLeg]);
	return {
		currentDirection,
		currentLeg,
		currentStance,
		isDelete,
		isTrick,
		setCurrentLeg,
		setCurrentStance,
		setCurrentDirection,
		setIsDelete,
		setIsTrick,
	};
}

export default useComboMaker;
