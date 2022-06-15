import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../components/login/RegisterForm";

function Register() {
	return (
		<div className='mt-14 flex w-full flex-col place-content-center place-items-center gap-3 font-inter text-zinc-300'>
			<Link to='/login'>Register</Link>
			<RegisterForm />
		</div>
	);
}

export default Register;
