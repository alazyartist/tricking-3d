import React, { useState, useEffect } from "react";

const LiveSessions = ({ ably }) => {
	const liveSessionsChannel = ably?.channels.get(`LiveSessions`);
	const [liveSessionsFeed, updateLiveSessionsFeed] = useState([]);

	useEffect(() => {
		const subscribe = async () => {
			await liveSessionsChannel.subscribe("newSession", (m) => {
				console.log(m, liveSessionsFeed);
				const newMessages = liveSessionsFeed.slice(-4);
				newMessages.push(m);
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
				{liveSessionsFeed?.map((m) => (
					<div>
						{m?.data?.team1} VERSUS {m?.data?.team2}
					</div>
				))}
			</div>
		</div>
	);
};

export default LiveSessions;
