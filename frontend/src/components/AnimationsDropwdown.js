import React from "react";
import Dropdown from "./Dropdown";
import { useStore } from "../store/store";
function AnimationsDropwdown() {
	const animationsArray = useStore((s) => s.animationsArray);
	const selectAnim = useStore((s) => s.selectAnim);
	const currentAnim = useStore((s) => s.currentAnim);
	return (
		<>
			<Dropdown
				buttonName={currentAnim}
				buttonMap={animationsArray}
				f={(e) => selectAnim(e)}
			/>
		</>
	);
}

export default AnimationsDropwdown;
