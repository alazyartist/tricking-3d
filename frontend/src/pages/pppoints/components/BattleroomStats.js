import React, { useEffect, useState } from "react";
import { FaUsers, FaUsersSlash } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useGetBattleRoombySessionid } from "../../../api/useBattleRoom";
import { useUserStore } from "../../../store/userStore";
import { getPointsNormalized, PlayerMap } from "../SessionPage";
import ScoreDisplay from "./ScoreDisplay";

const BattleroomStats = () => {
	const { sessionID } = useParams();
	const userUUID = useUserStore((s) => s.userInfo.uuid);
	const { data: battleRoomDetails } = useGetBattleRoombySessionid(sessionID);
	const [teamScores, setTeamScores] = useState({});
	useEffect(() => {
		let [team1Score, team2Score] = getPointsNormalized(
			battleStats?.team1Score,
			battleStats?.team2Score
		);
		let [team1AudienceScore, team2AudienceScore] = getPointsNormalized(
			battleStats?.team1AudienceScore,
			battleStats?.team2AudienceScore
		);
		setTeamScores({
			team1Score,
			team2Score,
			team1AudienceScore,
			team2AudienceScore,
		});
		console.log(battleRoomDetails);
	}, [battleRoomDetails]);
	let battleStats = battleRoomDetails?.BattleRoomStat;
	let updatedAt = new Date(battleRoomDetails?.updatedAt).toDateString();

	return (
		<div className='fixed top-0 left-0 flex h-screen w-screen flex-col place-items-center p-2 pt-14 text-zinc-300'>
			<Link className='absolute top-20 left-4 text-3xl' to={-1}>
				<IoIosArrowBack />
			</Link>
			<div className='font-titan text-3xl text-zinc-500'>{updatedAt}</div>
			<VsDisplay battleRoomDetails={battleRoomDetails} />
			<WinnersDisplay
				battleRoomDetails={battleRoomDetails}
				teamScores={teamScores}
				battleStats={battleStats}
			/>

			<div className='absolute bottom-20 flex w-full place-items-center justify-around gap-2 text-zinc-300'>
				<JudgeScoreDisplay battleRoomDetails={battleRoomDetails} />
			</div>
		</div>
	);
};

function WinnersDisplay({ battleStats, teamScores, battleRoomDetails }) {
	let winner =
		battleStats?.winner !== "Tie" && battleStats?.winner === "Team1"
			? battleRoomDetails?.team1
			: battleRoomDetails?.team2;
	const [showAudienceScore, setShowAudienceScore] = useState(false);
	return (
		<div className='flex w-full flex-col place-items-center'>
			<WinnerUserName
				battleRoomDetails={battleRoomDetails}
				battleStats={battleStats}
				winner={battleStats?.winner}
			/>
			<ScoreDisplay
				team1Score={teamScores?.team1Score}
				team2Score={teamScores?.team2Score}
			/>
			<div
				className={`font-titan text-3xl ${
					battleStats?.winner !== "Tie" && battleStats?.winner === "Team1"
						? "text-cyan-500"
						: "text-pink-500"
				}`}>
				Winner
			</div>
			<div className='flex gap-2 p-2'>
				{winner?.map((winner) => {
					return (
						<div className='flex flex-col place-items-center gap-2'>
							<img
								key={winner.uuid}
								className='h-[30vw] max-h-[160px] w-[30vw] max-w-[160px] rounded-full'
								src={
									winner.profilePic !== (undefined || null)
										? `/images/${winner.uuid}/${winner.profilePic}`
										: "/images/noimg.jpeg"
								}
							/>
							<div>{winner.username}</div>
						</div>
					);
				})}
			</div>
			{showAudienceScore && (
				<>
					<div className='font-titan text-3xl'>Audience Score</div>
					<WinnerUserName
						battleRoomDetails={battleRoomDetails}
						battleStats={battleStats}
						winner={battleStats?.audienceWinner}
					/>

					<ScoreDisplay
						team1Score={teamScores?.team1AudienceScore}
						team2Score={teamScores?.team2AudienceScore}
					/>
				</>
			)}
			{showAudienceScore ? (
				<FaUsers
					onClick={() => setShowAudienceScore(!showAudienceScore)}
					className={`absolute bottom-16 left-5 text-3xl ${
						showAudienceScore ? "text-zinc-300" : "text-zinc-500"
					}`}
				/>
			) : (
				<FaUsersSlash
					onClick={() => setShowAudienceScore(!showAudienceScore)}
					className={`absolute bottom-16 left-5 text-3xl ${
						showAudienceScore ? "text-zinc-300" : "text-zinc-500"
					}`}
				/>
			)}
		</div>
	);
}

function VsDisplay({ battleRoomDetails }) {
	return (
		<div>
			<span>
				{battleRoomDetails?.team1?.map((m, index) => (
					<span className='font-inter font-black text-cyan-500'>
						{m?.username}{" "}
						{battleRoomDetails?.team1.length > 1 &&
							battleRoomDetails?.team1.length - 1 !== index &&
							"&"}{" "}
					</span>
				))}
			</span>
			{" vs "}
			<span>
				{battleRoomDetails?.team2?.map((m, index) => (
					<span className='font-inter font-black text-pink-500'>
						{m?.username}{" "}
						{battleRoomDetails?.team2.length > 1 &&
							battleRoomDetails?.team2.length - 1 !== index &&
							"&"}{" "}
					</span>
				))}
			</span>
		</div>
	);
}

function JudgeScoreDisplay({ battleRoomDetails }) {
	return (
		<>
			{battleRoomDetails?.judges?.map((judge) => {
				let judgeTeam1 = battleRoomDetails?.JudgeScores?.filter(
					(m) => m.judge === judge.uuid && m.team === "Team1" && m.score
				)[0]?.score;
				let judgeTeam2 = battleRoomDetails?.JudgeScores?.filter(
					(m) => m.judge === judge.uuid && m.team === "Team2" && m.score
				)[0]?.score;
				return (
					<div key={judge.uuid} className='flex flex-col place-items-center'>
						<ScoreDisplay team1Score={judgeTeam1} team2Score={judgeTeam2} />
						<PlayerMap player={judge} />
					</div>
				);
			})}
		</>
	);
}
function WinnerUserName({ battleStats, battleRoomDetails, winner }) {
	return (
		<>
			<div>
				{winner === "Team1" && (
					<span className='font-inter font-black text-cyan-500'>
						{battleRoomDetails?.team1?.map((m, index) => (
							<span>
								{m?.username}{" "}
								{battleRoomDetails?.team1.length > 1 &&
									battleRoomDetails?.team1.length - 1 !== index &&
									"&"}{" "}
							</span>
						))}
					</span>
				)}
			</div>
			<div>
				{winner === "Team2" && (
					<span className='font-inter font-black text-pink-500'>
						{battleRoomDetails?.team2?.map((m, index) => (
							<span>
								{m?.username}{" "}
								{battleRoomDetails?.team2.length > 1 &&
									battleRoomDetails?.team2.length - 1 !== index &&
									"&"}{" "}
							</span>
						))}
					</span>
				)}
			</div>
		</>
	);
}
export default BattleroomStats;
