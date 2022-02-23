import React from "react";
//Standard Button
export function Button(props) {
	return (
		<button
			className='can-hover flex justify-center self-stretch rounded-xl bg-[whitesmoke] p-2   '
			onClick={props.f}>
			{props.content}
		</button>
	);
}

export function TrimToggle(props) {
	return (
		<button
			id='trimToggle'
			className=' appearance-none items-center rounded-full '
			onClick={props.f}>
			{props.content}
		</button>
	);
}
