import React, { useState } from "react";
import { useUpdateProfileInfo } from "../../../api/useUpdateProfileInfo";

const ProfileInfoCardEditable = ({ userInfo, setEditing }) => {
	const [editedInfo, setEditedInfo] = useState({
		username: userInfo?.username,
		name: userInfo?.Profile?.name || userInfo?.first_name + userInfo?.last_name,
		country: userInfo?.Profile?.country,
		city: userInfo?.Profile?.city,
		state: userInfo?.Profile?.state,
		age: userInfo?.Profile?.age,
		uuid: userInfo?.uuid,
	});
	const { mutate: updateProfileInfo } = useUpdateProfileInfo();

	const handleSave = () => {
		updateProfileInfo({ ...editedInfo });
		setEditing(false);
	};

	return (
		<form onSubmit={handleSave} className='flex h-full flex-col'>
			<img
				alt='user profile'
				src={
					userInfo?.profilePic
						? `/images/${userInfo?.uuid}/${userInfo?.profilePic}`
						: `/images/noimg.jpeg`
				}
				className='relative top-8 left-2 h-12 w-12 rounded-full'
			/>
			<div className='flex w-fit min-w-[35vw] max-w-[48vw] flex-col place-content-center place-items-start gap-2 rounded-xl bg-zinc-100 p-2 pt-2 text-sm text-zinc-900'>
				<div className='pl-14 font-bold'>
					<input
						type={"text"}
						className='w-[100%] bg-inherit text-center font-bold'
						value={editedInfo.username}
						onChange={(e) => {
							setEditedInfo({ ...editedInfo, username: e.target.value });
						}}
					/>
					<div className='flex flex-col text-center text-xs font-normal'>
						<div className='flex'>
							<input
								type={"text"}
								className='w-[100%] bg-inherit text-center '
								placeholder='Country'
								value={editedInfo?.country}
								onChange={(e) => {
									setEditedInfo({ ...editedInfo, country: e.target.value });
								}}
							/>

							<input
								type={"text"}
								className='w-[100%] bg-inherit text-center '
								placeholder='State'
								value={editedInfo?.state}
								onChange={(e) => {
									setEditedInfo({ ...editedInfo, state: e.target.value });
								}}
							/>
						</div>
						<input
							type={"text"}
							className='w-[100%] bg-inherit text-center '
							placeholder='City'
							value={editedInfo?.city}
							onChange={(e) => {
								setEditedInfo({ ...editedInfo, city: e.target.value });
							}}
						/>
					</div>
				</div>
				<div className='flex w-[full] justify-between'>
					<input
						type={"text"}
						className='w-4/5 bg-inherit text-left '
						value={editedInfo?.name}
						onChange={(e) => {
							setEditedInfo({ ...editedInfo, name: e.target.value });
						}}
					/>{" "}
					<input
						type={"text"}
						placeholder='Age'
						className='w-1/5 bg-inherit text-right '
						value={editedInfo?.age}
						onChange={(e) => {
							setEditedInfo({ ...editedInfo, age: e.target.value });
						}}
					/>
				</div>
				<div className=''>Level</div>
				{/* BIFW */}
				{userInfo?.Profile?.brands && (
					<div className='w-full rounded-md bg-zinc-800 p-2'>
						Brands I Fuck With
					</div>
				)}
				{/* Status */}
				<div className='w-full rounded-md bg-zinc-800 p-2 text-zinc-300 '>
					{userInfo?.Profile?.status || "I'm New Here"}
				</div>
				<div className='flex w-full place-content-center'>
					<button>Save</button>
				</div>
			</div>
		</form>
	);
};

export default ProfileInfoCardEditable;
