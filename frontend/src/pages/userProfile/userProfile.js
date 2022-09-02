import React from "react";
import { useParams } from "react-router-dom";
import useUserInfoByUUID from "../../api/useUserInfoById";
import ProfileCode from "../dash/components/ProfileCode";
import ProfileInfoCard from "./components/ProfileInfoCard";
import TricklistsAndClamiedContainer from "./components/TricklistsAndClaimedContainer";
import UserAvatarDisplay from "./components/UserAvatarDisplay";

const UserProfile = () => {
	const { uuid } = useParams();

	const { data: profileInfo } = useUserInfoByUUID(uuid);
	console.log(profileInfo);

	return (
		<div className='place-content-center place-items-center m-4 flex flex-col pt-[3.4rem] font-inter text-zinc-300'>
			<div className=' flex flex-row gap-4 pb-4'>
				<ProfileInfoCard userInfo={profileInfo} />
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
