import React, { useState } from "react";
import { HomeScene } from "../../scenes/HomeScene";
import { useNavigate, Link } from "react-router-dom";
import { FaClipboardList, FaGraduationCap, FaQrcode } from "react-icons/fa";
import { BsClipboardCheck } from "react-icons/bs";
import { useUserStore } from "../../store/userStore";
import { ReactComponent as ComboMakerBlueprint } from "../../data/ComboMakerBlueprint.svg";
import { TrickedexLogo } from "../../data/icons/TrickedexLogo";
import TricklistPage from "../tricklist/TricklistPage";
import ProfileCode from "../dash/components/ProfileCode";
import UpdateStatusInput from "../../components/UpdateStatusInput";

import useUserInfo from "../../api/useUserInfo";
import { IoIosArrowBack } from "react-icons/io";
import PublicHomePage from "./components/PublicHomePage";
import EnterSandboxLink from "./components/EnterSandboxLink";

function Home() {
	const [profileCodeOpen, setProfileCodeOpen] = useState(false);
	useUserInfo();
	const user = useUserStore((s) => s.userInfo?.username);
	const { uuid } = useUserStore((s) => s.userInfo);
	const accessToken = useUserStore((s) => s.accessToken);
	const navigate = useNavigate();

	const [openTricklists, setOpenTricklists] = useState(false);

	console.log("uuid: ", uuid);
	return (
		<div className='no-scrollbar sticky mt-0 h-[100vh] w-full overflow-y-scroll '>
			<div
				id='AppBackground-flex'
				className='flex h-screen w-screen flex-col place-items-center'>
				<div className='w-full text-center text-zinc-200'>
					<h1 className='flex flex-col text-xl '>
						Welcome to the
						<TrickedexLogo className='-m-2px flex w-[80vw] place-self-center' />
						<div className='font-black text-zinc-300'>{user}</div>
					</h1>
				</div>

				<Link
					to='/learnmore'
					className='m-2 rounded-3xl bg-indigo-600 px-2 py-0 font-inter font-semibold text-zinc-300'>
					Learn More
				</Link>
				<EnterSandboxLink />

				<div className='flex w-[90vw] flex-col place-content-center'>
					{!accessToken ? (
						<PublicHomePage />
					) : (
						// LoggedIn
						<>
							<div className='text-zinc-300'>
								{!openTricklists && !profileCodeOpen && (
									<div className='mb-4 grid w-full grid-cols-2 grid-rows-4 place-content-center place-items-center gap-4'>
										<div
											onClick={() => setProfileCodeOpen(!profileCodeOpen)}
											className={`neumorphic active:neumorphicIn flex h-full w-full flex-col place-content-center place-items-center rounded-lg bg-zinc-800 text-4xl `}>
											<FaQrcode />
											<div className='text-lg font-bold'>Capture</div>
										</div>
										<div
											onClick={() => setOpenTricklists(!openTricklists)}
											className='neumorphic active:neumorphicIn flex h-full w-full flex-col place-content-center place-items-center rounded-lg bg-zinc-800 text-4xl '>
											<FaClipboardList />
											<div className='text-lg font-bold'>Tricklist</div>
										</div>
										<div className='neumorphic active:neumorphicIn flex h-36 w-full flex-col place-content-center place-items-center rounded-lg bg-zinc-800 text-4xl'>
											<BsClipboardCheck />
											<div className='text-lg font-bold'>Claim Tricks</div>
										</div>
										<div className='neumorphic  active:neumorphicIn flex h-36 w-full flex-col place-content-center place-items-center rounded-lg bg-zinc-800 p-4 text-4xl'>
											<ComboMakerBlueprint fill={"#d4d4d8"} />
											<div className='mt-[-18px] text-lg font-bold'>
												ComboMaker
											</div>
										</div>
									</div>
								)}
								{profileCodeOpen ? (
									<>
										<ProfileCode
											setProfileCodeOpen={setProfileCodeOpen}
											profileCodeOpen={profileCodeOpen}
										/>
									</>
								) : (
									<>
										{/* <div className='flex flex-col gap-2 rounded-xl bg-zinc-700 p-2'>
											<UpdateStatusInput />
										</div> */}
										{openTricklists && (
											<div className='neumorphicIn relative my-2 flex flex-col place-items-center gap-2 rounded-xl bg-zinc-800 p-4 pt-[3vh]'>
												<IoIosArrowBack
													className='absolute top-4 left-1 text-4xl'
													onClick={() => setOpenTricklists(!openTricklists)}
												/>
												<TricklistPage profileuuid={uuid} />
											</div>
										)}
									</>
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Home;
