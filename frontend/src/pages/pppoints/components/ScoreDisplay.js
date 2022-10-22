import React from "react";
import { animated, useSpring } from "react-spring";
const ScoreDisplay = ({ team1Score, team2Score }) => {
	let rteam1Score = Math.round(team1Score);
	let rteam2Score = Math.round(team2Score);
	const width1 = useSpring({
		width: `${team1Score}%`,
	});
	const width2 = useSpring({
		width: `${team2Score}%`,
	});
	const [nums, numApi] = useSpring(() => ({
		from: {
			num1: 50,
			num2: 50,
		},
		to: {
			num1: rteam1Score,
			num2: rteam2Score,
		},
		config: { tension: 80, friction: 40 },
	}));
	return (
		<div className='flex w-[80%] place-items-center'>
			<animated.div
				style={{ ...width1 }}
				className={`flex w-1/2 place-content-center place-items-center bg-cyan-500`}>
				{nums.num1.interpolate((num) => Math.floor(num))}
			</animated.div>
			<animated.div
				style={{ ...width2 }}
				className={`flex w-1/2 place-content-center place-items-center bg-pink-500`}>
				{nums.num2.interpolate((num) => Math.floor(num))}
			</animated.div>
			<div
				onClick={() =>
					numApi.start({
						from: { num1: 0, num2: 0 },
						to: {
							num1: rteam1Score,
							num2: rteam2Score,
						},
					})
				}>
				ClickME
			</div>
		</div>
	);
};

export default ScoreDisplay;
