import React from "react";
//Standard Button
export function MediaButton(props) {
	return (
		<button
      id={props.id}
			className='
      w-full
      h-full
        bg-zinc-400 
        can-hover 
        flex items-center justify-center
        h-[32px] 
        rounded-full
        w-[32px] 
        '
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
