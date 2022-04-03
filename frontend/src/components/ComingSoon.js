import React from "react";
import AppBackground from "./AppBackground";
import Header from "./Header";
import PaypalDonate from "./info/PaypalDonate";

function ComingSoon() {
	return (
		<>
			<Header />
			<AppBackground>
				<h1 className='font-inter mt-14 p-4 text-center text-6xl text-zinc-300 md:text-9xl'>
					ComingSoon
				</h1>
				<p className='font-inter p-4 text-center text-base text-zinc-300 md:text-2xl'>
					The page you have requested is still under development and is not
					ready to be seen.
				</p>
				<div className=' flex h-[15vh] w-full place-content-center bg-[url(https://source.unsplash.com/DuHKoV44prg)] bg-cover bg-left bg-no-repeat md:h-[40vh]'></div>
				<div className='flex place-content-center place-items-center p-4'>
					<p className='font-inter mr-2 text-center text-xl font-black text-zinc-300'>
						Help Speed Up Development
					</p>
					<div className='rounded-xl bg-zinc-300'>
						<PaypalDonate />
					</div>
				</div>
			</AppBackground>
		</>
	);
}

export default ComingSoon;
