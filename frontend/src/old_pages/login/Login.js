import React, { useEffect } from "react";
import BackgroundCircles from "../../admin/components/BackgroundCircles";
import LoginForm from "./components/LoginForm";

function Login() {
	return (
		<div className='flex h-screen w-full flex-col place-content-center place-items-center gap-3 font-inter text-zinc-300'>
			<div className='rounded-lg bg-zinc-700 bg-opacity-30 p-4 backdrop-blur-md'>
				<LoginForm />
			</div>
			<BackgroundCircles />
		</div>
	);
}

export default Login;
