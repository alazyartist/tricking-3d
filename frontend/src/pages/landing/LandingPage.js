import { Canvas } from "@react-three/fiber";
import React from "react";
import { Link } from "react-router-dom";
import { TrickedexLogo } from "../../data/icons/TrickedexLogo";
import EnterSandboxLink from "../../pages/home/components/EnterSandboxLink";
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
				{/* <div className='flex w-[100vw] flex-shrink-0  gap-2 overflow-hidden'>
					<div className='h-[200px] w-[300px] flex-shrink-0 rounded-md bg-zinc-900'></div>
					<div className='h-[200px] w-[100px] flex-shrink-0 rounded-md bg-zinc-900'></div>
				</div> */}
			</div>

			<DetailCard
				left
				title={"Explore Tricks in 3D"}
				description="See Tricks like never before. Study the movement's your way.">
				<Canvas className='min-h-[400px] rounded-md bg-zinc-900'>
					<TorqueScene />
				</Canvas>
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
		</div>
	);
};

export default LandingPage;
