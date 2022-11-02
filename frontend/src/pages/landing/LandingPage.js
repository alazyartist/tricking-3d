import { Canvas } from "@react-three/fiber";
import React from "react";
import { Link } from "react-router-dom";
import { TrickedexLogo } from "../../data/icons/TrickedexLogo";
import EnterSandboxLink from "../../pages/home/components/EnterSandboxLink";
import TorqueScene from "../../scenes/TorqueScene";
const LandingPage = () => {
	return (
		<div className='no-scrollbar fixed top-0 flex h-[100vh] w-[100vw] flex-col items-center justify-between gap-2 overflow-y-scroll bg-zinc-100 text-zinc-800'>
			<TrickedexLogo className='flex-shrink-0 fill-zinc-800' />
			<div className='flex h-[120px] flex-shrink-0 flex-col place-content-center items-center'>
				<div className='font-inter text-3xl font-light'>
					Tricking is <span className='font-black'>complicated.</span>
				</div>
				<div className='font-light'>
					The trickedex gives you all the tools <br />
					to make sense of it faster in one place
				</div>
			</div>
			<Link
				to='/sandbox'
				className='rounded-md bg-indigo-600 p-2 font-bold text-zinc-100'>
				Sandbox
			</Link>
			<div className='flex w-[100vw] flex-shrink-0  gap-2 overflow-hidden'>
				<div className='h-[200px] w-[300px] flex-shrink-0 rounded-md bg-zinc-900'></div>
				<div className='h-[200px] w-[100px] flex-shrink-0 rounded-md bg-zinc-900'></div>
			</div>
			<div className='relative ml-3  w-[300px] flex-shrink-0 place-self-start rounded-md '>
				<div className='p-2 font-black text-zinc-800'>Explore Tricks in 3D</div>
				<div className='h-[200px] w-[300px] flex-shrink-0 rounded-md bg-zinc-900'>
					<Canvas className='h-[200px] w-[300px] flex-shrink-0 rounded-md bg-zinc-900'>
						<TorqueScene />
					</Canvas>
				</div>
			</div>
			<div className='relative mr-3 h-[200px] w-[300px] flex-shrink-0 place-self-end rounded-md bg-zinc-900'>
				<div className='absolute top-[-5px] p-4 font-black text-zinc-300'>
					Have quick access to the theory.
				</div>
			</div>
			<div className='relative ml-3 flex h-[200px] w-[300px] flex-shrink-0 place-content-center items-center place-self-start rounded-md bg-zinc-900'>
				<div className='absolute left-0 top-[-5px] p-4 font-black text-zinc-300'>
					Track your progress
				</div>
				<div className=' text-zinc-300'>Image of Progress Tracking Screen</div>
			</div>
			<div />
		</div>
	);
};

export default LandingPage;
