import React from "react";
import { FaDiscord } from "react-icons/fa";

function DiscordLink() {
	return (
		<div className='flex flex-col'>
			<h1 className='text-center text-sm font-semibold text-gray-400'>
				Join the discord to Give Feedback <br /> or Report Issues{" "}
			</h1>
			<a className='place-self-center' href='https://discord.gg/rEkMzdRJ'>
				<FaDiscord className=' place-self-center rounded-full p-[4px] text-5xl text-indigo-400 hover:bg-gray-400 hover:text-indigo-700' />
			</a>
		</div>
	);
}

export default DiscordLink;
