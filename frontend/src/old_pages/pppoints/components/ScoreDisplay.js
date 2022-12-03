import React, { useEffect } from "react";
import { animated, useSpring } from "react-spring";
const ScoreDisplay = ({ team1Score, team2Score }) => {
	const [nums, numApi] = useSpring(() => ({
		from: {
			num1: 50,
			num2: 50,
		},
		to: {
			num1: team1Score === team2Score ? 50 : team1Score ? team1Score : 0,
			num2: team2Score === team1Score ? 50 : team2Score ? team2Score : 0,
		},
		config: { tension: 80, friction: 40 },
	}));
	useEffect(() => {
		numApi.start({
			to: {
				num1: team1Score === team2Score ? 50 : team1Score ? team1Score : 0,
				num2: team2Score === team1Score ? 50 : team2Score ? team2Score : 0,
			},
		});
	}, [team1Score, team2Score]);
	return (
		<div className='flex w-[80%] place-items-center'>
			<animated.div
				style={{ width: nums.num1.to((num) => `${num}%`) }}
				className={`flex w-1/2 place-content-center place-items-center bg-cyan-500`}>
				{nums.num1.to((num) => {
					if (num === 0) return "";
					if (num !== 0) return Math.round(num);
				})}
			</animated.div>
			<animated.div
				style={{ width: nums.num2.to((num) => `${num}%`) }}
				className={`flex w-1/2 place-content-center place-items-center bg-pink-500`}>
				{nums.num2.to((num) => {
					if (num === 0) return "";
					if (num !== 0) return Math.round(num);
				})}
			</animated.div>
		</div>
	);
};

export default ScoreDisplay;
