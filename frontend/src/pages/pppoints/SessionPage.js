import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import useAblyStore from "../../hooks/useAblyStore";
import { useUserStore } from "../../store/userStore";
const ably = useAblyStore.getState().ably;
const SessionPage = () => {
	const [host, setHost] = useState();
	const [judges, setJudges] = useState([]);
	const [team1, setTeam1] = useState([]);
	const [team2, setTeam2] = useState([]);
	const [timer, setTimer] = useState(0);
	const [pollsOpen, setPollsOpen] = useState(false);
	const [hostTimer, setHostTimer] = useState(0);
	const [duration, setDuration] = useState(0);
	const userUUID = useUserStore((s) => s.userInfo.uuid);
	const { sessionID } = useParams();
	const sessionChannel = ably.channels.get(`[?rewind=10m]points:${sessionID}`);
	const [team1points, setTeam1points] = useState(0);
	const [team2points, setTeam2points] = useState(0);
	const [publicTeam1Points, setPublicTeam1points] = useState(0);
	const [publicTeam2Points, setPublicTeam2points] = useState(0);
	let isHost = host?.uuid === userUUID;
	let isJudge = judges.some((j) => j.uuid === userUUID);
	useEffect(() => {
		const subscribe = async () => {
			await sessionChannel.subscribe("newSession", (ns) => {
				console.log(ns, "newSession");
				setJudges([...ns.data.judges]);
				setTeam1([...ns.data.team1]);
				setTeam2([...ns.data.team2]);
				setHostTimer(ns.data.duration);
				setTimer(ns.data.duration);
				setDuration(ns.data.duration);
				setHost(ns.data.hostID);
			});
			await sessionChannel.subscribe("timer", (t) => {
				console.log(t);
				setPollsOpen(t.data.pollsOpen);
				setTimer(t.data.timer);
			});
			await sessionChannel.subscribe("points", (m) => {
				if (m?.data?.judge) {
					if (m?.data?.team === "Team1") {
						setTeam1points((prevPoints) => prevPoints + 1);
					}
					if (m?.data?.team === "Team2") {
						setTeam2points((prevPoints) => prevPoints + 1);
					}
				} else {
					if (m?.data?.team === "Team1") {
						setPublicTeam1points((prevPoints) => prevPoints + 1);
					}
					if (m?.data?.team === "Team2") {
						setPublicTeam2points((prevPoints) => prevPoints + 1);
					}
				}
			});
		};
		subscribe();
		return () => sessionChannel.unsubscribe();
	});
	const handleUserClick = (team) => {
		if (pollsOpen === true) {
			sessionChannel.publish("points", {
				user: userUUID,
				team: team,
				points: 1,
			});
		}
	};
	const handleJudgeClick = (team) => {
		if (pollsOpen === true) {
			sessionChannel.publish("points", {
				judge: userUUID,
				team: team,
				points: 1,
			});
		}
	};
	useEffect(() => {
		if (hostTimer && duration && hostTimer > 0 && hostTimer !== duration) {
			sessionChannel.publish("timer", { timer: hostTimer, pollsOpen: true });
		}
		if (hostTimer === 0 || hostTimer === duration) {
			sessionChannel.publish("timer", { timer: hostTimer, pollsOpen: false });
		}
	}, [hostTimer, duration]);
	const handleTimer = () => {
		setHostTimer((prevTime) => {
			if (prevTime > 0) {
				return prevTime - 1;
			}
		});

		setTimeout(() => {
			if (hostTimer > 0) {
				handleTimer();
			}
		}, 1000);
	};
	// const { ably, session } = location?.state;
	return (
		<div className='flex h-screen w-screen flex-col place-items-center p-2 pt-14 text-zinc-300'>
			<Link className='absolute top-20 left-4 text-3xl' to={-1}>
				<IoIosArrowBack />
			</Link>
			<div className=' font-inter text-3xl font-black '>Pppoints</div>
			<div className='neumorphicIn flex w-[70vw] flex-col rounded-xl p-4 text-center  font-bold text-zinc-300'>
				<div>
					{team1.map((m) => m.username)} vs.
					{team2.map((m) => m.username)}
				</div>
				<div>{timer}</div>
				{isHost && !!timer && (
					<button
						className='rounded-xl bg-emerald-500 p-2'
						onClick={() => handleTimer()}>
						Start Timer
					</button>
				)}
			</div>

			<div>
				{userUUID ? `${isJudge ? "Judge" : "Audience"}` : "You are Anonymous"}
			</div>
			{/* <div>
				{judges.map((p) => (
					<PlayerMap player={p} />
				))}
			</div> */}

			<div className='flex flex-col gap-2'>
				<div className='flex gap-2'>
					<div>{publicTeam1Points}</div>
					<div>{publicTeam2Points}</div>
				</div>
				<div className='flex gap-2'>
					<div>{team1points}</div>
					<div>{team2points}</div>
				</div>
			</div>
			<div className='flex w-full justify-around gap-2'>
				<div
					className='w-1/2 rounded-xl bg-zinc-900 p-2 text-center'
					onClick={() =>
						isJudge ? handleJudgeClick("Team1") : handleUserClick("Team1")
					}>
					<div>
						{team1.map((p) => (
							<PlayerMap player={p} />
						))}
					</div>
				</div>
				<div
					className='w-1/2 rounded-xl bg-zinc-900 p-2 text-center'
					onClick={() =>
						isJudge ? handleJudgeClick("Team2") : handleUserClick("Team2")
					}>
					<div>
						{team2.map((p) => (
							<PlayerMap player={p} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SessionPage;

function PlayerMap({ player }) {
	return (
		<div className='flex flex-col place-items-center text-zinc-300'>
			<div>{player.username}</div>
			<img
				className='h-14 w-14 rounded-full'
				src={
					player.profilePic !== (undefined || null)
						? `/images/${player.uuid}/${player.profilePic}`
						: "/images/noimg.jpeg"
				}
			/>
		</div>
	);
}
