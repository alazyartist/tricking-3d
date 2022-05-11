import React from "react";
import { Link, Outlet } from "react-router-dom";
function Transitions() {
	return (
		<>
			<div className='font-inter mt-4 flex flex-col place-content-center place-items-center font-bold text-zinc-300'>
				<div className='text-xl font-black text-white'>Transitions</div>
				<Link to='all'>All</Link>
				<Link to='singular'>Singular</Link>
				<Link to='sequential'>Sequential</Link>
				<Link to='unified'>Unified</Link>
				<Outlet />
			</div>
		</>
	);
}

export default Transitions;
