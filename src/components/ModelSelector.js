import React from "react";
import { useStore } from "../store/store";
export default function ModelSelector(props) {
	const modelSelector = useStore((state) => state.modelSelector);

	//Model Selector Button
	return (
		<button
			className='p-3 m-2.5 rounded-xl bg-[whitesmoke] relative hover:bg-[gainsboro] hover:scale-105'
			onClick={modelSelector}>
			ModelSelector
		</button>
	);
}
