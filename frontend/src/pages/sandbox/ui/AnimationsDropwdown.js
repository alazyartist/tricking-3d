import React from "react";
import Dropdown from "../../../components/Dropdown";
import { useStore } from "../../../store/store";
// import { useNavigate } from "react-router-dom";
function AnimationsDropwdown() {
	const animationsArray = useStore((s) => s.animationsArray);
	const selectAnim = useStore((s) => s.selectAnim);
	const currentAnim = useStore((s) => s.currentAnim);
	const currentModel = useStore((s) => s.activeModel);
	const navigate = useNavigate();
	return (
		<>
			<Dropdown
				buttonName={currentAnim}
				buttonMap={animationsArray}
				f={(e) => {
					selectAnim(e);
					navigate(`/3d/sandbox/${currentModel}/${e}`);
				}}
			/>
		</>
	);
}

export default AnimationsDropwdown;
