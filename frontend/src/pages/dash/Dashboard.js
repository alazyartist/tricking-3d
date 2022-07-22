import React, { useEffect, useState } from "react";
import useApiCreds from "../../hooks/useApiCreds";
import UserCard from "./components/UserCard";
import useLogout from "../../hooks/useLogout";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useUserStore } from "../../store/userStore";
import { Link } from "react-router-dom";
import { GiHorizonRoad } from "react-icons/gi";
import ProfileCode from "./components/ProfileCode";
import Captures from "./components/Captures";
import { NoToneMapping } from "three";
import Interact from "./components/Interact";
import { FaQrcode } from "react-icons/fa";

function Dashboard() {
	const user = useUserStore((s) => s.user);
	const { profilePic, uuid } = useUserStore((s) => s.userInfo);
	const accessToken = useUserStore((s) => s.accessToken);
	const setAccessToken = useUserStore((s) => s.setAccessToken);
	const logout = useLogout();
	const apiPrivate = useApiCreds();
	const [open, setOpen] = useState(false);

	// const updateUserInfo = () => {
	// 	apiPrivate
	// 		.update(
	// 			"/user",
	// 			{ accessToken },
	// 			{
	// 				headers: { "Content-Type": "application/json" },
	// 			}
	// 		)
	// 		.then((response) => console.log(response))
	// 		.catch((err) => console.log(err));
	// };

	return (
		<div className='mt-14 flex flex-col place-content-center place-items-center gap-2 text-zinc-400'>
			<div className='p-4'>
				Welcome <span className='font-semibold text-zinc-300'>{user}</span>
			</div>
			{!open && (
				<>
					<UserCard
						edit
						name={`Dylan James`}
						username={user}
						src={
							profilePic !== null
								? `./images/${uuid}/${profilePic}`
								: "./images/noimg.jpeg"
						}
					/>
					<div className='text-center'>
						You are a bit early.
						<br /> Not much to Show Here Yet
					</div>
				</>
			)}
			{/* QR Code Generator and Reader */}
			{open && <ProfileCode />}
			<FaQrcode
				onClick={() => setOpen(!open)}
				className='absolute top-20 left-5'
			/>
			{!open && <Captures />}
			<button className='fixed right-5 bottom-14' onClick={() => logout()}>
				Logout
			</button>
		</div>
	);
}

export default Dashboard;
