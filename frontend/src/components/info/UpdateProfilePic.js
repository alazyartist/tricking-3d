import React, { useEffect, useState } from "react";
import useApiCreds from "../../hooks/useApiCreds";
import { useUserStore } from "../../store/userStore";
const UpdateProfilePic = () => {
	const apiPrivate = useApiCreds();
	const [file, setFile] = useState();
	const { uuid } = useUserStore((s) => s.userInfo);
	const userInfo = useUserStore((s) => s.userInfo);
	const setUserInfo = useUserStore((s) => s.setUserInfo);
	const [filename, setFilename] = useState("Change Profile Pic");

	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", file);
		formData.append("uuid", uuid);

		try {
			const response = await apiPrivate.post(
				"loggedIn/user/profilePic",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						"Content-Type": "application/json",
					},
				}
			);
			console.log(response.data.filePath);
			setUserInfo({ ...userInfo, profilePic: response.data.fileName });
		} catch (err) {
			console.log(err);
		}
	};
	const onChange = (e) => {
		setFile(e.target.files[0]);
		setFilename(e.target.files[0].name);
	};

	return (
		<>
			<form id='form' className='flex' onSubmit={onSubmit}>
				<label
					className='mb-2 flex w-3/4 place-content-center place-items-center rounded-xl bg-zinc-800 p-2 text-sm text-zinc-300'
					placeholder='Change Profile Pic'
					htmlFor='profilePic'>
					{filename}
					<input
						onChange={onChange}
						id={"profilePic"}
						className='hidden'
						type={"file"}
						accept='image/png, image/jpeg'
					/>
				</label>
				<label
					className='mb-2 flex w-1/4 place-content-center place-items-center rounded-xl bg-zinc-800 p-2 text-sm text-zinc-300'
					htmlFor='upload'>
					Upload
					<input id='upload' className='hidden' type={"submit"} />
				</label>
			</form>
		</>
	);
};

export default UpdateProfilePic;
