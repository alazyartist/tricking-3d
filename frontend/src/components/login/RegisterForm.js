import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api.js";
function RegisterForm() {
	const [success, setSuccess] = useState(false);
	const [validPassword, setValidPassword] = useState(false);
	const [isVisible, setIsVisible] = useState();
	const [data, setData] = useState();
	const nav = useNavigate();
	const [userData, setUserData] = useState({
		user_name: "",
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			const createUser = await api.post("/user", {
				username: userData.user_name,
				first_name: userData.first_name,
				last_name: userData.last_name,
				email: userData.email,
				password: userData.password,
			});
			setData(createUser.data);
			if (createUser) return setSuccess(true);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		const { password, confirmPassword } = userData;
		if (password !== "" && password === confirmPassword) {
			setValidPassword(true);
		} else {
			setValidPassword(false);
		}
	}, [userData]);

	useEffect(() => {
		if (success === true) {
			nav("/login");
		}
	}, [success, nav]);
	return (
		<div className='w-[80vw]'>
			<form
				onSubmit={handleRegister}
				className='flex w-full flex-col gap-2 text-zinc-800'>
				<input
					id='user_name'
					className='rounded-xl bg-zinc-200 p-2'
					onChange={(e) =>
						setUserData({ ...userData, user_name: e.target.value })
					}
					type='text'
					placeholder='username'
				/>
				<div className='flex gap-2'>
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
				<div>
					<input
						className='rounded-xl bg-zinc-200 p-2'
						onChange={(e) =>
							setUserData({ ...userData, password: e.target.value })
						}
						type={isVisible ? "text" : "password"}
						placeholder='password'
					/>
					<button
						onClick={() => setIsVisible(!isVisible)}
						className='p-2 text-xs text-white'>
						{!isVisible ? "Show" : "Hide"}
					</button>
				</div>
				<div>
					<input
						className='rounded-xl bg-zinc-200 p-2'
						onChange={(e) =>
							setUserData({ ...userData, confirmPassword: e.target.value })
						}
						type={isVisible ? "text" : "password"}
						placeholder='confirm password'
					/>
					<button
						onClick={() => setIsVisible(!isVisible)}
						className='p-2 text-xs text-white'>
						{!isVisible ? "Show" : "Hide"}
					</button>
				</div>
				{!validPassword && (
					<div className='text-xs text-rose-200'>Passwords Dont Match</div>
				)}
				<div
					className={`text=zinc-700 flex w-fit place-self-center rounded-2xl ${
						validPassword ? "bg-emerald-400" : "bg-zinc-400"
					} p-2 `}>
					<button
						onClick={() => setSuccess(true)}
						disabled={!validPassword ? true : false}>
						Submit
					</button>
				</div>

				<div className='flex flex-col gap-2 text-zinc-300'>
					{/* {data && JSON.stringify(data[1].user_name)} */}
					{data && JSON.stringify(data)}
					<div className='w-[80vw] text-zinc-300'>
						{userData &&
							Object.keys(userData).map((key) => (
								<h1>{JSON.stringify(userData[key])}</h1>
							))}
					</div>
				</div>
			</form>
		</div>
	);
}

export default RegisterForm;
