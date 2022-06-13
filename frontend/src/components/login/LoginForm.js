import React, { useEffect, useState } from "react";
import api from "../../api/login.js";
function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isVisible, setIsVisible] = useState();
	const [data, setData] = useState();
	const [fetch, setFetch] = useState(true);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await api.post("/user/login", {
					email: email.toString(),
					password: password.toString(),
				});

				setData(response.data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchUsers();
	}, [fetch]);

	return (
		<div className='flex flex-col gap-2 text-zinc-800'>
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
					onClick={() => setIsVisible(!isVisible)}
					className='p-2 text-xs text-white'>
					{!isVisible ? "Show" : "Hide"}
				</button>
			</div>
			<div className='text=zinc-700 flex w-fit place-self-center rounded bg-sky-500 p-2 '>
				<button
					onClick={() => {
						setFetch(!fetch);
						console.log(email, password, fetch);
					}}>
					Submit
				</button>
			</div>
			<div className='flex flex-col gap-2 text-zinc-300'>
				{/* {data && JSON.stringify(data[1].user_name)} */}
				{data && JSON.stringify(data)}
			</div>
		</div>
	);
}

export default LoginForm;
