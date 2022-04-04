import React from "react";
import { Outlet } from "react-router-dom";
import AppBackground from "../components/AppBackground";
import ContributeNavBar from "../components/contribute/ContributeNavBar";
import DonateText from "../components/contribute/DonateText";
import Header from "../components/Header";
import PaypalDonate from "../components/info/PaypalDonate";
function Contribute() {
	return (
		<>
			<Header />
			<div className='mt-14 px-4 font-inter text-3xl font-bold text-zinc-300'>
				I can help with...
			</div>
			<ContributeNavBar />
			<div
				id='outlet-container'
				className='flex place-content-center place-items-center text-zinc-300'>
				<Outlet />
			</div>
			<div
				id='donate-flex'
				className='m-4 flex flex-col place-content-center place-items-center rounded-xl bg-gradient-to-b from-emerald-600 to-emerald-700 p-4'>
				<div
					id='donate-button-conatiner'
					className='flex h-12 w-32 place-content-center rounded-xl bg-gradient-to-b from-emerald-400 to-emerald-300'>
					<PaypalDonate />
				</div>
				<DonateText />
			</div>
			<AppBackground />
		</>
	);
}

export default Contribute;
