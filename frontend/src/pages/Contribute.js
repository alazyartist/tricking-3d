import React from "react";
import { Outlet } from "react-router-dom";
import ContributeNavBar from "../components/contribute/ContributeNavBar";
import DonateText from "../components/contribute/DonateText";
function Contribute() {
	return (
		<>
			<div className='sticky top-0 h-14 bg-zinc-900'></div>
			<div className=' px-4 font-inter text-3xl font-bold text-zinc-300'>
				I can help with...
			</div>
			<ContributeNavBar />
			<div
				id='outlet-container'
				className='flex place-content-center place-items-center text-zinc-300'>
				<Outlet />
			</div>

			<DonateText />
		</>
	);
}

export default Contribute;