import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useGetSessionDetailsbySessionid } from "../../api/useSessionSummaries";
import CommandBar from "./sessionreview/CommandBar";
import SessionDetailDisplay from "./sessionreview/SessionDetailDisplay";
import SessionSourceDisplay from "./sessionreview/SessionSourceDisplay";

const AdminSessionReview = () => {
	const { sessionid } = useParams();
	const { data } = useGetSessionDetailsbySessionid(sessionid);
	const sessionDetails = data?.data;
	// console.log(sessionDetails);
	const [playerVisible, setPlayerVisible] = useState(false);
	return (
		<div className='no-scrollbar fixed top-0 left-0 h-screen w-screen overflow-scroll'>
			<Link to={-1}>
				<IoIosArrowBack className='absolute top-4 left-2 text-3xl text-zinc-300' />
			</Link>
			{sessionDetails && (
				<div className='mt-8 flex flex-col place-items-center text-zinc-300'>
					<div>{sessionDetails?.name}</div>
					<div className='absolute left-2 top-[20vh] min-w-[135px]'>
						<SessionDetailDisplay sessionDetails={sessionDetails} />

						{sessionDetails?.SessionSources?.map((source) => (
							<SessionSourceDisplay
								playerVisible={playerVisible}
								setPlayerVisible={setPlayerVisible}
								source={source}
							/>
						))}
					</div>
				</div>
			)}
			<CommandBar />
		</div>
	);
};

export default AdminSessionReview;
