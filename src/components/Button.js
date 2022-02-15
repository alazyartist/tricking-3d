import React from "react";
//Standard Button
export function Button(props) {
	return (
		<button
			className='flex justify-center self-stretch rounded-xl bg-[whitesmoke] p-2 hover:scale-105 hover:bg-[gainsboro] '
			onClick={props.f}>
			{props.content}
		</button>
	);
}
