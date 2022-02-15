import React from "react";
//Standard Button
export function Button(props) {
	return (
		<button
			className='align-center flex justify-center self-center rounded-xl bg-[whitesmoke] p-2 text-sm hover:scale-105 hover:bg-[gainsboro] '
			onClick={props.f}>
			{props.content}
		</button>
	);
}
