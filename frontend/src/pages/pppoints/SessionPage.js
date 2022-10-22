import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import {
	useBattleRoomClose,
	useBattleRoomUpdate,
	useGetBattleRoombySessionid,
} from "../../api/useBattleRoom";
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
	let isHost = host === userUUID;
	let isJudge = judges.some((j) => j.uuid === userUUID);
	const { data: roomSetup } = useGetBattleRoombySessionid(sessionID);
	const { mutate: closeRoom } = useBattleRoomClose(sessionID);
	const { mutate: updateRoomStats } = useBattleRoomUpdate(sessionID);
	useEffect(() => {
		console.log(roomSetup);
		Array.isArray(roomSetup?.judges) && setJudges([...roomSetup?.judges]);
		Array.isArray(roomSetup?.team1) && setTeam1([...roomSetup?.team1]);
		Array.isArray(roomSetup?.team2) && setTeam2([...roomSetup?.team2]);
		setHostTimer(roomSetup?.duration);
		setTimer(roomSetup?.duration);
		setDuration(roomSetup?.duration);
		setHost(roomSetup?.host);
	}, [roomSetup]);
	const getWinners = () => {
		let winner, audienceWinner;
		if (team1points > team2points) {
			winner = "Team1";
		}
		if (team2points > team1points) {
			winner = "Team2";
		}
		if (publicTeam1Points > publicTeam2Points) {
			audienceWinner = "Team1";
		}
		if (publicTeam2Points > publicTeam1Points) {
			audienceWinner = "Team2";
		}
		return { winner, audienceWinner };
	};
	const getPointsNormalized = (team1Points, team2Points) => {
		let totalPoints = team1Points + team2Points;
		let team1PointsNormalized =
			(team1Points / totalPoints).toPrecision(2) * 100;
		let team2PointsNormalized =
			(team2Points / totalPoints).toPrecision(2) * 100;
		console.log("Total", totalPoints);
		console.log("1", team1PointsNormalized);
		console.log("2", team2PointsNormalized);
		return [team1PointsNormalized, team2PointsNormalized];
	};
	useEffect(() => {
		const subscribe = async () => {
			await sessionChannel.subscribe("timer", (t) => {
				setPollsOpen(t.data.pollsOpen);
				setTimer(t.data.timer);
			});
			if (isHost) {
				await sessionChannel.subscribe("total", (t) => {
					console.log(t);
				});
			}
			await sessionChannel.subscribe("closeRoom", (m) => {
				//close battleRoom & Total
				if (isJudge) {
					let [team1PointsNormal, team2PointsNormal] = getPointsNormalized(
						team1points,
						team2points
					);
					sessionChannel.publish("total", {
						judge: userUUID,
						team1: team1PointsNormal,
						team2: team2PointsNormal,
					});
				} else {
					let [team1PointsNormal, team2PointsNormal] = getPointsNormalized(
						publicTeam1Points,
						publicTeam2Points
					);
					sessionChannel.publish("total", {
						judge: userUUID,
						team1: team1PointsNormal,
						team2: team2PointsNormal,
					});
				}
				if (isHost) {
					setTimeout(() => {
						const { winner, audienceWinner } = getWinners();
						updateRoomStats({
							team1Score: team1points,
							team2Score: team2points,
							team1AudienceScore: publicTeam1Points,
							team2AudienceScore: publicTeam2Points,
							winner,
							audienceWinner,
						});
						closeRoom();
					}, 30000);
				}
			});
			await sessionChannel.subscribe("points", (m) => {
				// if (m?.data?.judge) {
				// 	if (m?.data?.team === "Team1") {
				// 		setTeam1points((prevPoints) => prevPoints + 1);
				// 	}
				// 	if (m?.data?.team === "Team2") {
				// 		setTeam2points((prevPoints) => prevPoints + 1);
				// 	}
				// } else {
				// 	if (m?.data?.team === "Team1") {
				// 		setPublicTeam1points((prevPoints) => prevPoints + 1);
				// 	}
				// 	if (m?.data?.team === "Team2") {
				// 		setPublicTeam2points((prevPoints) => prevPoints + 1);
				// 	}
				// }
			});
		};
		subscribe();
		return () => sessionChannel.unsubscribe();
	});
	const handleUserClick = (team) => {
		if (pollsOpen === true) {
			// sessionChannel.publish("points", {
			// 	user: userUUID,
			// 	team: team,
			// 	points: 1,
			// });
			if (team === "Team1") {
				setPublicTeam1points((prevPoints) => prevPoints + 1);
			}
			if (team === "Team2") {
				setPublicTeam2points((prevPoints) => prevPoints + 1);
			}
		}
	};
	const handleJudgeClick = (team) => {
		if (pollsOpen === true) {
			// sessionChannel.publish("points", {
			// 	judge: userUUID,
			// 	team: team,
			// 	points: 1,
			// });
			if (team === "Team1") {
				setTeam1points((prevPoints) => prevPoints + 1);
			}
			if (team === "Team2") {
				setTeam2points((prevPoints) => prevPoints + 1);
			}
		}
	};
	useEffect(() => {
		if (hostTimer && duration && hostTimer > 0 && hostTimer !== duration) {
			sessionChannel.publish("timer", { timer: hostTimer, pollsOpen: true });
		}
		if (hostTimer === 0 && pollsOpen === true) {
			sessionChannel.publish("timer", { timer: hostTimer, pollsOpen: false });
		}
		if (duration && hostTimer === 0 && pollsOpen === false) {
			sessionChannel.publish("closeRoom", { message: "Close" });
		}
	}, [hostTimer, duration, pollsOpen]);
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
		<div className='fixed top-0 left-0 flex h-screen w-screen flex-col place-items-center p-2 pt-14 text-zinc-300'>
			<Link className='absolute top-20 left-4 text-3xl' to={-1}>
				<IoIosArrowBack />
			</Link>
			<div className=' font-inter text-3xl font-black '>Pppoints</div>
			<div className='neumorphicIn flex w-[70vw] flex-col place-items-center rounded-xl p-4 text-center  font-bold text-zinc-300'>
				<div>
					{team1.map((m) => m.username)} vs.
					{team2.map((m) => m.username)}
				</div>
				<div>{timer}</div>
				{isHost && !!timer && !pollsOpen && (
					<button
						className='w-full max-w-[400px] rounded-xl bg-emerald-500 p-2'
						onClick={() => handleTimer()}>
						Start Timer
					</button>
				)}
			</div>

			<div className='left-50 absolute top-0 font-black text-zinc-700'>
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
