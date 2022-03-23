import React from "react";
//Standard Button
export function MediaButton({ id, isPlayPause, f, content }) {
	return (
		<button
			id={id}
			className={`
      h-full
      w-full
        ${isPlayPause ? "bg-zinc-300 hover:bg-white" : "bg-transparent"}
        can-hover 
        flex h-[37px] w-[37px]
        items-center 
        justify-center
        rounded-full
        font-bold 
        text-slate-200
        hover:text-white
        `}
			onClick={f}>
			{content}
		</button>
	);
}

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
