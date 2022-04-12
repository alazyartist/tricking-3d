import React from "react";
import StanceCircleBIFO from "../theory/StanceCircleBIFO";
import StanceCircleCHMS from "../theory/StanceCircleCHMS";
import { ReactComponent as StanceCircle } from "../../data/AdvancedStancesSVG.svg";
import { ReactComponent as StanceCircleSelector } from "../../data/AdvancedStancesSelector.svg";
import { Outlet, useNavigate } from "react-router-dom";
import { useStore } from "../../store/store";
function AdvancedStanceCircle() {
	const nav = useNavigate();
	const setStanceColor = useStore((s) => s.setStanceColor);
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

	return (
		<div className='h-[90vw] w-[90vw] '>
			<StanceCircleSelector
				className='absolute h-[90vw] w-[90vw] opacity-0'
				onClick={(e) => {
					e.target.id !== "Layer_1" && nav(e.target.id);
					console.log(color[e.target.id]);
					console.log(e.target.id);
					setStanceColor(color[e.target.id]);
				}}
			/>
			<StanceCircle />
			<Outlet />
		</div>
	);
}

export default AdvancedStanceCircle;
