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
			<div className={` max-h-[500px] w-full overflow-y-auto`}>
				<div
					className={`${
						props.isCollapsable &&
						isOpen &&
						"absolute top-[250px] left-0 p-4  blur-md"
					}bg-red-500 flex w-full flex-col place-content-center place-items-center`}>
					<div
						className={
							isOpen &&
							props.isCollapsable &&
							` h-[60vh] w-[100vw]  bg-red-400 opacity-70`
						}>
						Test
					</div>

					<div>{isEmpty && "Select Valid Stance"}</div>
					{isOpen &&
						props.arr.map((arrV, i) => (
							<div
								key={i}
								className={`${
									props.isCollapsable && "z-10"
								} w-[40vw] place-self-center rounded-lg bg-zinc-600 p-1`}
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
		</div>
	);
}

export default ArrayDisplay;
