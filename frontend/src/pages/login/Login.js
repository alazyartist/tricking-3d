import React, { useEffect } from "react";
import LoginForm from "./components/LoginForm";

function Login() {
	return (
		<div className='flex h-screen w-full flex-col place-content-center place-items-center gap-3 font-inter text-zinc-300'>
			<div className='rounded-lg bg-zinc-700 bg-opacity-30 p-4'>
				<LoginForm />
			</div>
			<div className='fixed top-[50%] left-[5%] z-[-2] h-40 w-40 rounded-full bg-gradient-to-tr from-sky-500 to-teal-300' />
			<div className='fixed top-[60%] left-[70%] z-[-2] h-40 w-40 rounded-full bg-gradient-to-tr from-sky-300 to-teal-600' />
			<div className='fixed top-[20%] left-[40%] z-[-2] h-40 w-40 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-300' />
		</div>
	);
}

export default Login;
