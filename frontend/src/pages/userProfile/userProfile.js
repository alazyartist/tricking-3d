import React, { useState, useEffect, lazy, Suspense } from "react";
import { MdOutlineClose } from "../../data/icons/MdIcons";
import { useParams } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import useUserInfoByUUID from "../../api/useUserInfoById";
import { useUserStore } from "../../store/userStore";
import ProfileInfoCard from "./components/ProfileInfoCard";
import ProfileInfoCardEditable from "./components/ProfileInfoCardEditable";
import TricklistsAndClamiedContainer from "./components/TricklistsAndClaimedContainer";
import ProfileSessionInfo from "./components/ProfileSessionInfo";

const UserAvatarDisplay = lazy(() => import("./components/UserAvatarDisplay"));
const UserProfile = () => {
	const { uuid } = useParams();
	const { uuid: loggedInUUID } = useUserStore((s) => s.userInfo);
	const { data: profileInfo } = useUserInfoByUUID(uuid);
	const [editing, setEditing] = useState(false);
	const [pageLoaded, setPageLoaded] = useState(false);
	const [activeSummary, setActiveSummary] = useState();
	const editView = useTransition(editing, {
		from: { top: -400, opacity: 0 },
		enter: { top: 0, opacity: 100 },
		leave: { top: -400 },
		reverse: editing,
		config: { durration: 100, tension: 260, friction: 50 },
		exitBeforeEnter: true,
	});
	const isUsersPage = uuid === loggedInUUID;
	const [activeView, setActiveView] = useState("Stats");
	useEffect(() => {
		console.log(profileInfo);
		console.log(activeSummary);
		// window.addEventListener("load", setPageLoaded(true));
		// return window.removeEventListener("load", setPageLoaded(true));
	}, [profileInfo]);

	return (
		<div className='flex w-full flex-col place-items-center p-2 font-inter text-zinc-300'>
			<div className='flex flex-col'>
				{editView((styles, editing) =>
					editing ? (
						<animated.div
							style={styles}
							className='relative flex flex-col place-items-center gap-2'>
							<ProfileInfoCardEditable
								setEditing={setEditing}
								userInfo={profileInfo}
							/>
							{isUsersPage && (
								<>
									{editing}
									<div
										className='flex place-content-center place-items-center gap-1'
										onClick={() => setEditing(!editing)}>
										<MdOutlineClose /> <div>Close</div>
									</div>
								</>
							)}
						</animated.div>
					) : (
						<animated.div
							style={styles}
							className='relative flex flex-col place-items-center gap-2'>
							<ProfileInfoCard userInfo={profileInfo} />
							{isUsersPage && (
								<>
									{editing}
									<div onClick={() => setEditing(!editing)}>Edit Info</div>
								</>
							)}
						</animated.div>
					)
				)}
			</div>

			<div className='flex w-full flex-col place-items-center gap-4 rounded-lg p-2'>
				<div className='h-[40vh] w-full rounded-lg bg-zinc-700 bg-opacity-20 p-2'>
					{activeView === "Stats" ? (
						<div onClick={() => setActiveView("Sessions")}>Overall Stats</div>
					) : null}
					{activeView === "Sessions" ? (
						<div>
							<span onClick={() => setActiveView("Stats")}>Sessions</span>
							{profileInfo.SessionSummaries.map((summary) => (
								<div onClick={() => setActiveSummary(summary)}>
									{summary.name}
								</div>
							))}
						</div>
					) : null}
				</div>
				<div className='h-[20vh] w-full rounded-lg bg-zinc-700 bg-opacity-20 p-2'>
					{activeView === "Stats" ? (
						<div onClick={() => setActiveView("Sessions")}>
							Last Session Stats
						</div>
					) : null}
					{activeView === "Sessions" ? (
						<div
							className='no-scrollbar relative h-full w-full overflow-hidden overflow-y-scroll'
							onClick={() => setActiveView("Stats")}>
							<div className='sticky top-0 w-[100%] bg-zinc-800 bg-opacity-70'>
								Selected Session Stats
							</div>
							<ProfileSessionInfo summary={activeSummary} />
						</div>
					) : null}
				</div>
				{/* <TricklistsAndClamiedContainer
					profileuuid={uuid}
					MyTricklists={profileInfo?.MyTricklists}
					ClaimedCombos={profileInfo?.CombosClaimed}
					ClaimedTricks={profileInfo?.TricksClaimed}
				/> */}
			</div>
		</div>
	);
};

export default UserProfile;
