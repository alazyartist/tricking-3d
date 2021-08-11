import React, { useEffect, useState } from "react";
import "./App.css";
import { useStore } from "./store";
export default function ModelSelector(props) {
	const modelSelector = useStore((state) => state.modelSelector);
	const modelValue = useStore((state) => state.modelValue);
	console.log("model selector state " + modelValue);
	//setModel logic
	// const [model, setModel] = useState(props.model);
	// const toggleM = () => {
	// 	setModel(!props.model);
	// };

	// //useEffect
	// useEffect(() => {
	// 	props.handleModel(model);
	// }, [props.handleModel, model, props]);
	//Model Selector Button
	return (
		<button className='Btn modelSelector' onClick={modelSelector}>
			ModelSelector
		</button>
	);
}
