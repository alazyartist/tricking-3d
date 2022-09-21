import React, { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import ChangePassword from "./components/ChangePassword";

const UserSettings = () => {
	const location = useLocation();
	useEffect(() => {
		console.log(location?.state?.from?.pathname);
	}, [location]);
	return (
		<div className='flex h-[100vh] w-full flex-col place-content-start place-items-center gap-2 bg-zinc-800 font-inter text-zinc-300'>
			<div className=' sticky top-0 flex w-full gap-2 bg-zinc-900 p-2 pb-4 pt-16 text-3xl font-bold'>
				<Link to={`${location?.state?.from?.pathname}`}>
					<IoIosArrowBack />
				</Link>
				<div>User Settings</div>
			</div>
			<ChangePassword />
		</div>
	);
};

export default UserSettings;
