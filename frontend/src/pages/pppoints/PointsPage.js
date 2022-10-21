import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useAblyStore from "../../hooks/useAblyStore";
import { useUserStore } from "../../store/userStore";
import HostSession from "./components/HostSession";
import LiveSessions from "./components/LiveSessions";
const ably = useAblyStore.getState().ably;
const PointsPage = () => {
	const userInfo = useUserStore((s) => s.userInfo);
	return (
		<div className='flex h-screen w-screen flex-col place-items-center p-2 pt-14 text-zinc-300'>
			<div className=' font-inter text-3xl font-black '>PointsPage</div>
			<div className='neumorphicIn w-[70vw] rounded-xl p-4  font-bold text-zinc-300'>
				<LiveSessions ably={ably} />
			</div>
			<div className='flex gap-5'>
				{userInfo.uuid && <HostSession ably={ably} />}
				{!userInfo.uuid && <Link to='/login'>Login</Link>}
			</div>
		</div>
	);
};

export default PointsPage;
