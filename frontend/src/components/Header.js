import React from "react";
import { Link } from "react-router-dom";
function Header() {
	return (
		<>
			{/* // 		<div
// 			className='flex w-full flex-col content-start
// justify-start bg-gray-800 py-3 px-5'>
// 			<div>
// 				<p className='font-inter text-2xl font-extrabold text-zinc-300'>
// 					Tricking 3D
// 				</p>
// 			</div>
// 			<div />
// 		</div> */}

			<Link to='/3d/home'>
				<h1 className='absolute top-1 z-[1000] h-[47px] w-full rounded-b-xl border-none bg-opacity-60  p-2 font-inter text-3xl font-bold text-zinc-300 '>
					Tricking-3d
				</h1>
			</Link>
		</>
	);
}

export default Header;
