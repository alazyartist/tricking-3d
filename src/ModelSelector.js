import React from "react";
import "./App.css";
import { useStore } from "./store";
export default function ModelSelector(props) {
	const modelSelector = useStore((state) => state.modelSelector);
	const modelValue = useStore((state) => state.modelValue);
	// console.log("model selector state " + modelValue);

	//Model Selector Button
	return (
		<button className='Btn modelSelector' onClick={modelSelector}>
			ModelSelector
		</button>
	);
}
