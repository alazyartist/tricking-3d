import React from "react";
//Standard Button
export function MediaButton(props) {
	return (
		<button
      id={props.id}
			className='
        bg-zinc-400 
        can-hover 
        flex 
        font-black 
        h-[32px] 
        item-center 
        justify-center 
        p-2 
        rounded-xl 
        self-stretch 
        text-gray-800 
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
