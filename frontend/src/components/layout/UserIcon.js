import React from "react";
import { Link, useLocation } from "react-router-dom";
import { TrickedexLogo } from "../../data/icons/TrickedexLogo";
import { useUserStore } from "../../store/userStore";

const UserIcon = () => {
	const { profilePic, uuid, username } = useUserStore((s) => s.userInfo);
	const location = useLocation();
	return (
		<Link
			to={location.pathname.includes("/home") ? "/dash" : "/home"}
			className='fixed top-2.5 right-5 z-[1002] h-[50px] w-[50px] rounded-full border-2 border-zinc-300 border-opacity-20'>
			{username !== null ? (
				<img
					src={
						profilePic ? `/images/${uuid}/${profilePic}` : `./images/noimg.jpeg`
					}
					className='h-full w-full rounded-full'
				/>
			) : (
				<div className='flex h-full w-full place-self-center'>
					<TrickedexLogo />
				</div>
			)}
		</Link>
	);
};

export default UserIcon;
