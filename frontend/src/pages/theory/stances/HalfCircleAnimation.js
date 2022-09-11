import React, { useEffect, useState } from "react";
import { useSpring, animated, config } from "react-spring";

export const HalfCircle = (props) => {
	const [otherStance, setOtherStance] = useState();
	const color = {
		Backside: `#07b9e9`,
		Inside: `#06d8b7`,
		Outside: `#10b35d`,
		Frontside: `#003eb3`,
		BacksideComplete: "#7EE0FB",
		OutsideComplete: "#75fbb3",
		OutsideSemi: "#2db36c",
		FrontsideSemi: "#2b5ab3",
		FrontsideMega: "#4171ca",
		InsideMega: "#40baa6",
		InsideHyper: "#5ed8c5",
		BacksideHyper: "#6bcee9",
	};

	useEffect(() => {
		if (props.isOtherStance) {
			if (props.stance?.includes("Backside")) {
				setOtherStance(
					props.stance
						.replace("Backside", "Frontside")
						.replace("Complete", "Mega")
						.replace("Hyper", "Semi")
				);
			} else if (props.stance?.includes("Frontside")) {
				setOtherStance(
					props.stance
						.replace("Frontside", "Backside")
						.replace("Mega", "Complete")
						.replace("Semi", "Hyper")
				);
			} else if (props.stance?.includes("Outside")) {
				setOtherStance(
					props.stance
						.replace("Outside", "Inside")
						.replace("Semi", "Hyper")
						.replace("Complete", "Mega")
				);
			} else if (props.stance?.includes("Inside")) {
				setOtherStance(
					props.stance
						.replace("Inside", "Outside")
						.replace("Hyper", "Semi")
						.replace("Mega", "Complete")
				);
			}
		} else {
			setOtherStance(props.stance);
		}
	}, [props]);
	useEffect(() => {
		console.log(otherStance, "other");
	}, [otherStance]);
	// const [isFolded, setIsFolded] = useState(false);
	const sprang = useSpring({
		// from: {
		// 	d: "M334 72 167 236 0 70s.13 0 .13-.88a236 236 0 0 1 333.75 0c1 1 .12 2.88.12 2.88Z",
		// },

		from: {
			color: color[otherStance],
			opacity: 0,
			d: "M472 236 H118 a236 236 118 0 1 236 0Z",
		},
		to: [
			{
				color: color[otherStance],
				opacity: 0,
				d: "M472 236 H118 a236 236 118 0 1 236 0Z",
			},

			{
				color: color[otherStance],
				opacity: 1,
				d: "M472 236 H0 a236 236 0 0 1 472 0Z",
			},
		],
		// to: {
		// 	d: "M472 472 236 472 0 70s.13 0 .13-.88a236 236 0 0 1 333.75 0c1 1 .1 2.88.472 0Z",
		// },
		reverse: props.isFolded,
		config: { config: config.wobbly, duration: 450 },
	});

	return (
		<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 472 236' {...props}>
			<g
				//  onClick={() => setIsFolded(!isFolded)}
				data-name='Layer 2'>
				<animated.path
					d={sprang.d}
					style={{
						opacity: sprang.opacity,
						fill: sprang.color,
					}}
					data-name='Layer 5'
				/>
				<text
					x={228}
					y={228}
					fontFamily='Virgil, Segoe UI Emoji'
					fontSize='20pt'
					fill='#202023'
					className='translate-x-[-86px] translate-y-[-30px]'
					textAnchor='start'
					style={{
						whiteSpace: "pre",
					}}
					direction='ltr'>
					{otherStance}
				</text>
			</g>
		</svg>
	);
};

// export const HalfCircleFold = (props) => (
// 	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 334.36 236' {...props}>
// 		<g data-name='Layer 2'>
// 			<path
// 				d='M334 72 167 236 0 70s.13 0 .13-.88a236 236 0 0 1 333.75 0c1 1 .12 2.88.12 2.88Z'
// 				style={{
// 					fill: "#2b5ab3",
// 				}}
// 				data-name='Layer 5'
// 			/>
// 		</g>
// 	</svg>
// );

export default HalfCircle;
