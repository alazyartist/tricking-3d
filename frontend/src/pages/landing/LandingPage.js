import { Canvas } from "@react-three/fiber";
import React from "react";
import { Link } from "react-router-dom";
import { TrickedexLogo } from "../../data/icons/TrickedexLogo";
import EnterSandboxLink from "../../pages/home/components/EnterSandboxLink";
import { animated, useSpring } from "react-spring";
import TorqueScene from "../../scenes/TorqueScene";
import AnatomyOfATrick from "../theory/anatomy/AnatomyOfATrick";
import AnatomyNav from "../theory/components/AnatomyNavSVG";
import AnatomySketch from "../theory/components/AnatomySketchSVG";
import TheoryPage from "../theory/TheoryPage";
import DetailCard from "./components/DetailCard";
const LandingPage = () => {
	return (
		<div className='no-scrollbar fixed top-0 flex h-[100vh] w-[100vw] flex-col place-items-center justify-between gap-2 overflow-y-scroll bg-zinc-100 text-zinc-800'>
			<div
				id='abovethefold'
				className='flex h-[100vh] flex-shrink-0 flex-col items-center gap-2'>
				<TrickedexLogo className='flex-shrink-0 fill-zinc-800' />
				<div className='flex h-[120px] flex-shrink-0 flex-col place-content-center items-center'>
					<div className='font-inter text-3xl font-light'>
						Tricking is <span className='font-black'>complicated.</span>
					</div>
					<div className='font-light'>
						The trickedex gives you the tools <br />
						to make sense of it in one place
					</div>
				</div>
				<Link
					to='/sandbox'
					className='rounded-md bg-indigo-600 p-2 font-bold text-zinc-100'>
					Sandbox
				</Link>
				<Link
					to='/home'
					className='rounded-md bg-indigo-400 p-2 font-bold text-zinc-100'>
					Home
				</Link>
				<MovingBackground />

				{/* <div className='flex w-[100vw] flex-shrink-0  gap-2 overflow-hidden'>
					<div className='h-[200px] w-[300px] flex-shrink-0 rounded-md bg-zinc-900'></div>
					<div className='h-[200px] w-[100px] flex-shrink-0 rounded-md bg-zinc-900'></div>
				</div> */}
			</div>

			<DetailCard
				left
				title={"Explore Tricks in 3D"}
				description="See Tricks like never before. Study the movement's your way.">
				{/* <Canvas className='rounded-md bg-zinc-900 md:min-h-[400px]'>
					<TorqueScene />
				</Canvas> */}
			</DetailCard>
			<DetailCard
				title={"Have Quick Access to the Theory"}
				description='Fully Searchable and at you fingertips.'>
				<AnatomySketch
					className={
						"h-[200px] w-[300px] rounded-md bg-zinc-900 md:h-[400px] md:w-[600px] "
					}
				/>
			</DetailCard>
			<DetailCard
				left
				title={"Track your progress"}
				description="Easily see what tricks you've done and track your goals"></DetailCard>
			<DetailCard
				title={"Follow your friends"}
				description='Keep track of your progress as a group.'></DetailCard>
			<div className='h-[40px]' />
			<MovingBackground />
		</div>
	);
};

export default LandingPage;

export const MovingBackground = () => {
	const anim = useSpring({
		loop: true,

		to: [
			{ o1: 0.8, o2: 0.8, o3: 0.8, l1: "40vw", l2: "60vw", l3: "40vw" },
			{ o1: 0.5, o2: 0.45, o3: 0.8, l1: "40vw", l2: "20vw", l3: "40vw" },

			{ o1: 0.8, o2: 0.75, o3: 0.5, l1: "80vw", l2: "40vw", l3: "20vw" },
			{ o1: 0.8, o2: 0.8, o3: 0.8, l1: "40vw", l2: "20vw", l3: "60vw" },
		],
		from: { o1: 1, o2: 1, o3: 1, l1: "40vw", l2: "20vw", l3: "60vw" },
		config: { bounce: 10, tension: 25, mass: 1.2, friction: 25 },
		// onRest: () => setOpenHamburger(!openHamburger),
	});
	return (
		<div className='absolute -z-10 h-[50vh] w-[100vw]'>
			<animated.div
				style={{ opacity: anim.o1, top: anim.l1, left: anim.l3 }}
				className={`absolute top-[55vh] left-[60vw] -z-10 h-[369px] w-[369px] translate-x-[-50%] rounded-full bg-teal-300 blur-3xl md:h-[60vw] md:w-[60vw]`}
			/>
			<animated.div
				style={{ opacity: anim.o2, left: anim.l2, top: anim.l3 }}
				className={`absolute top-[35vh] left-[20vw] -z-10 h-[469px] w-[469px] translate-x-[-50%] rounded-full bg-sky-300 blur-3xl md:h-[60vw] md:w-[60vw]`}
			/>
			<animated.div
				style={{ opacity: anim.o3, top: anim.l3, left: -anim.l1 }}
				className={`absolute top-[15vh] left-[60vw] -z-10 h-[369px] w-[369px] translate-x-[-50%] rounded-full bg-emerald-300 blur-3xl md:h-[60vw] md:w-[60vw]`}
			/>
		</div>
	);
};
