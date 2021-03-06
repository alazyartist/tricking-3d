import React from "react";
import { Link, Outlet } from "react-router-dom";
import AnatomySVG from "../../data/AnatomySVG";
import AnatomyNav from "./components/AnatomyNavSVG";
import AnatomySketch from "./components/AnatomySketchSVG";
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
				<div className='flex flex-col place-items-center gap-4 p-4'>
					{/* <AnatomySVG className=' h-full w-[80vw] text-zinc-300' /> */}
					<AnatomySketch className='h-full w-[80vw] text-zinc-300' />
					<AnatomyNav className=' h-full w-[80vw] text-zinc-300' />
					<Outlet />
				</div>
			</div>
		</>
	);
}

export default TheoryPage;
