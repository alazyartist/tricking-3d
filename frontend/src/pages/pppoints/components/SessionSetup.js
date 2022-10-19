import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import Ably from "ably/promises";
import { useUserStore } from "../../../store/userStore";
import { apiPrivate } from "../../../api/api";
const cid = useUserStore.getState().userInfo.uuid;
const ably = new Ably.Realtime({
	authCallback: async ({ tokenDetails }, callback) => {
		try {
			const tokenDetails = await apiPrivate.get(`/ablyAuth?clientId=${cid}`);
			console.log(tokenDetails);
			tokenDetails && callback(null, tokenDetails?.data);
		} catch (error) {
			callback(error, null);
		}
	},
});
const SessionSetup = ({ setSetupVisible }) => {
	const [sessionTimer, setSessionTimer] = useState(60);
	//team1 = 1 or more users
	//team2 =[uuid,uuid2...]
	const liveSessionsChannel = ably.channels.get(`LiveSessions`);

	const createSession = () => {
		let sessionId = uuidv4();
		console.log(sessionId);
		const sessionChannel = ably.channels.get(`${sessionId}`);
		liveSessionsChannel.publish("newSession", {
			team1: "Tiki",
			team2: "Ethan",
			session: sessionId,
			duration: sessionTimer,
		});
		//make uuid
		//get feed channel for uuid
		//return channel
	};
	return (
		<>
			<MdClose
				onClick={() => setSetupVisible(false)}
				className='absolute top-2 right-2 text-2xl'
			/>
			<div className='text-2xl'>SetupSession </div>
			<div className='place-self-start p-2'>
				<div className='flex flex-col gap-2'>
					<div>Competitors</div>
					<div>Add Competitors</div>
					{/* <div className='flex gap-2'>
						<div className='h-10 w-10 rounded-full bg-red-500' />
						<div className='h-10 w-10 rounded-full bg-red-500' />
						<div className='h-10 w-10 rounded-full bg-red-500' />
					</div> */}
				</div>
				<div className='flex gap-2'>
					<div>Duration</div>
					{sessionTimer}s
					<select
						onChange={(e) => setSessionTimer(e.target.value)}
						className='w-fit bg-transparent'>
						<option className='bg-zinc-800 active:bg-zinc-500' value={60}>
							1 Minute
						</option>
						<option className='bg-zinc-800 active:bg-zinc-500' value={90}>
							1.5 Minutes
						</option>
						<option className='bg-zinc-800 active:bg-zinc-500' value={120}>
							2 Minutes
						</option>
						<option className='bg-zinc-800 active:bg-zinc-500' value={180}>
							3 Minutes
						</option>
						<option className='bg-zinc-800 active:bg-zinc-500' value={300}>
							5 Minutes
						</option>
						<option className='bg-zinc-800 active:bg-zinc-500' value={600}>
							10 Minutes
						</option>
					</select>
				</div>
			</div>
			<div
				onClick={() => createSession()}
				className='absolute bottom-5 w-full bg-emerald-500 p-2 text-center font-bold text-zinc-900'>
				Create
			</div>
		</>
	);
};

export default SessionSetup;
