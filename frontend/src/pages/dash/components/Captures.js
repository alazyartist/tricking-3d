import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApiCreds from "../../../hooks/useApiCreds";
import { useUserStore } from "../../../store/userStore";
import CapturedCard from "./CapturedCard";
import UserCard from "./UserCard";

const Captures = () => {
	const [captured, setCaptured] = useState();
	const [capturedYou, setCapturedYou] = useState();
	const [display, setDisplay] = useState("captures");
	const userInfo = useUserStore((s) => s.userInfo);
	const queryClient = useQueryClient();
	const nav = useNavigate();
	useEffect(() => {
		setCaptured(userInfo.Captured);
		setCapturedYou(userInfo.CapturedMe);
	}, [userInfo]);

	return (
		<div
			id='captureContainer'
			className='place-items-center flex flex-col font-inter'>
			<div className='flex gap-2 font-inter font-bold'>
				<div
					className={display === "captures" ? "text-zinc-300" : "text-zinc-400"}
					onClick={() => {
						setDisplay("captures");
						queryClient.invalidateQueries(["userInfo"]);
					}}>
					Your Captures
				</div>
				<div
					className={
						display === "captured me" ? "text-zinc-300" : "text-zinc-400"
					}
					onClick={() => {
						setDisplay("captured me");
						queryClient.invalidateQueries(["userInfo"]);
					}}>
					Captured You
				</div>
			</div>
			<div className='place-content-center flex w-[80vw] flex-row place-items-start overflow-x-auto'>
				{!!captured &&
					display === "captures" &&
					Object.keys(captured).map((key) => (
						<div
							onClick={() => nav(`/userProfile/${captured[key].uuid}`)}
							key={`${captured[key].username}`}
							className='flex flex-row gap-3'>
							<CapturedCard
								name={captured[key].first_name + " " + captured[key].last_name}
								src={
									captured[key].profilePic
										? `./images/${captured[key].uuid}/${captured[key].profilePic}`
										: `./images/noimg.jpeg`
								}
								username={`${captured[key].username}`}
							/>
						</div>
					))}
			</div>

			<div className='place-content-center flex w-[80vw] flex-row place-items-start overflow-x-auto'>
				{!!capturedYou &&
					display === "captured me" &&
					Object.keys(capturedYou).map((key) => (
						<div
							onClick={() => nav(`/userProfile/${capturedYou[key].uuid}`)}
							key={`${capturedYou[key].username}`}
							className='flex  flex-row gap-3'>
							<CapturedCard
								name={
									capturedYou[key].first_name + " " + capturedYou[key].last_name
								}
								src={
									capturedYou[key].profilePic
										? `./images/${capturedYou[key].uuid}/${capturedYou[key].profilePic}`
										: `./images/noimg.jpeg`
								}
								username={`${capturedYou[key].username}`}
							/>
						</div>
					))}
			</div>
		</div>
	);
};

export default Captures;
