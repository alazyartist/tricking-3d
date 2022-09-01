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
		<div className='m-4 flex flex-col place-content-center place-items-center pt-[3.4rem] font-inter text-zinc-300'>
			<div>UserProfile</div>
			<div>{profileInfo?.first_name + " " + profileInfo?.last_name}</div>
			<div className=' flex flex-row gap-4 pb-4'>
				<ProfileInfoCard userInfo={profileInfo} />
				<UserAvatarDisplay />
			</div>
			<TricklistsAndClamiedContainer MyTricklists={profileInfo?.MyTricklists} />
		</div>
	);
};

export default UserProfile;
