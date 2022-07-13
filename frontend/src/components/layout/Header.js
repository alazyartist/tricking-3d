import React from "react";
import { Link } from "react-router-dom";
import { TrickedexLogo } from "../../data/icons/TrickedexLogo";
function Header() {
	return (
		<Link to='/home'>
			<div className='fixed top-1 z-[1000] flex h-[47px] w-fit place-content-start rounded-b-xl border-none bg-opacity-60 p-2 font-inter text-3xl font-bold text-zinc-300 '>
				<TrickedexLogo className={"flex h-[47px] w-full"} />
			</div>
		</Link>
	);
}

export default Header;
