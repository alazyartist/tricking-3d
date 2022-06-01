import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { HomeScene } from "../scenes/HomeScene";
import Loader from "../components/loaders/Loader";
import { useNavigate, Link } from "react-router-dom";
import DonateText from "../components/contribute/DonateText";
import MultiDonateButton from "../components/info/MultiDonateButton";
import { TorqueScene } from "../scenes/TorqueScene";
import TabBar from "../components/TabBar";
import { FaGraduationCap, FaToolbox } from "react-icons/fa";
function Home() {
	const navigate = useNavigate();
	return (
		<div>
			<div
				id='AppBackground-flex'
				className='flex h-screen w-screen flex-col place-items-center'>
				<div className='mt-14 w-full text-center text-zinc-200'>
					<h1 className='text-xl '>
						Welcome to <div className='inline font-black'>Tricking-3D</div>
					</h1>
				</div>
				<Link
					to='/3d/learnmore'
					className='font-inter m-2 rounded-3xl bg-indigo-600 px-2 py-0 font-semibold text-zinc-300'>
					Learn More
				</Link>

				<Link
					to='/3d/sandbox/'
					id='canvas-container'
					className='m-5 h-[40vw] w-[90vw] rounded-2xl bg-zinc-900 md:h-[40vh] md:w-[90vh] '>
					<Suspense fallback={<Loader />}>
						{/* <Canvas className='rounded-2xl'>
							<Suspense fallback={<Loader />}>
								<TorqueScene />
							</Suspense>
						</Canvas> */}
					</Suspense>

					<div className='translate-y-[-5vh] lg:translate-y-[-6vh] 2xl:translate-y-[-10vh] '>
						<h1 className='l:text-4xl text-center text-xl font-black text-zinc-300 md:text-2xl'>
							Enter Sandbox
						</h1>
					</div>
				</Link>

				<div className='m-2 rounded-2xl bg-red-700 p-4 text-center text-white'>
					UNDERGOING REDESIGN <br></br>THINGS WILL BREAK
				</div>
				<div className='flex w-[90vw] flex-col place-items-center justify-center gap-5 rounded-2xl bg-gradient-to-b from-sky-400 to-sky-300 p-2 font-bold text-zinc-300'>
					{/* <Link to='/3d/sandbox'>
						<div>Sandbox</div>
					</Link> */}
					<Link className='' to='/3d/instructions'>
						<div>Instructions</div>
					</Link>
					{/* <Link to='/3d/learnmore'>
						<div>Learn More</div>
					</Link>
					<Link to='/3d/about'>
						<div>About</div>
					</Link> */}
					{/* <Link to='/3d/comingsoon'>
						<div>Learn</div>
					</Link> */}
					{/* <Link to='/3d/theory'>
						<div>Theory</div>
					</Link>
					<Link to='/3d/contribute'>
						<div>Contribute</div> */}
					{/* </Link> */}
					{/* <Link to='/3d/yonder'>
						<div>yonder</div>
					</Link> */}
				</div>

				<div className='m-2 flex w-full place-content-center gap-4 rounded-xl p-2'>
					<div className='flex h-20 w-full flex-col place-content-center place-items-center rounded-xl bg-gradient-to-b from-teal-400 to-teal-300 text-4xl'>
						<FaToolbox />
						<div className='text-sm'>Combo Maker</div>
					</div>
					<div className='flex h-20 w-full flex-col place-content-center place-items-center rounded-xl bg-gradient-to-b from-teal-400 to-teal-300 text-4xl'>
						<FaGraduationCap />
						<div className='text-sm'>Theory</div>
					</div>
				</div>
				<div className='bottom-8 py-8'>
					<MultiDonateButton />
				</div>
			</div>
		</div>
	);
}

export default Home;
