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
