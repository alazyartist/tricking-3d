import React from "react";
import Dropdown from "./Dropdown";
import { useStore } from "../store/store";
function ModelDropdown() {
	const activeModel = useStore((state) => state.activeModel);
	const modelArray = useStore((state) => state.modelArray);
	const setModel = useStore((state) => state.setModel);
	const selectAnim = useStore((s) => s.selectAnim);
	return (
		<Dropdown
			buttonName={activeModel}
			buttonMap={modelArray}
			f={(e) => {
				selectAnim("Backflip");
				setModel(e);
				selectAnim("Backflip");
			}}
		/>
	);
}

export default ModelDropdown;
