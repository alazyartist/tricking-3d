import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { TorqueScene } from "../../../scenes/TorqueScene";
import Loader from "../../../components/loaders/Loader";
import { Link } from "react-router-dom";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { useSpring, animated } from "react-spring";

const EnterSandboxLink = () => {
	const [expanded, setExpanded] = useState(false);
	const expand = useSpring({
		to: { height: expanded ? "90vh" : "40vw" },
	});
	const expandPos = useSpring({
		to: {
			position: expanded ? "absolute" : "relative",
			top: 0,
		},
	});
	return (
		<animated.div style={{ ...expandPos }}>
			<animated.div
				style={{ ...expand }}
				className='relative m-5 h-[40vw] w-[90vw] rounded-2xl bg-zinc-900 md:h-[40vh] md:w-[90vh] '>
				<Suspense fallback={<Loader />}>
					<Canvas className='rounded-2xl'>
						<Suspense fallback={<Loader />}>
							<TorqueScene />
						</Suspense>
					</Canvas>
				</Suspense>
				<div className='translate-y-[-5vh] lg:translate-y-[-6vh] 2xl:translate-y-[-10vh] '>
					<Link to='/sandbox/' id='canvas-container'>
						<h1 className='l:text-4xl text-center text-xl font-black text-zinc-300 md:text-2xl'>
							Enter Sandbox
						</h1>
					</Link>
				</div>
				<FaExpandArrowsAlt
					onClick={() => setExpanded(!expanded)}
					className='absolute bottom-2 left-2 fill-zinc-300 md:hidden'
				/>
			</animated.div>
		</animated.div>
	);
};

export default EnterSandboxLink;
