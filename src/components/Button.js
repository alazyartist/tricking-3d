import React from "react";
//Standard Button
export function MediaButton(props) {
	return (
		<button
      id={props.id}
			className='can-hover item-center flex justify-center self-stretch rounded-xl bg-zinc-400 p-2 font-black text-gray-800  '
			onClick={props.f}>
			{props.content}
		</button>
	);
}

export function TrimToggle(props) {
	return (
		<button
			id='trim-toggle'
			className=' appearance-none items-center rounded-full '
			onClick={props.f}>
			{props.content}
		</button>
	);
}
