import React from "react";
import { Link, Outlet } from "react-router-dom";
import AdvancedStanceCircle from "../components/theory/AdvancedStanceCircle";
import TheoryNavBar from "../components/theory/TheoryNavBar";
import { ReactComponent as Anatomy } from "../data/Anatomy.svg";
import AnatomySVG from "../data/AnatomySVG";
function TheoryPage() {
	return (
		<>
			{/* <div className='sticky top-0 h-14 bg-zinc-900'></div> */}
			<div className='mt-14 flex flex-col place-content-center place-items-center font-inter font-bold text-zinc-800'>
				{/* <Link
					to='/3d/theory'
					className='font-inter px-4 text-center text-3xl font-bold text-zinc-300'>
					Theory
				</Link>
				<div className='text-zinc-300'>Theory !=== Reality</div> */}
				<div className=' p-4'>
					<AnatomySVG className=' h-full w-[80vw] text-zinc-300' />
					<Outlet />
					{/* <Anatomy stroke='c34242' className='h-fit w-full text-zinc-300' /> */}
				</div>
			</div>
		</>
	);
}

export default TheoryPage;
