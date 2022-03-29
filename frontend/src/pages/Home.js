import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { HomeScene } from "../scenes/HomeScene";
import Loader from "../components/loaders/Loader";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
function Home() {
	const navigate = useNavigate();
	return (
		<div>
			<Header />
			<div className='flex h-screen w-screen flex-col place-items-center bg-slate-800'>
				<div className='mt-[50px] w-2/6 rounded-lg bg-slate-500 text-center'>
					<h1>
						Welcome to <div className='inline font-black'>Tricking-3D</div>
					</h1>
				</div>
				<button className='m-2 rounded-3xl bg-emerald-500 px-2 py-0'>
					Learn More
				</button>
				<div
					onClick={() => navigate("/3d/sandbox/")}
					id='canvas-container'
					className='m-5 h-[20vh] w-[60vw] rounded-2xl bg-zinc-800 md:h-[20vw] md:w-[40vw] '>
					<Canvas className='rounded-2xl'>
						<Suspense fallback={<Loader />}>
							<HomeScene />
						</Suspense>
					</Canvas>

					<div className='translate-y-[-10vh] bg-slate-800 bg-opacity-40 p-1 hover:bg-slate-800'>
						<h1 className='text-center font-black text-zinc-300'>
							Enter Sandbox
						</h1>
					</div>
				</div>
				<div className='flex w-full flex-col justify-center gap-5 bg-zinc-800 font-bold text-zinc-300'>
					<div>Sandbox</div>
					<div>Learn</div>
					<div>Theory</div>
					<div>Contribute</div>
					<div>Instructions</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
