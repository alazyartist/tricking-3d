import React, { useState } from "react";
import { Transition } from "../../../data/trickDataModel/TrickClasses";

function ArrayDisplay(props) {
	let isEmpty = props.isEmpty;
	const [isOpen, setOpen] = useState(props.startOpen);

	return (
		<div className='flex w-full flex-col rounded-lg bg-zinc-700 p-2'>
			<div
				onClick={() => props.isCollapsable && setOpen(!isOpen)}
				className='place-self-center text-xl'>
				{props.name}
			</div>
			<div className={`  w-full overflow-y-auto`}>
				<div
					className={`${
						props.isCollapsable && isOpen
							? "absolute bottom-[10vh] left-0 z-[10] max-h-[60vh] place-content-center place-items-center overflow-y-auto p-4 "
							: ""
					} flex w-full flex-col place-items-center `}>
					<div>{isEmpty && "Select Valid Stance"}</div>
					{isOpen &&
						props.arr.map((arrV, i) => (
							<div
								key={i}
								className={`${
									props.isCollapsable ? "z-[20]" : ""
								} w-fit rounded-lg bg-zinc-600 p-1`}
								onClick={() => {
									props.f(arrV);
									props.isCollapsable && setOpen(!isOpen);
								}}>
								<div className='text-lg'> {arrV.name}</div>
								{arrV instanceof Transition && (
									<div className='text-sm'>
										{arrV?.toLeg && `to: ${arrV.toLeg}`}{" "}
									</div>
								)}
							</div>
						))}
				</div>
			</div>
			<div
				className={`${
					props.isCollapsable &&
					isOpen &&
					"absolute bottom-0 left-0 z-[1] h-[100vh]  place-content-center place-items-center overflow-y-auto bg-zinc-700 p-4 opacity-80 blur-md "
				} flex w-full flex-col place-items-center  `}></div>
		</div>
	);
}

export default ArrayDisplay;
