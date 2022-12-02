import React from "react";
//Standard Button

export function TrimToggle({ f, content }) {
	return (
		<button
			id='trim-toggle'
			className=' appearance-none items-center rounded-full '
			onClick={f}>
			{content}
		</button>
	);
}
