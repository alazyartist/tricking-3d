import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TrickedexLogo } from "../../data/icons/TrickedexLogo";
function Header() {
	const [open, setOpen] = useState(true);
	const location = useLocation();
	useEffect(() => {
		if (location.pathname.includes("sandbox")) {
			setOpen(false);
		} else {
			setOpen(true);
		}
	}, [location]);

	return (
		open && (
			// <Link to='/home'>
			<div className='fixed top-1 z-[1000] flex h-[47px] w-fit place-content-start rounded-b-xl border-none bg-opacity-60 p-2 font-inter text-3xl font-bold text-zinc-300 '>
				<TrickedexLogo className={"flex h-[47px] w-full"} />
			</div>
			// </Link>
		)
	);
}

export default Header;
