import React, { useState } from "react";
import { useChangeProfilePic } from "../../api/useUserInfo";
import { useUserStore } from "../../store/userStore";
const UpdateProfilePic = () => {
	const [file, setFile] = useState();
	const { uuid } = useUserStore((s) => s.userInfo);
	const [filename, setFilename] = useState("Change Profile Pic");
	const { mutate: changePic } = useChangeProfilePic();
	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", file);
		formData.append("uuid", uuid);
		changePic(formData);
	};
	const onChange = (e) => {
		setFile(e.target.files[0]);
		setFilename(e.target.files[0].name);
	};

	return (
		<>
			<form id='form' className='flex gap-2' onSubmit={onSubmit}>
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
