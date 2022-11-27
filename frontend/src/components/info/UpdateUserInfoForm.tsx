import React, { FormEvent, useEffect, useState } from "react";
import useUserInfo, { useUpdateUserInfo } from "../../api/useUserInfo.js";
export interface UserData {
	username: undefined | string;
	first_name: undefined | string;
	last_name: undefined | string;
	email: undefined | string;
	password: null | undefined | string;
	confirmPassword?: undefined | string;
}
const UpdateUserInfoForm = (setEditing: any) => {
	const [success, setSuccess] = useState(false);
	const [validPassword, setValidPassword] = useState(false);
	const [isVisible, setIsVisible] = useState<Boolean>();
	const [userData, setUserData] = useState<UserData>({
		username: undefined,
		first_name: undefined,
		last_name: undefined,
		email: undefined,
		password: undefined,
		confirmPassword: undefined,
	});
	const [userProfileData, setUserProfileData] = useState({
		age: undefined,
		name: undefined,
		country: undefined,
		state: undefined,
		city: undefined,
	});
	const { data, isFetching, status, error } = useUserInfo();
	const { mutate: updateUserInfo } = useUpdateUserInfo();
	const handleUpdate = async (e: FormEvent) => {
		e.preventDefault();
		try {
			updateUserInfo(userData);
			setSuccess(true);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		const { password, confirmPassword } = userData;
		if (password !== null && password !== "" && password === confirmPassword) {
			setValidPassword(true);
		} else {
			setValidPassword(false);
		}
	}, [userData]);
	useEffect(() => {
		success ? setEditing(false) : setEditing(true);
		// getUserInfo();
		if (status === "success") {
			setUserData({
				password: null,
				username: data?.username,
				first_name: data?.first_name,
				last_name: data?.last_name,
				email: data?.email,
			});
		}
		console.log(data, status, isFetching, error);
	}, [success, data, status, isFetching, error]);

	return (
		<div className='w-[70vw] rounded-xl bg-zinc-800'>
			<form
				onSubmit={handleUpdate}
				className='flex w-full flex-col gap-2 text-zinc-800'>
				<input
					id='username'
					className='rounded-xl bg-zinc-200 p-2'
					onChange={(e) =>
						setUserData({ ...userData, username: e.target.value })
					}
					type='text'
					value={userData.username}
					placeholder={"username"}
				/>
				<div className='grid grid-cols-2 gap-2'>
					<input
						id='first name'
						className='rounded-xl bg-zinc-200 p-2'
						onChange={(e) =>
							setUserData({ ...userData, first_name: e.target.value })
						}
						type='text'
						value={userData.first_name}
						placeholder={"first_name"}
					/>
					<input
						id='last name'
						className='rounded-xl bg-zinc-200 p-2'
						onChange={(e) =>
							setUserData({ ...userData, last_name: e.target.value })
						}
						type='text'
						placeholder={"last_name"}
						value={userData.last_name}
					/>
				</div>
				<input
					id='email'
					className='rounded-xl bg-zinc-200 p-2'
					onChange={(e) => setUserData({ ...userData, email: e.target.value })}
					type='email'
					placeholder={"email"}
					value={userData.email}
				/>
				<div className='w-full'>
					<input
						className='w-full rounded-xl bg-zinc-200 p-2'
						onChange={(e) =>
							setUserData({ ...userData, password: e.target.value })
						}
						type={isVisible ? "text" : "password"}
						placeholder='password'
					/>
				</div>
				<div>
					<input
						className='w-full rounded-xl bg-zinc-200 p-2'
						onChange={(e) =>
							setUserData({ ...userData, confirmPassword: e.target.value })
						}
						type={isVisible ? "text" : "password"}
						placeholder='confirm password'
					/>
					<div className='relative right-0'>
						<button
							onClick={() => setIsVisible(!isVisible)}
							className='p-2 text-xs text-white'>
							{!isVisible ? "Show" : "Hide"}
						</button>
					</div>
				</div>
				{!validPassword && (
					<div className='flex place-self-center text-xs text-rose-200'>
						Enter Password to Save
					</div>
				)}
				{!validPassword && userData.password && (
					<div className='flex place-self-center text-xs text-rose-200'>
						Passwords Dont Match
					</div>
				)}
				<div
					className={`text=zinc-700 flex w-fit place-self-center rounded-2xl ${
						validPassword ? "bg-emerald-400" : "bg-zinc-400"
					} p-2 `}>
					<button disabled={!validPassword ? true : false}>Save</button>
				</div>

				<div className='flex flex-col gap-2 text-zinc-300'>
					{/* {data && JSON.stringify(data[1].user_name)} */}
					<div className='flex place-self-center'>
						{data && JSON.stringify(data.message)}
					</div>
				</div>
			</form>
		</div>
	);
};

export default UpdateUserInfoForm;
