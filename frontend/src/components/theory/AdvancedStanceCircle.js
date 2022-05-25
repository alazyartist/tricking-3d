import React, { useEffect, useState } from "react";
import StanceCircleBIFO from "../theory/StanceCircleBIFO";
import StanceCircleCHMS from "../theory/StanceCircleCHMS";
import { ReactComponent as StanceCircle } from "../../data/AdvancedStancesSVG.svg";
import { ReactComponent as StanceCircleSelector } from "../../data/AdvancedStancesSelector.svg";
import { Outlet, useNavigate } from "react-router-dom";
import { useStore } from "../../store/store";
import { animated, config, useSpring } from "react-spring";
import { useComboMakerStore } from "../../store/comboMakerStore";
import { stances } from "../../data/trickDataModel/TrickObjects";
import StanceList from "./StanceList";
import StanceInfo from "./stances/StanceInfo";
function AdvancedStanceCircle() {
	const nav = useNavigate();
	const setStanceColor = useStore((s) => s.setStanceColor);
	const setCurrentStance = useComboMakerStore((s) => s.setCurrentStance);
	const currentStance = useComboMakerStore((s) => s.currentStance);
	const setCurrentLeg = useComboMakerStore((s) => s.setCurrentLeg);
	const setCurrentDirection = useComboMakerStore((s) => s.setCurrentDirection);
	const [lastRotation, setLastRotation] = useState(0);
	const [newRot, setNewRot] = useState(0);

	const color = {
		BacksideComplete: "#7EE0FB",
		OutsideComplete: "#75fbb3",
		OutsideSemi: "#2db36c",
		FrontsideSemi: "#2b5ab3",
		FrontsideMega: "#4171ca",
		InsideMega: "#40baa6",
		InsideHyper: "#5ed8c5",
		BacksideHyper: "#6bcee9",
	};
	const rotateSpring = useSpring({
		from: { opacity: 0, rotate: lastRotation },
		to: { opacity: 1, rotate: newRot - 90 },
		config: {
			duration: 750,
			config: config.wobbly,
		},
	});
	console.log(newRot);
	useEffect(() => {
		console.log("UE", newRot);
		setLastRotation(newRot);
		setNewRot(stances[currentStance]?.getRotation());
		console.log(newRot);
	}, [currentStance]);

	return (
		<div className='flex flex-col place-items-center'>
			<div className=' fixed left-0 top-0 z-[10] h-14 w-full bg-opacity-20 bg-gradient-to-b from-zinc-900 to-transparent' />
			<animated.div style={rotateSpring} className={`w-[80vw]`}>
				<div className='sticky top-0'>
					<StanceCircleSelector
						className='absolute w-[80vw] opacity-0'
						onClick={(e) => {
							// e.target.id !== "Layer_1" && nav(e.target.id);

							e.target.id !== "Layer_1" &&
								setCurrentLeg(stances[e.target.id].leg);

							e.target.id !== "Layer_1" &&
								setCurrentDirection(stances[e.target.id].direction);

							e.target.id !== "Layer_1" && setCurrentStance(e.target.id);
							e.target.id !== "Layer_1" && setStanceColor(color[e.target.id]);
						}}
					/>
					<StanceCircle className={""} />
				</div>
			</animated.div>
			{/* <Outlet /> */}
			<StanceInfo stance={currentStance} />
			<StanceList
				currentStance={currentStance}
				setCurrentStance={setCurrentStance}
			/>
		</div>
	);
}

export default AdvancedStanceCircle;
