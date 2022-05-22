import React, { useState } from "react";
import { Transition } from "../../../data/trickDataModel/TrickClasses";

function ArrayDisplay(props) {
	let isEmpty = props.isEmpty;
	const [isOpen, setOpen] = useState(true);
	return (
		<div className='flex w-[24vw] flex-col rounded-lg bg-zinc-700'>
			<div
				// onClick={() => setOpen(!isOpen)}
				className='place-self-center text-xl'>
				{props.name}
			</div>

			<div>{isEmpty && "Select Valid Stance"}</div>
			{isOpen &&
				props.arr.map((arrV) => (
					<div
						className='bg-zinc-700'
						onClick={() => {
							props.f(arrV);
							// setOpen(!isOpen);
						}}>
						<div className='text-lg'> {arrV.name}</div>
						{arrV instanceof Transition && (
							<div className='text-sm'>
								{arrV?.toLeg && `to: ${arrV.toLeg}`}{" "}
							</div>
						)}
					</div>
				))}
			{props.children}
		</div>
	);
}

export default ArrayDisplay;
