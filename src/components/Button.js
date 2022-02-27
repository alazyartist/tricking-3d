import React from "react";
//Standard Button
export function Button(props) {
	return (
		<button
			className='can-hover item-center flex justify-center self-stretch rounded-xl bg-zinc-400 p-2 font-black text-gray-800  '
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
