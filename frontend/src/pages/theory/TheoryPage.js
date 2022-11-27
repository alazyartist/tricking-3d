import React, { useEffect } from "react";
import { FaGraduationCap } from "react-icons/fa";
// import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import AnatomySVG from "../../data/AnatomySVG";
import AnatomyNav from "./components/AnatomyNavSVG";
import AnatomySketch from "./components/AnatomySketchSVG";
function TheoryPage() {
	const location = useLocation();
	const nav = useNavigate();
	useEffect(() => {
		console.log(location.pathname);
	}, [location]);
	return (
		<>
			{/* <div className='sticky top-0 h-14 bg-zinc-900'></div> */}
			<div className='no-scrollbar my-14 flex h-full flex-col place-content-center place-items-center overflow-y-scroll font-inter font-bold text-zinc-800'>
				{/* <Link
					to='/3d/theory'
					className='font-inter px-4 text-center text-3xl font-bold text-zinc-300'>
					Theory
				</Link>
				<div className='text-zinc-300'>Theory !=== Reality</div> */}
				<div
					onClick={() => nav("/theory")}
					className='absolute top-20 left-5 text-3xl text-zinc-300 '>
					<FaGraduationCap />
				</div>
				<div className='flex flex-col place-items-center gap-4 p-4'>
					{/* <AnatomySVG className=' h-full w-[80vw] text-zinc-300' /> */}
					{location.pathname === "/theory" && (
						<AnatomySketch className='h-full w-[80vw] max-w-[540px] text-zinc-300' />
					)}
					<AnatomyNav className=' h-full w-[80vw] max-w-[540px] text-zinc-300' />
					<Outlet />
				</div>
			</div>
		</>
	);
}

export default TheoryPage;
