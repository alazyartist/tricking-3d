import React from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "./store/userStore";

const UserIcon = () => {
	const { profilePic } = useUserStore((s) => s.userInfo);
	return (
		<Link
			to={"/dash"}
			className='fixed top-2.5 right-5 z-[1002] h-[50px] w-[50px] rounded-full border-2 border-zinc-300 border-opacity-20'>
			<img
				src={`./images/${profilePic}`}
				className='h-full w-full rounded-full'
			/>
		</Link>
	);
};

export default UserIcon;
