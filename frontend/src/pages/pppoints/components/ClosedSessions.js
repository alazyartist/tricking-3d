import React from "react";
import { Link } from "react-router-dom";
import { useGetBattleRooms } from "../../../api/useBattleRoom";

const ClosedSessions = () => {
	const { data: battleRooms } = useGetBattleRooms();
	return (
		<div>
			<div>Live Sessions</div>
			<div className='flex max-h-[50vh] flex-col overflow-y-auto rounded-md bg-zinc-900 p-1 font-normal text-zinc-300'>
				{(battleRooms?.length < 1 ||
					battleRooms?.every((r) => r.isOpen == true)) &&
					"No Sessions Available"}
				{battleRooms?.map((room) => {
					if (!room.isOpen) {
						return (
							<Link to={`stats/${room.sessionid}`}>
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
			</div>
		</div>
	);
};

export default ClosedSessions;
