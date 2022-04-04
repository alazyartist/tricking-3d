import React from "react";
import { NavLink } from "react-router-dom";
function ContributeNavBar() {
	const inactive = "p-2 text-center font-inter font-bold text-zinc-200";
	const active = "p-2 text-center font-inter font-bold text-emerald-400";
	return (
		<div
			id='content-container'
			className='m-4 
                    flex place-content-center
                    gap-1 rounded-3xl bg-zinc-700
                    '
			// bg-gradient-to-b from-sky-600 to-sky-400
		>
			{/* Design */}
			<NavLink
				to='design'
				className={({ isActive }) => (isActive ? `${active}` : `${inactive}`)}>
				Design
				{/* <p className='rounded-md bg-zinc-300 p-4 text-left  text-base font-light text-zinc-800'>
							Design:
						</p> */}
			</NavLink>
			{/* CODE */}
			<NavLink
				to='code'
				className={({ isActive }) => (isActive ? `${active}` : `${inactive}`)}>
				Code
				{/* <p className='rounded-md bg-zinc-300 p-4 text-left  text-base font-light text-zinc-800'>
							Code:
						</p> */}
			</NavLink>
			{/* Marketing */}
			<NavLink
				to='marketing'
				className={({ isActive }) => (isActive ? `${active}` : `${inactive}`)}>
				Marketing
				{/* <p className='rounded-md bg-zinc-300 p-4 text-left text-base font-light text-zinc-800'>
							Marketing:
						</p> */}
			</NavLink>
			{/* Theory */}
			<NavLink
				to='theory'
				className={({ isActive }) => (isActive ? `${active}` : `${inactive}`)}>
				Theory
				{/* <p className='rounded-md bg-zinc-300 p-4 text-left text-base font-light text-zinc-800'>
							Theory:
						</p> */}
			</NavLink>
		</div>
	);
}

export default ContributeNavBar;
