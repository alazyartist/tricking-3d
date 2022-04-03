import React from "react";
import AppBackground from "../components/AppBackground";
import Header from "../components/Header";
import Instructions from "../components/Instructions";
import { Link } from "react-router-dom";
function InstructionsPage() {
	return (
		<AppBackground>
			<Header />
			<div className='mt-14 flex flex-col place-content-center'>
				<div className='m-4 flex place-content-center justify-center rounded-2xl bg-zinc-700 text-zinc-300 md:w-2/3'>
					<Instructions />
				</div>
				<Link
					to='/3d/sandbox'
					id='start-button'
					className='focus:shadow-outline font-inter m-4 mt-0 flex h-12 place-content-center place-items-center rounded-lg bg-indigo-600 text-center text-xl font-semibold
								text-indigo-100 transition-colors duration-500 hover:bg-indigo-700'>
					Enter Sandbox
				</Link>
			</div>
		</AppBackground>
	);
}

export default InstructionsPage;
