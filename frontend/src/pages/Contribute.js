import React from "react";
import Header from "../components/Header";
import PaypalDonate from "../components/info/PaypalDonate";
function Contribute() {
	return (
		<>
			<Header />
			<div
				id='background-div'
				className='flex h-screen w-screen flex-col bg-gradient-to-b from-zinc-900 to-zinc-800'>
				<div
					id='content-container'
					// flex place-items-center justify-center
					className='m-4 mt-14 
                    grid grid-cols-2
                    gap-5 rounded-3xl bg-gradient-to-b from-emerald-600 to-emerald-300 p-2'>
					{/* <div className='w-[40vw]'> */}
					<div className='font-inter  p-2 text-center text-3xl font-bold text-zinc-200 '>
						Design
						<p className='rounded-md bg-zinc-300 p-4 text-left  text-base font-light text-zinc-800'>
							Design:
						</p>
					</div>
					<div className='font-inter p-2 text-center text-3xl font-bold text-zinc-200 '>
						Code
						<p className='rounded-md bg-zinc-300 p-4 text-left  text-base font-light text-zinc-800'>
							Code:
						</p>
					</div>
					<div className='font-inter p-2 text-center text-3xl font-bold text-zinc-200 '>
						Marketing
						<p className='rounded-md bg-zinc-300 p-4 text-left text-base font-light text-zinc-800'>
							Marketing:
						</p>
					</div>
					<div className='font-inter p-2 text-center text-3xl font-bold text-zinc-200 '>
						Theory
						<p className='rounded-md bg-zinc-300 p-4 text-left text-base font-light text-zinc-800'>
							Theory:
						</p>
					</div>
					<div className='col-span-2'>
						<PaypalDonate />
					</div>
				</div>
			</div>
		</>
	);
}

export default Contribute;
