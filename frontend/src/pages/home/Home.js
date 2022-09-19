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
import ComboMakerV2 from "../comboMakerV2/ComboMakerV2";
import useUserInfo from "../../api/useUserInfo";
import { IoIosArrowBack } from "react-icons/io";
import PublicHomePage from "./components/PublicHomePage";
import EnterSandboxLink from "./components/EnterSandboxLink";

function Home() {
	useUserInfo();
	const user = useUserStore((s) => s.userInfo?.username);
	const { uuid } = useUserStore((s) => s.userInfo);
	const accessToken = useUserStore((s) => s.accessToken);
	const navigate = useNavigate();

	const [openCaptures, setOpenCaptures] = useState(false);
	const [openTricklists, setOpenTricklists] = useState(false);
	const [openClaimedtricks, setOpenClaimedtricks] = useState(false);
	const [openComboMaker, setOpenComboMaker] = useState(false);
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
								<div className='mb-4 grid w-full grid-cols-2 grid-rows-4 place-content-center place-items-center gap-4'>
									{openCaptures ? (
										<div
											className={`${
												openCaptures ? "col-span-2 row-span-2" : ""
											}`}>
											<ProfileCode
												setProfileCodeOpen={setOpenCaptures}
												profileCodeOpen={openCaptures}
											/>
										</div>
									) : (
										!openTricklists &&
										!openComboMaker && (
											<div
												onClick={() => setOpenCaptures(!openCaptures)}
												className={`neumorphic active:neumorphicIn flex h-full w-full flex-col place-content-center  place-items-center rounded-lg bg-zinc-800 text-4xl `}>
												<FaQrcode />
												<div className='text-lg font-bold'>Capture</div>
											</div>
										)
									)}
									{openTricklists ? (
										<div
											className={`neumorphicIn relative my-2 flex flex-col place-items-center gap-2 rounded-xl bg-zinc-800 pt-[3vh] ${
												openTricklists ? "col-span-2 row-span-2" : ""
											}`}>
											<IoIosArrowBack
												className='absolute top-4 left-1 text-4xl'
												onClick={() => setOpenTricklists(!openTricklists)}
											/>
											<TricklistPage profileuuid={uuid} />
										</div>
									) : (
										!openCaptures &&
										!openComboMaker && (
											<div
												onClick={() => setOpenTricklists(!openTricklists)}
												className='neumorphic active:neumorphicIn flex h-full w-full flex-col place-content-center place-items-center rounded-lg bg-zinc-800 text-4xl '>
												<FaClipboardList />
												<div className='text-lg font-bold'>Tricklist</div>
											</div>
										)
									)}
									{!openTricklists && !openCaptures && !openComboMaker && (
										<div className='neumorphic active:neumorphicIn flex h-full w-full flex-col place-content-center place-items-center rounded-lg bg-zinc-800 text-4xl'>
											<BsClipboardCheck />
											<div className='text-lg font-bold'>Claim Tricks</div>
										</div>
									)}
									{openComboMaker ? (
										<div
											className={`neumorphicIn relative my-2 flex flex-col place-items-center gap-2 rounded-xl bg-zinc-800 pt-[3vh] ${
												openComboMaker ? "col-span-2 row-span-2" : ""
											}`}>
											<IoIosArrowBack
												className='absolute top-4 right-1 text-4xl'
												onClick={() => setOpenComboMaker(!openComboMaker)}
											/>
											<ComboMakerV2 />
										</div>
									) : (
										!openTricklists &&
										!openCaptures && (
											<div
												className='neumorphic  active:neumorphicIn min-h-36 flex h-full w-full flex-col place-content-center place-items-center rounded-lg bg-zinc-800 p-4 text-4xl'
												onClick={() => setOpenComboMaker(!openComboMaker)}>
												<ComboMakerBlueprint
													className='h-24'
													fill={"#d4d4d8"}
												/>
												<div className='mt-[-18px] text-lg font-bold'>
													ComboMaker
												</div>
											</div>
										)
									)}
								</div>

								<>
									{/* <div className='flex flex-col gap-2 rounded-xl bg-zinc-700 p-2'>
											<UpdateStatusInput />
										</div> */}
								</>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Home;
