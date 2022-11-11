import React from "react";
import { useUserStore } from "../store/userStore";
import AdminDisplay from "./components/AdminDisplay";

const AdminIndex = () => {
	const userInfo = useUserStore((s) => s.userInfo);

	return (
		<>
			{userInfo?.uuid === "admin696-8c94-4ca7-b163-9alazyartist" ||
			userInfo?.uuid === "admin696-8c94-4ca7-b163-969420Tohzt" ||
			userInfo?.uuid === "baf6a9c6-432f-4a08-8260-717249d5b71c" ? (
				<div className='no-scrollbar flex h-[100vh] w-[100vw] flex-col place-content-start place-items-center gap-4 overflow-auto font-inter font-bold text-zinc-300'>
					<div className='text-center text-3xl'>
						Welcome {userInfo?.username}. Good Luck Today
					</div>
					<AdminDisplay />
				</div>
			) : (
				<div className='col flex h-[100vh] w-[100vw] place-content-center place-items-center bg-red-500 font-inter text-5xl font-bold text-zinc-900'>
					Uhh. You aren't an admin buddy. What are you trying to do?
				</div>
			)}
		</>
	);
};

export default AdminIndex;
