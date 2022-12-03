import React from "react";
import Link from "next/link";
import RegisterForm from "./components/RegisterForm";

function Register() {
	return (
		<div className='flex h-screen w-full flex-col place-content-center place-items-center gap-3 font-inter text-zinc-300'>
			<div className='rounded-lg bg-zinc-700 bg-opacity-30 p-4 backdrop-blur-md'>
				<RegisterForm />
			</div>
			<div className='fixed top-[35%] left-[15%] z-[-2] h-40 w-40 rounded-full bg-gradient-to-tr from-sky-500 to-teal-300 blur-md' />
			<div className='fixed top-[20%] left-[70%] z-[-2] h-40 w-40 rounded-full bg-gradient-to-tr from-sky-300 to-teal-600 blur-md'>
				Trick
			</div>
			<div className='fixed top-[60%] left-[30%] z-[-2] h-40 w-40 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-300 blur-md' />
		</div>
	);
}

export default Register;
