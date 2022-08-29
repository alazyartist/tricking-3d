import React from "react";
import { useParams } from "react-router-dom";
import useUserInfoByUUID from "../../api/useUserInfoById";

const UserProfile = () => {
	const { uuid } = useParams();

	const { data } = useUserInfoByUUID(uuid);

	return (
		<div className='flex flex-col place-content-center place-items-center pt-[3.4rem] text-zinc-300'>
			<div>{JSON.stringify(data)}</div>
			<div>{uuid}</div>
			<div>UserProfile</div>
		</div>
	);
};

export default UserProfile;
