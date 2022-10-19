import React from "react";
import { useLocation, useParams } from "react-router-dom";

const SessionPage = () => {
	const { sessionID } = useParams();
	const location = useLocation();
	console.log(location.state);
	// const { ably, session } = location?.state;
	return (
		<div className='flex h-screen w-screen flex-col place-items-center p-2 pt-14 text-zinc-300'>
			<div className=' font-inter text-3xl font-black '>SessionPage</div>
			<div className='neumorphicIn w-[70vw] rounded-xl p-4  font-bold text-zinc-300'>
				{sessionID}
			</div>
		</div>
	);
};

export default SessionPage;
