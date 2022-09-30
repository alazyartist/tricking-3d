import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "../../../api/useLogin.js";
import useLocalStorage from "../../../hooks/useLocalStorage.js";
import { useUserStore } from "../../../store/userStore.js";
function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isVisible, setIsVisible] = useState();
	const [data, setData] = useState();
	const [loginError, setLoginError] = useState();
	const accessTokenStore = useUserStore((s) => s.accessToken);
	const user = useUserStore((s) => s.user);
	const [persist, setPersist] = useLocalStorage("persist", false);
	const nav = useNavigate();
	const location = useLocation();
	const from = "/home";
	const { mutateAsync: login, data: response, error } = useLogin();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await login({
				email: email.toString(),
				password: password.toString(),
			});
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		setLoginError(error?.response?.data?.message);
	}, [error]);

	useEffect(() => {
		if (response?.message === "You are logged in!") {
			nav("/home");
		}
	}, [response]);
	useEffect(() => {
		console.log(response);
		console.log(accessTokenStore, user, from);
	}, [accessTokenStore, response, user, from]);

	const togglePersist = () => {
		const bool = JSON.parse(localStorage.getItem("persist"));
		setPersist(!bool);
	};
	// useEffect(() => {
	// 	const fetchUsers = async () => {
	// 		try {
	// 			const response = await api.post("/user/login", {
	// 				email: email.toString(),
	// 				password: password.toString(),
	// 			});

	// 			setData(response.data);
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};
	// 	fetchUsers();
	// }, [fetch]);

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-2 text-zinc-800'>
				<input
					className='rounded-xl bg-zinc-200 p-2'
					onChange={(e) => setEmail(e.target.value)}
					type='email'
				/>
				<div>
					<input
						className='rounded-xl bg-zinc-200 p-2'
						onChange={(e) => setPassword(e.target.value.toString())}
						type={isVisible ? "text" : "password"}
					/>
					<button
						type='button'
						onClick={() => setIsVisible(!isVisible)}
						className='p-2 text-xs text-white'>
						{!isVisible ? "Show" : "Hide"}
					</button>
				</div>
				<div className='flex w-full justify-around'>
					<button
						type='submit'
						className='text=zinc-700 w-fit rounded bg-sky-500 p-2 '>
						Submit
					</button>
					<Link
						className='place-self-end text-base text-zinc-300'
						to='/register'>
						Register
					</Link>
				</div>
				<div className='flex flex-col gap-2 text-zinc-300'>
					{/* {data && JSON.stringify(data[1].user_name)} */}

					{data && JSON.stringify(data.message)}
					{/* <div>{data.accessToken}</div> */}
				</div>
			</form>
			{loginError}
			<div>
				<label htmlFor='persist'>Remember this Device</label>
				<input
					className='mx-2 rounded-2xl bg-red-500'
					id={persist}
					type='checkbox'
					onChange={() => togglePersist()}
					checked={persist}
				/>
			</div>
		</>
	);
}

export default LoginForm;
