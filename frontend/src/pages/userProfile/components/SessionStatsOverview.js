import React from "react";
import { a } from "react-spring";

const SessionStatsOverview = ({ summary }) => {
	let sessionCombosArr = summary?.SessionData;
	let sessionTricksArr = summary?.SessionData?.map(
		(s) => s.ClipLabel.comboArray
	)
		?.flat()
		?.sort((a, b) => {
			if (a.type > b.type) return 1;
			if (a.type < b.type) return -1;
			if (a.name > b.name) return 1;
			if (a.name < b.name) return -1;
			return 0;
		});
	let longestCombo = sessionCombosArr?.sort((a, b) => {
		if (a.ClipLabel.comboArray.length > b.ClipLabel.comboArray.length)
			return -1;
		if (a.ClipLabel.comboArray.length < b.ClipLabel.comboArray.length) return 1;
		return 0;
	})?.[0]?.ClipLabel;
	let greatestCombo = sessionCombosArr?.sort((a, b) => {
		if (a.ClipLabel.comboArray.pointValue > b.ClipLabel.comboArray.pointValue)
			return -1;
		if (a.ClipLabel.comboArray.pointValue < b.ClipLabel.comboArray.pointValue)
			return 1;
		return 0;
	})?.[0]?.ClipLabel;
	let uniqueTricks = [
		...new Map(sessionTricksArr?.map((item) => [item["name"], item])).values(),
	];
	let tricksByPoints = sessionTricksArr?.sort((a, b) => {
		if (a.pointValue > b.pointValue) return -1;
		if (a.pointValue < b.pointValue) return 1;
		return 0;
	});

	console.log(tricksByPoints?.[0]);

	// .map((c) => console.log(c.ClipLabel.comboArray));
	return (
		<div className='flex w-full flex-col gap-1'>
			<div>
				<span className='text-zinc-400'>Session Total Points: </span>
				<span>
					{summary?.SessionData?.reduce(
						(sum, b) => sum + b?.ClipLabel?.pointValue,
						0
					)}
				</span>
			</div>
			<div className='flex justify-between'>
				<div>
					<span className='text-zinc-400'>Combos: </span>
					{sessionCombosArr?.length}
				</div>
				<div>
					<div>
						<span className='text-zinc-400'>Tricks:</span>{" "}
						{sessionTricksArr?.length}
					</div>{" "}
					<div>
						<span className='text-zinc-400'>U Tricks: </span>
						{uniqueTricks?.filter((t) => t?.type === "Trick").length}
					</div>
					<div>
						<span className='text-zinc-400'>U Transitions: </span>
						{uniqueTricks?.filter((t) => t?.type === "Transition")?.length}
					</div>
				</div>
			</div>
			<div>
				<span className='text-zinc-400'>Greatest Trick: </span>
				{tricksByPoints?.[0]?.name}
			</div>

			<div>
				<span className='text-zinc-400'>
					Longest {longestCombo?.name === greatestCombo?.name && "& Greatest"}{" "}
					Combo:
				</span>{" "}
				{longestCombo?.name}
			</div>
			{longestCombo?.name !== greatestCombo?.name && (
				<div>
					<span className='text-zinc-400'>Greatest Combo: </span>
					{greatestCombo?.name}
				</div>
			)}
		</div>
	);
};

export default SessionStatsOverview;
