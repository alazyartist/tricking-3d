import React from "react";

import MultiDonateButton from "../info/MultiDonateButton";

function DonateText() {
	return (
		<div className='m-4 place-content-center place-items-center rounded-xl bg-gradient-to-b from-emerald-600 to-emerald-700 p-4 pb-0'>
			<div className='font-inter text-center text-2xl font-bold text-zinc-300'>
				Help Support the Project!
			</div>
			<div
				id='donate-flex'
				className='m-4 mt-1 flex flex-col place-content-center place-items-center rounded-xl md:flex-row '>
				<div className='font-inter pb-2 text-sm font-light text-zinc-300 md:pr-4'>
					It is our goal to keep this project
					<span className='font-extrabold'> free to use</span> for as long as
					possible.
				</div>
				<MultiDonateButton />
			</div>
			<div className='font-inter px-4 pb-2 text-sm font-light text-zinc-300'>
				In order to do that there is some overhead that needs to be taken care
				of.
			</div>
			<div className='font-inter px-4 pb-4 text-sm font-light text-zinc-300'>
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
