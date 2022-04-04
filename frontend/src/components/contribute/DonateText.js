import React from "react";
import PaypalDonate from "../info/PaypalDonate";

function DonateText() {
	return (
		<div className='m-4 place-content-center place-items-center rounded-xl bg-gradient-to-b from-emerald-600 to-emerald-700 p-4 pb-0'>
			<div className='text-center font-inter text-2xl font-bold text-zinc-300'>
				Help Support the Project!
			</div>
			<div
				id='donate-flex'
				className='m-4 mt-1 flex place-content-center place-items-center rounded-xl '>
				<div className='pr-4 font-inter text-sm font-light text-zinc-300'>
					It is our goal to keep this project
					<span className='font-extrabold'> free to use</span> for as long as
					possible.
				</div>
				<div
					id='donate-button-conatiner'
					className='flex h-12 w-32 place-content-center rounded-xl bg-gradient-to-b from-emerald-400 to-emerald-300'>
					<PaypalDonate />
				</div>
			</div>
			<div className='px-4 pb-2 font-inter text-sm font-light text-zinc-300'>
				In order to do that there is some overhead that needs to be taken care
				of.
			</div>
			<div className='px-4 pb-4 font-inter text-sm font-light text-zinc-300'>
				Your donations will help to fund the servers, and the development team
				that is making this project possible.
				<div className='pt-2 text-[.7rem]'>
					Everyone currently works for free so anything helps!
				</div>
			</div>
		</div>
	);
}

export default DonateText;
