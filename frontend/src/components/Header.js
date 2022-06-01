import React from "react";
import { Link } from "react-router-dom";
function Header() {
	return (
		<Link to='/3d/home'>
			<h1 className='font-inter fixed top-1 z-[1000] h-[47px] w-full rounded-b-xl border-none bg-opacity-60 p-2 text-3xl font-bold text-zinc-300 '>
				Tricking-3d
			</h1>
		</Link>
	);
}

export default Header;
