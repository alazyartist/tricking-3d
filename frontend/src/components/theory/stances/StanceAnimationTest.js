import React, { useEffect, useState } from "react";
import { ReactComponent as StanceCircle } from "../../../data/AdvancedStancesSVG.svg";
import { useSpring, animated, config } from "react-spring";
import { stances } from "../../../data/trickDataModel/TrickObjects";
import { ReactComponent as StanceCircleSelector } from "../../../data/AdvancedStancesSelector.svg";
import { useComboMakerStore } from "../../../store/comboMakerStore";

function StanceAnimationTest({ currentStance }) {
	const setCurrentStance = useComboMakerStore((s) => s.setCurrentStance);
	const setCurrentLeg = useComboMakerStore((s) => s.setCurrentLeg);
	const currentLeg = useComboMakerStore((s) => s.currentLeg);
	const [lastRotation, setLastRotation] = useState();
	let newRot = stances[currentStance]?.getRotation();
	useEffect(() => {
		setLastRotation(newRot);
		if (newRot == 0 && (lastRotation == 270 || lastRotation == 180)) {
			setLastRotation(360);
		}

		console.log(newRot);
	}, [newRot]);
	const spring = useSpring({
		from: { opacity: 0.5, rotate: 0 },
		to: { opacity: 1, rotate: lastRotation },
		config: {
			reset: true,
			duration: 1000,
			config: config.stiff,
		},
	});
	return (
		<div className={`h-[70vw] w-[70vw] `}>
			<animated.div style={spring}>
				<StanceCircleSelector
					className='absolute z-50 h-[70vw] w-[70vw] rotate-[-90deg] p-4 opacity-0'
					onClick={(e) => {
						e?.target?.id !== "Layer_1" && setCurrentStance(e.target.id);

						console.log(e.target.id, stances);
					}}
				/>
				<StanceCircle className={`rotate-[-90deg]`} />
			</animated.div>
		</div>
	);
}

export default StanceAnimationTest;
