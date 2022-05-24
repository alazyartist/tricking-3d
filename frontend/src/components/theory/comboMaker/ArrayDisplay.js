import React, { useState } from "react";
import { Stance, Transition } from "../../../data/trickDataModel/TrickClasses";
import { ReactComponent as LeftFoot } from "../../../data/ComboMakerSVG/Left.svg";
import { ReactComponent as RightFoot } from "../../../data/ComboMakerSVG/Right.svg";
import { ReactComponent as BothFoot } from "../../../data/ComboMakerSVG/Both.svg";

export function ArrayDisplay(props) {
	let isEmpty = props.isEmpty;
	const [isOpen, setOpen] = useState(props.startOpen);

	return (
		<div
			className={`flex w-full flex-col rounded-lg ${
				props.bg && "bg-zinc-700"
			} p-2`}>
			<div
				onClick={() => props.isCollapsable && setOpen(!isOpen)}
				className='place-self-center text-xl'>
				{props.name}
			</div>
			<div className={`w-full overflow-y-auto`}>
				<div
					className={`${
						props.isCollapsable && isOpen
							? "absolute top-[20vh] left-0 z-[10] max-h-[70vh] overflow-y-auto p-4 "
							: ""
					} flex w-full flex-col place-items-center `}>
					<div>{isEmpty && "Select Valid Stance"}</div>
					{isOpen &&
						props.arr.map((arrV, i) => (
							<div
								key={i}
								className={`${
									props.isCollapsable ? "z-[50] text-zinc-800" : ""
								} flex w-fit place-items-center rounded-lg bg-zinc-300 p-1 `}
								onClick={() => {
									props.f(arrV);
									props.isCollapsable && setOpen(!isOpen);
								}}>
								<div className='text-sm text-zinc-800'> {arrV.name}</div>

								{arrV instanceof Transition && (
									<div className='flex p-1 text-sm'>
										{/* {arrV?.toLeg && `to: ${arrV.toLeg}`} */}
										{arrV?.toLeg && whichLeg(arrV.toLeg)}
									</div>
								)}
								{arrV instanceof Stance && (
									<div className='flex p-1 text-sm'>
										{/* {arrV?.toLeg && `to: ${arrV.toLeg}`} */}
										{arrV?.leg && whichLeg(arrV.leg)}
									</div>
								)}
							</div>
						))}
				</div>
			</div>
			<div
				onClick={() => setOpen(!isOpen)}
				className={`${
					props.isCollapsable &&
					isOpen &&
					"absolute bottom-0 left-0 z-[1] h-[100vh]  place-content-center place-items-center overflow-y-auto bg-zinc-700 p-4 opacity-80 blur-md "
				} flex w-full flex-col place-items-center  `}></div>
		</div>
	);
}
export function whichLeg(toLeg) {
	switch (toLeg) {
		case "Left": {
			return (
				<div className='h-10 w-10'>
					<LeftFoot />
				</div>
			);
		}
		case "Right": {
			return (
				<div className='h-10 w-10'>
					<RightFoot />
				</div>
			);
		}
		case "Both": {
			return (
				<div className='h-10 w-10'>
					<BothFoot />
				</div>
			);
		}
		default:
			console.log("it didnt work");
	}
	return;
}
export default ArrayDisplay;
