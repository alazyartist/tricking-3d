import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useGetBattleRoombySessionid } from "../../../api/useBattleRoom";
import { getPointsNormalized, PlayerMap } from "../SessionPage";
import ScoreDisplay from "./ScoreDisplay";

const SessionRoomStats = () => {
	const { sessionID } = useParams();
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
	}, [battleRoomDetails]);
	let battleStats = battleRoomDetails?.BattleRoomStat;
	let updatedAt = new Date(battleRoomDetails?.updatedAt).toDateString();

	return (
		<div className='fixed top-0 left-0 flex h-screen w-screen flex-col place-items-center p-2 pt-14 text-zinc-300'>
			<Link className='absolute top-20 left-4 text-3xl' to={-1}>
				<IoIosArrowBack />
			</Link>
			<div>{updatedAt}</div>
			<div>
				<span>{battleRoomDetails?.team1?.map((m) => m?.username)}</span>
				{" vs "}
				<span>{battleRoomDetails?.team2?.map((m) => m?.username)}</span>
			</div>
			<div className='flex w-full flex-col place-items-center'>
				<div>{battleStats?.winner}</div>
				<ScoreDisplay
					team1Score={teamScores?.team1Score}
					team2Score={teamScores?.team2Score}
				/>
				<div>{battleStats?.audienceWinner}</div>
				<ScoreDisplay
					team1Score={teamScores?.team1AudienceScore}
					team2Score={teamScores?.team2AudienceScore}
				/>
			</div>
			<div className='flex place-items-center gap-2 text-zinc-300'>
				{battleRoomDetails?.judges?.map((judge) => {
					return (
						<div className='flex flex-col place-items-center'>
							<PlayerMap player={judge} />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SessionRoomStats;
