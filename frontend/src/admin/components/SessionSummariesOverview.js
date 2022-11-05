import React from "react";
import { useGetAllSessions } from "../../api/useSessionSummaries";
import useUserInfoByUUID from "../../api/useUserInfoById";

const SessionSummariesOverview = () => {
	const { data: sessions } = useGetAllSessions();
	console.log(sessions);
	return (
		<div className='flex flex-col place-items-center text-xs'>
			<div className=' rounded-md bg-zinc-700 p-2 font-titan text-lg font-thin text-zinc-300'>
				Sessions in Queue
			</div>
			<div className='flex w-[70vw] flex-col gap-1'>
				{sessions?.data?.map((s) => (
					<SessionDisplay s={s} />
				))}
			</div>
		</div>
	);
};

export default SessionSummariesOverview;

const SessionDisplay = ({ s }) => {
	const { data: u } = useUserInfoByUUID(s.user_id);
	console.log("u", u);
	return (
		<div className='mt-2 flex place-content-center place-items-center gap-2 rounded-md bg-zinc-700 p-1'>
			<div>{s?.name}</div>
			<div>{s?.sessionDate}</div>
			<div className='flex place-items-center gap-1'>
				<div>
					{s?.status === "In Queue" && (
						<div className='h-6 w-6 rounded-full bg-amber-600' />
					)}
				</div>
				<div>
					<img
						className='h-6 w-6 rounded-full'
						src={
							u?.profilePic !== null
								? `/${u?.uuid}/${u?.profilePic}`
								: `./noimg.jpeg`
						}
					/>
				</div>
			</div>
		</div>
	);
};
