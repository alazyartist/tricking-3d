import React from "react";
import Dropdown from "./Dropdown";
import { useStore } from "../store/store";
function ModelDropdown() {
	const activeModel = useStore((state) => state.activeModel);
	const modelArray = useStore((state) => state.modelArray);
	const setModel = useStore((state) => state.setModel);
	return (
		<Dropdown
			buttonName={activeModel}
			buttonMap={modelArray}
			f={(e) => {
				setModel(e);
			}}
		/>
	);
}

export default ModelDropdown;
