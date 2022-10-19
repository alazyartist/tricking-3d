import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAblyStore from "../../hooks/useAblyStore";
import { useUserStore } from "../../store/userStore";
const ably = useAblyStore.getState().ably;
const SessionPage = () => {
	const userUUID = useUserStore((s) => s.userInfo.uuid);
	const username = useUserStore((s) => s.userInfo.username);
	const { sessionID } = useParams();
	const sessionChannel = ably.channels.get(`points:${sessionID}`);

	useEffect(() => {
		const subscribe = async () => {
			await sessionChannel.subscribe("points", (m) => {
				console.log(m, "sessionMessage points");
			});
		};
		subscribe();
		return () => sessionChannel.unsubscribe();
	});
	const handleUserClick = (team) => {
		sessionChannel.publish("points", { user: userUUID, team: team, points: 1 });
	};
	const handleAnonClick = () => {};
	// const { ably, session } = location?.state;
	return (
		<div className='flex h-screen w-screen flex-col place-items-center p-2 pt-14 text-zinc-300'>
			<div className=' font-inter text-3xl font-black '>SessionPage</div>
			<div className='neumorphicIn w-[70vw] rounded-xl p-4  font-bold text-zinc-300'>
				{sessionID}
			</div>
			{userUUID ? `${username}` : "You are Anonymous"}
			<div className='flex w-full justify-around gap-2'>
				<div onClick={() => handleUserClick("Team1")}>Team1</div>
				<div onClick={() => handleUserClick("Team2")}>Team2</div>
			</div>
		</div>
	);
};

export default SessionPage;
