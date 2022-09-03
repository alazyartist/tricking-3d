import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useUserInfoByUUID from "../../api/useUserInfoById";
import { useUserStore } from "../../store/userStore";
import ProfileCode from "../dash/components/ProfileCode";
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

	return (
		<div className='place-content-center place-items-center m-4 flex flex-col pt-[3.4rem] font-inter text-zinc-300'>
			<div className=' flex flex-row gap-4 pb-4'>
				<div className='place-items-center flex flex-col gap-2'>
					{!editing && <ProfileInfoCard userInfo={profileInfo} />}
					{editing && (
						<ProfileInfoCardEditable
							setEditing={setEditing}
							userInfo={profileInfo}
						/>
					)}
					{uuid === loggedInUUID && (
						<>
							{editing}
							<div onClick={() => setEditing(!editing)}>Edit Info</div>
						</>
					)}
				</div>
				<UserAvatarDisplay />
			</div>
			<TricklistsAndClamiedContainer
				profileuuid={uuid}
				MyTricklists={profileInfo?.MyTricklists}
				Claimed={profileInfo?.ClaimedTricks}
			/>
		</div>
	);
};

export default UserProfile;
