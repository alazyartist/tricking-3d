import React, { useEffect, useState } from "react";
import "./App.css";

export default function ModelSelector(props) {
	//setModel logic
	const [model, setModel] = useState(props.model);
	const toggleM = () => {
		setModel(!props.model);
	};

	//useEffect
	useEffect(() => {
		props.handleModel(model);
	}, [props.handleModel, model, props]);
	//Model Selector Button
	return (
		<button
			className='Btn modelSelector'
			onClick={() => {
				toggleM();
			}}>
			ModelSelector
		</button>
	);
}
