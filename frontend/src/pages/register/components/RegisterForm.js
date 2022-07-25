import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api.js";
function RegisterForm() {
	const [validPassword, setValidPassword] = useState(false);
	const [isVisible, setIsVisible] = useState();
	const [data, setData] = useState();
	const nav = useNavigate();
	const [userData, setUserData] = useState({
		username: null,
		first_name: null,
		last_name: null,
		email: null,
		password: null,
		confirmPassword: null,
	});

	const handleRegister = async (e) => {
		e.preventDefault();
		console.log("Attempting to Register");
		// if (
		// 	userData.password !== null &&
		// 	userData.email !== null &&
		// 	userData.username !== null &&
		// 	userData.first_name !== null &&
		// 	userData.last_name !== null
		// ) {
		try {
			console.log("Trying CREATE");
			api
				.post("/user", {
					username: userData.username,
					first_name: userData.first_name,
					last_name: userData.last_name,
					email: userData.email,
					password: userData.password,
				})
				.then((createdUser) => {
					setData(createdUser.data);
					return createdUser;
				})
				.then((createdUser) => {
					if (createdUser.status === 201) {
						nav("/login");
					}
				});
		} catch (err) {
			console.log(err);
			// }
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

	return (
		<div className='w-[80vw]'>
			<form
				onSubmit={handleRegister}
				className='flex w-full flex-col gap-2 text-zinc-800'>
				<input
					id='username'
					className='rounded-xl bg-zinc-200 p-2'
					onChange={(e) =>
						setUserData({ ...userData, username: e.target.value })
					}
					type='text'
					placeholder='username'
				/>
				<div className='grid grid-cols-2 gap-2'>
					<input
						id='first name'
						className='rounded-xl bg-zinc-200 p-2'
						onChange={(e) =>
							setUserData({ ...userData, first_name: e.target.value })
						}
						type='text'
						placeholder='first_name'
					/>
					<input
						id='last name'
						className='rounded-xl bg-zinc-200 p-2'
						onChange={(e) =>
							setUserData({ ...userData, last_name: e.target.value })
						}
						type='text'
						placeholder='last_name'
					/>
				</div>
				<input
					id='email'
					className='rounded-xl bg-zinc-200 p-2'
					onChange={(e) => setUserData({ ...userData, email: e.target.value })}
					type='email'
					placeholder='email'
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
				{!validPassword && userData.password && (
					<div className='text-xs text-rose-200'>Passwords Dont Match</div>
				)}
				<div
					className={`text=zinc-700 flex w-fit place-self-center rounded-2xl ${
						validPassword ? "bg-emerald-400" : "bg-zinc-400"
					} p-2 `}>
					<input
						type='button'
						value='Submit'
						name='go'
						disabled={!validPassword ? true : false}></input>
				</div>

				<div className='flex flex-col gap-2 text-zinc-300'>
					{/* {data && JSON.stringify(data[1].user_name)} */}
					<div className='flex place-self-center'>
						{data && JSON.stringify(data)}
					</div>
				</div>
			</form>
		</div>
	);
}

export default RegisterForm;
