import React, { useState, useEffect } from "react";

const LiveSessions = ({ ably }) => {
	const liveSessionsChannel = ably?.channels.get(`LiveSessions`);
	const [liveSessionsFeed, updateLiveSessionsFeed] = useState([]);

	useEffect(() => {
		const subscribe = async () => {
			await liveSessionsChannel.subscribe("newSession", (m) => {
				console.log(m, liveSessionsFeed);
				const newMessages = liveSessionsFeed.slice(-4);
				newMessages.push(m.data);
				updateLiveSessionsFeed(newMessages);
			});
		};
		subscribe();

		return () => liveSessionsChannel.unsubscribe();
	});
	//Connect to liveSessions channel
	return (
		<div>
			<div>Live Sessions</div>
			<div className='rounded-md bg-zinc-900 p-1 font-normal text-zinc-300'>
				{liveSessionsFeed.length < 1 && "No Sessions Available"}
				{liveSessionsFeed?.map((m) => (
					<div onClick={() => console.log(m)}>
						{m?.team1?.map((user) => (
							<span>
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
					</div>
				))}
			</div>
		</div>
	);
};

export default LiveSessions;
