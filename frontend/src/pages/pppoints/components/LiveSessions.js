import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetBattleRooms } from "../../../api/useBattleRoom";

const LiveSessions = ({ ably }) => {
	const liveSessionsChannel = ably?.channels.get("[?rewind=10m]LiveSessions");

	const [liveSessionsFeed, updateLiveSessionsFeed] = useState([]);
	const { data: battleRooms } = useGetBattleRooms();
	useEffect(() => {
		console.log(battleRooms);
	}, [battleRooms]);
	// useEffect(() => {
	// 	const subscribe = async () => {
	// 		await liveSessionsChannel.subscribe("newSession", (m) => {
	// 			console.log(m, liveSessionsFeed);
	// 			const newMessages = liveSessionsFeed.slice(-4);
	// 			newMessages.push(m.data);
	// 			updateLiveSessionsFeed(newMessages);
	// 		});
	// 	};
	// 	subscribe();

	// 	return () => liveSessionsChannel.unsubscribe();
	// });

	//Connect to liveSessions channel
	return (
		<div>
			<div>Live Sessions</div>
			<div className='flex flex-col rounded-md bg-zinc-900 p-1 font-normal text-zinc-300'>
				{liveSessionsFeed?.length < 1 &&
					(battleRooms?.length < 1 ||
						battleRooms?.every((r) => r.isOpen == false)) &&
					"No Sessions Available"}
				{battleRooms?.map((room) => {
					if (room.isOpen) {
						return (
							<Link to={`${room.sessionid}`}>
								{room?.team1?.map((user) => (
									<span key={user.uuid}>
										{user.username} {room?.team1.length > 1 && "&"}{" "}
									</span>
								))}{" "}
								VERSUS{" "}
								{room?.team2?.map((user) => (
									<span>
										{user.username}
										{room?.team2.length > 1 && "&"}{" "}
									</span>
								))}
							</Link>
						);
					}
				})}
				{/* {liveSessionsFeed?.map((m) => (
					<Link to={`${m.sessionID}`}>
						{m?.team1?.map((user) => (
							<span key={user.uuid}>
								{user.username} {m?.team1.length > 1 && "&"}{" "}
							</span>
						))}{" "}
						VERSUS{" "}
						{m?.team2?.map((user) => (
							<span>
								{user.username}
								{m?.team2.length > 1 && "&"}{" "}
							</span>
						))}
					</Link>
				))} */}
			</div>
		</div>
	);
};

export default LiveSessions;
