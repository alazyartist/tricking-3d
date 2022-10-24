import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useGetBattleRoombySessionid } from "../../../api/useBattleRoom";
import { useUserStore } from "../../../store/userStore";
import { getPointsNormalized, PlayerMap } from "../SessionPage";
import ScoreDisplay from "./ScoreDisplay";

const SessionRoomStats = () => {
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
			<div>{updatedAt}</div>
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
	return (
		<div className='flex w-full flex-col place-items-center'>
			<div>
				{battleStats?.winner === "Team1" && (
					<span>{battleRoomDetails?.team1?.map((m) => m?.username)}</span>
				)}
			</div>
			<div>
				{battleStats?.winner === "Team2" && (
					<span>{battleRoomDetails?.team2?.map((m) => m?.username)}</span>
				)}
			</div>
			<ScoreDisplay
				team1Score={teamScores?.team1Score}
				team2Score={teamScores?.team2Score}
			/>
			<div>
				{battleStats?.audienceWinner === "Team1" && (
					<span>{battleRoomDetails?.team1?.map((m) => m?.username)}</span>
				)}
			</div>
			<div>
				{battleStats?.audienceWinner === "Team2" && (
					<span>{battleRoomDetails?.team2?.map((m) => m?.username)}</span>
				)}
			</div>
			<ScoreDisplay
				team1Score={teamScores?.team1AudienceScore}
				team2Score={teamScores?.team2AudienceScore}
			/>
		</div>
	);
}

function VsDisplay({ battleRoomDetails }) {
	return (
		<div>
			<span>{battleRoomDetails?.team1?.map((m) => m?.username)}</span>
			{" vs "}
			<span>{battleRoomDetails?.team2?.map((m) => m?.username)}</span>
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
export default SessionRoomStats;
