import React from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as Sequences } from "../../data/TakeOffLandingSequences.svg";
function Transitions() {
	return (
		<>
			<div className='font-inter mt-4 flex flex-col place-content-center place-items-center font-bold text-zinc-300'>
				<div className='text-xl font-black text-white'>Transitions</div>
				<Link to='singular'>Singular</Link>
				<div>Sequential</div>
				<div>Unified</div>
				<Outlet />
				<Sequences className='w-[90vw] rounded-xl bg-zinc-200' />
			</div>
		</>
	);
}

export default Transitions;
