import React, { useState, useEffect, lazy, Suspense } from "react";
import { MdOutlineClose } from "../../data/icons/MdIcons";
import { useParams } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import useUserInfoByUUID from "../../api/useUserInfoById";
import { useUserStore } from "../../store/userStore";
import ProfileInfoCard from "./components/ProfileInfoCard";
import ProfileInfoCardEditable from "./components/ProfileInfoCardEditable";
import TricklistsAndClamiedContainer from "./components/TricklistsAndClaimedContainer";

const UserAvatarDisplay = lazy(() => import("./components/UserAvatarDisplay"));
const UserProfile = () => {
	const { uuid } = useParams();
	const { uuid: loggedInUUID } = useUserStore((s) => s.userInfo);
	const { data: profileInfo } = useUserInfoByUUID(uuid);
	const [editing, setEditing] = useState(false);
	const [pageLoaded, setPageLoaded] = useState(false);
	const editView = useTransition(editing, {
		from: { top: -400, opacity: 0 },
		enter: { top: 0, opacity: 100 },
		leave: { top: -400 },
		reverse: editing,
		config: { durration: 100, tension: 260, friction: 50 },
		exitBeforeEnter: true,
	});
	const isUsersPage = uuid === loggedInUUID;

	useEffect(() => {
		// window.addEventListener("load", setPageLoaded(true));
		// return window.removeEventListener("load", setPageLoaded(true));
	}, []);

	return (
		<div className='m-2 flex w-full flex-col place-items-center font-inter text-zinc-300'>
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

			<div className='flex w-full flex-col place-items-center rounded-lg'>
				<TricklistsAndClamiedContainer
					profileuuid={uuid}
					MyTricklists={profileInfo?.MyTricklists}
					ClaimedCombos={profileInfo?.CombosClaimed}
					ClaimedTricks={profileInfo?.TricksClaimed}
				/>
			</div>
		</div>
	);
};

export default UserProfile;
