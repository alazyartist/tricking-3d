import React, { useEffect, useMemo } from "react";
import { useStore } from "../../../store/store";
import { stanceInfoText as stanceText } from "./stanceInfoText";
function StanceInfo(props) {
	const stanceColor = useStore((s) => s.stanceColor);
	const color = {
		BacksideComplete: "#7EE0FB",
		OutsideComplete: "#75fbb3",
		OutsideSemi: "#2db36c",
		FrontsideSemi: "#2b5ab3",
		FrontsideMega: "#4171ca",
		InsideMega: "#40baa6",
		InsideHyper: "#5ed8c5",
		BacksideHyper: "#6bcee9",
	};
	return (
		<div className='grid grid-cols-3 place-content-center place-items-center font-inter'>
			<div
				className={`col-span-3 flex h-10 w-60 place-content-center place-items-center gap-2 rounded-md bg-[${
					color[props.stance]
				}] text-center text-2xl`}>
				{props.stance}
			</div>
			<div className='flex flex-col gap-2 p-2'>
				<div className='text-light w-30 h-20 bg-sky-400 p-2'>
					{stanceText[props.stance].Text}
				</div>
				<div className='text-light w-30 h-20 bg-emerald-400 p-2 '>
					{stanceText[props.stance].Direction}
				</div>
				<div className='text-light w-30 h-20 bg-teal-400 p-2 '>
					Plant Foot: {stanceText[props.stance].Foot}
				</div>
			</div>
		</div>
	);
}

export default StanceInfo;
