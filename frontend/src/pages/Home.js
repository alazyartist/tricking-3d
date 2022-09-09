import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { HomeScene } from "../scenes/HomeScene";
import Loader from "../components/loaders/Loader";
import { useNavigate, Link } from "react-router-dom";
import MultiDonateButton from "../components/info/MultiDonateButton";
import { TorqueScene } from "../scenes/TorqueScene";
import { FaGraduationCap, FaQrcode } from "react-icons/fa";
import { useUserStore } from "../store/userStore";
import { ReactComponent as ComboMakerBlueprint } from "../data/ComboMakerBlueprint.svg";
import { TrickedexLogo } from "../data/icons/TrickedexLogo";
import TricklistPage from "./tricklist/TricklistPage";
import Captures from "./dash/components/Captures";
import ProfileCode from "./dash/components/ProfileCode";
import UpdateStatusInput from "../components/UpdateStatusInput";

function Home() {
	const [profileCodeOpen, setProfileCodeOpen] = useState(false);
	const user = useUserStore((s) => s.user);
	const { uuid } = useUserStore((s) => s.userInfo);
	const accessToken = useUserStore((s) => s.accessToken);
	const navigate = useNavigate();
	return (
		<div className='sticky mt-0 '>
			<div
				id='AppBackground-flex'
				className='flex h-screen w-screen flex-col place-items-center'>
				<div className='w-full text-center text-zinc-200'>
					<h1 className='flex flex-col text-xl '>
						Welcome to the
						<TrickedexLogo className='-m-2px flex w-[80vw] place-self-center' />
						<div className='inline font-black'>{user}</div>
					</h1>
				</div>

				<Link
					to='/learnmore'
					className='m-2 rounded-3xl bg-indigo-600 px-2 py-0 font-inter font-semibold text-zinc-300'>
					Learn More
				</Link>

				<Link
					to='/sandbox/'
					id='canvas-container'
					className='m-5 h-[40vw] w-[90vw] rounded-2xl bg-zinc-900 md:h-[40vh] md:w-[90vh] '>
					<Suspense fallback={<Loader />}>
						<Canvas className='rounded-2xl'>
							<Suspense fallback={<Loader />}>
								<TorqueScene />
							</Suspense>
						</Canvas>
					</Suspense>

					<div className='translate-y-[-5vh] lg:translate-y-[-6vh] 2xl:translate-y-[-10vh] '>
						<h1 className='l:text-4xl text-center text-xl font-black text-zinc-300 md:text-2xl'>
							Enter Sandbox
						</h1>
					</div>
				</Link>
				{!accessToken ? (
					<>
						<Link className='' to='/instructions'>
							<div className='flex w-[90vw] flex-col place-items-center justify-center gap-5 rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-800 p-2 font-bold text-zinc-300'>
								<div>Instructions</div>
							</div>
						</Link>

						<div className='m-2 flex w-full place-content-center gap-4 rounded-xl p-2 text-zinc-300'>
							<Link
								className='flex h-20 w-full flex-col place-content-center place-items-center rounded-xl bg-gradient-to-b from-zinc-800  text-4xl'
								to='/comboMaker'>
								{/* UnderConstruction Label */}
								<div className='relative top-7 right-8 -rotate-[22deg] rounded-md bg-red-500 bg-opacity-70 p-2 text-base'>
									Under Construction
								</div>
								<ComboMakerBlueprint fill={"#d4d4d8"} />
								<div className='mt-[-14px] text-sm font-bold'>Combo Maker</div>
							</Link>
							<Link
								className='flex h-20 w-full flex-col place-content-center place-items-center rounded-xl bg-gradient-to-b from-zinc-800 text-6xl'
								to='/theory'>
								<FaGraduationCap />
								<div className='text-sm font-bold'>Theory</div>
							</Link>
						</div>

						<div className=' flex gap-4'>
							<Link to='/login'>
								<div className='w-fit rounded-xl bg-zinc-300 p-3'>LOGIN</div>
							</Link>
							<Link to='/register'>
								<div className='w-fit rounded-xl bg-zinc-700 p-3 text-zinc-300'>
									REGISTER
								</div>
							</Link>
						</div>

						<div className='bottom-8 py-8'>
							<MultiDonateButton />
						</div>
					</>
				) : (
					// LoggedIn
					<>
						<div className='text-zinc-300'>
							{profileCodeOpen ? (
								<ProfileCode setProfileCodeOpen={setProfileCodeOpen} />
							) : (
								<div className='mb-2 flex flex-col gap-2 rounded-xl bg-zinc-700 p-2'>
									<TricklistPage profileuuid={uuid} />
									{/* <UpdateStatusInput /> */}
								</div>
							)}
							<div className='mb-20 flex flex-col gap-2 rounded-xl bg-zinc-700 p-2'>
								<Captures />
							</div>
						</div>
					</>
				)}
			</div>
			<div
				onClick={() => setProfileCodeOpen(!profileCodeOpen)}
				className='absolute bottom-20 left-5 flex place-items-center gap-2 text-zinc-300'>
				<FaQrcode /> {!profileCodeOpen ? "Capture" : "Close"}
			</div>
		</div>
	);
}

export default Home;
