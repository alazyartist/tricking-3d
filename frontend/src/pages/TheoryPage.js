import React from "react";
import { Link, Outlet } from "react-router-dom";
import AdvancedStanceCircle from "../components/theory/AdvancedStanceCircle";
import TheoryNavBar from "../components/theory/TheoryNavBar";

function TheoryPage() {
	return (
		<>
			<div className='sticky top-0 h-14 bg-zinc-900'></div>
			<div className='mt-4 flex flex-col place-content-center place-items-center font-inter font-bold text-zinc-800'>
				<Link
					to='/3d/theory'
					className='px-4 text-center font-inter text-3xl font-bold text-zinc-300'>
					Theory
				</Link>
				<div className=' p-4'>
					<Outlet />
				</div>
			</div>
		</>
	);
}

export default TheoryPage;
