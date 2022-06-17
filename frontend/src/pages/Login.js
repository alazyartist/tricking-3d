import React, { useEffect } from "react";
import LoginForm from "../components/login/LoginForm";

function Login() {
	return (
		<div className='mt-14 flex w-full flex-col place-content-center place-items-center gap-3 font-inter text-zinc-300'>
			<div className=''>Login</div>
			<LoginForm />
		</div>
	);
}

export default Login;
