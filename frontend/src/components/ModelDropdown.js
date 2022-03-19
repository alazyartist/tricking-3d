import React from "react";
import Dropdown from "./Dropdown";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";
function ModelDropdown() {
	const activeModel = useStore((state) => state.activeModel);
	const modelArray = useStore((state) => state.modelArray);
	const setModel = useStore((state) => state.setModel);
	const selectAnim = useStore((s) => s.selectAnim);
	const navigate = useNavigate();
	return (
		<Dropdown
			buttonName={activeModel}
			buttonMap={modelArray}
			f={(e) => {
				selectAnim("Backflip");
				setModel(e);
				selectAnim("Backflip");
				navigate(`/3d/sandbox/${e}/Backflip`);
			}}
		/>
	);
}

export default ModelDropdown;
