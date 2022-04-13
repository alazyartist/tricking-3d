import React from "react";
import { FaCcPaypal } from "react-icons/fa";
import { SiKofi } from "react-icons/si";
function KoFiDonate() {
	return (
		<div id='dontate-button-container' className='flex place-content-center'>
			<a
				className='font-inter m-2 flex place-items-center justify-center rounded-xl bg-inherit p-2 text-xl font-black text-zinc-700'
				href='https://ko-fi.com/tricking3d'>
				<SiKofi className='mr-1 h-8 w-8' />
				Donate
			</a>
		</div>
	);
}

export default KoFiDonate;
