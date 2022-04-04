import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { HomeScene } from "../scenes/HomeScene";
import Loader from "../components/loaders/Loader";
import { useNavigate, Link } from "react-router-dom";
function Home() {
	const navigate = useNavigate();
	return (
		<div>
			<div
				id='AppBackground-flex'
				className='flex h-screen w-screen flex-col place-items-center'>
				<div className='mt-14 w-full text-center text-zinc-200'>
					<h1>
						Welcome to <div className='inline font-black'>Tricking-3D</div>
					</h1>
				</div>
				<button className='m-2 rounded-3xl bg-indigo-600 px-2 py-0 font-inter font-semibold text-zinc-300'>
					Learn More
				</button>

				<Link
					to='/3d/sandbox/'
					id='canvas-container'
					className='m-5 h-[40vw] w-[90vw] rounded-2xl bg-zinc-900 md:h-[20vw] md:w-[40vw] '>
					<Canvas className='rounded-2xl'>
						<Suspense fallback={<Loader />}>
							<HomeScene />
						</Suspense>
					</Canvas>

					<div className='translate-y-[-5vh] lg:translate-y-[-6vh] 2xl:translate-y-[-10vh] '>
						<h1 className='l:text-4xl text-center text-xl font-black text-zinc-300 md:text-2xl'>
							Enter Sandbox
						</h1>
					</div>
				</Link>

				<div className='flex w-[90vw] flex-col place-items-center justify-center gap-5 rounded-3xl bg-zinc-800 p-2 font-bold text-zinc-300'>
					<Link to='/3d/sandbox'>
						<div>Sandbox</div>
					</Link>
					<Link to='/3d/instructions'>
						<div>Instructions</div>
					</Link>
					<Link to='/3d/comingsoon'>
						<div>Learn</div>
					</Link>
					<Link to='/3d/comingsoon'>
						<div>Theory</div>
					</Link>
					<Link to='/3d/contribute'>
						<div>Contribute</div>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Home;