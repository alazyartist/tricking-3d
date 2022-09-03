import React from "react";
//Standard Button
export function MediaButton({ id, isPlayPause, hide, f, content }) {
	return (
		<button
			id={id}
			className={`
      h-full
      w-full
        ${hide ? "opacity-40" : "bg-white"}
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
