import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetBattleRooms } from "../../../api/useBattleRoom";
import { IoCheckmark, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FaCheck, FaGavel } from "react-icons/fa";
import { useUserStore } from "../../../store/userStore";

const ClosedSessions = () => {
	const { data: battleRooms } = useGetBattleRooms();
	const userUUID = useUserStore((s) => s.userInfo.uuid);

	const [dateFilter, setDateFilter] = useState(
		new Date(Date.now()).toDateString()
	);
	function getNewDate(date, days) {
		let d = new Date(date);
		d.setDate(d.getDate() + days);
		setDateFilter(d.toDateString());
	}
	console.log();
	return (
		<div>
			<div>Battle Results</div>

			<span className='my-2 flex w-full place-content-center place-items-center gap-2'>
				<IoChevronBack
					className='rounded-md bg-zinc-900 p-1 text-xl'
					onClick={() => getNewDate(dateFilter, -1)}
				/>
				{dateFilter}
				<IoChevronForward
					className='rounded-md bg-zinc-900 p-1 text-xl'
					onClick={() => getNewDate(dateFilter, 1)}
				/>
			</span>
			<div className='flex max-h-[50vh] flex-col gap-2 overflow-y-auto rounded-md font-normal text-zinc-300'>
				{(battleRooms?.length < 1 ||
					battleRooms?.every((r) => r.isOpen == true)) &&
					"No Sessions Available"}
				{battleRooms?.map((room) => {
					let date = new Date(room.updatedAt).toDateString();
					if (!room.isOpen && dateFilter === date) {
						return (
							<Link
								className='flex w-full place-items-center justify-around gap-2 rounded-md bg-zinc-900 p-2'
								to={`stats/${room.sessionid}`}>
								<span>
									{room?.team1?.map((user, index) => (
										<span key={user.uuid}>
											{user.username}{" "}
											{room?.team1.length > 1 &&
												room?.team1.length - 1 !== index &&
												"&"}{" "}
										</span>
									))}
									<span className='text-xs text-zinc-400'> vs </span>
									{room?.team2?.map((user, index) => (
										<span>
											{user.username}
											{room?.team2.length > 1 &&
												room?.team2.length - 1 !== index &&
												"&"}{" "}
										</span>
									))}
								</span>
								<span className='flex gap-2 text-xs text-zinc-500'>
									{room.judges.some((j) => j.uuid === userUUID) && (
										<FaGavel className='text-emerald-500' />
									)}
								</span>
								<span className='flex gap-2 text-xs text-zinc-500'>
									{room.host === userUUID && (
										<FaCheck className='text-emerald-500' />
									)}
								</span>
							</Link>
						);
					}
				})}
			</div>
		</div>
	);
};

export default ClosedSessions;
