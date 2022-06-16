import React from "react";
import api, { apiPrivate } from "../api/api";
import UserCard from "../components/UserCard";
import useLogout from "../hooks/useLogout";
import useRefreshToken from "../hooks/useRefreshToken";
import { useUserStore } from "../store/userStore";

function Dashboard() {
	const user = useUserStore((s) => s.user);
	const logout = useLogout();
	const refresh = () => {
		api
			.post(
				"/refresh",
				{},
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			)
			.then((response) => console.log(response))
			.catch((err) => console.log(err));
	};
	return (
		<div className='mt-14 flex flex-col place-content-center place-items-center gap-2 text-zinc-300'>
			Dashboard
			<div>Welcome {user}</div>
			<UserCard name={`Dylan James`} username={user} src='./mesquared.jpg' />
			<button className='absolute right-5 bottom-14' onClick={() => logout()}>
				Logout
			</button>
			<button onClick={() => refresh()}>RefreshToken</button>
		</div>
	);
}

export default Dashboard;
