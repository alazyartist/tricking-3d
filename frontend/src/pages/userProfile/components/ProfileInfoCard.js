import React from "react";

const ProfileInfoCard = () => {
	return (
		<div className='flex w-fit min-w-[35vw] max-w-[48vw] flex-col place-content-center place-items-center rounded-xl bg-zinc-700 p-2 text-sm'>
			<div>ProfilePic</div>
			<div>Name</div>
			<div>Age</div>
			<div>Country/City</div>
			<div>Status</div>
		</div>
	);
};

export default ProfileInfoCard;
