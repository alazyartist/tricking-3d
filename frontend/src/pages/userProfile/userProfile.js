import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import useUserInfoByUUID from "../../api/useUserInfoById";
import { useUserStore } from "../../store/userStore";
import ProfileInfoCard from "./components/ProfileInfoCard";
import ProfileInfoCardEditable from "./components/ProfileInfoCardEditable";
import TricklistsAndClamiedContainer from "./components/TricklistsAndClaimedContainer";
import UserAvatarDisplay from "./components/UserAvatarDisplay";

const UserProfile = () => {
	const { uuid } = useParams();
	const { uuid: loggedInUUID } = useUserStore((s) => s.userInfo);
	const { data: profileInfo } = useUserInfoByUUID(uuid);
	console.log(profileInfo);
	const [editing, setEditing] = useState(false);
	const editView = useTransition(editing, {
		from: { top: -400, opacity: 0 },
		enter: { top: 0, opacity: 100 },
		leave: { top: -400 },
		reverse: editing,
		config: { durration: 300, tension: 260, friction: 50 },
		exitBeforeEnter: true,
	});
	return (
		<div className='place-content-center place-items-center m-4 mb-14 flex h-full flex-col pt-[3.4rem] font-inter text-zinc-300'>
			<div className=' flex flex-row gap-4 pb-4'>
				<div className='flex flex-col'>
					{editView((styles, editing) =>
						editing ? (
							<animated.div
								style={styles}
								className='place-items-center relative flex flex-col gap-2'>
								<ProfileInfoCardEditable
									setEditing={setEditing}
									userInfo={profileInfo}
								/>
								{uuid === loggedInUUID && (
									<>
										{editing}
										<div
											className='place-items-center place-content-center flex gap-1'
											onClick={() => setEditing(!editing)}>
											<MdOutlineClose /> <div>Close</div>
										</div>
									</>
								)}
							</animated.div>
						) : (
							<animated.div
								style={styles}
								className='place-items-center relative flex flex-col gap-2'>
								<ProfileInfoCard userInfo={profileInfo} />
								{uuid === loggedInUUID && (
									<>
										{editing}
										<div onClick={() => setEditing(!editing)}>Edit Info</div>
									</>
								)}
							</animated.div>
						)
					)}
				</div>

				<UserAvatarDisplay />
			</div>
			<TricklistsAndClamiedContainer
				profileuuid={uuid}
				MyTricklists={profileInfo?.MyTricklists}
				Claimed={profileInfo?.CombosClaimed}
			/>
		</div>
	);
};

export default UserProfile;
