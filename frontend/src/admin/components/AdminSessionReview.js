import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useGetSessionDetailsbySessionid } from "../../api/useSessionSummaries";
import ActiveClipDisplay from "./sessionreview/ActiveClipDisplay";
import CommandBar from "./sessionreview/CommandBar";
import MakeNewTrickModal from "./sessionreview/MakeNewTrickModal";
import SessionDetailDisplay from "./sessionreview/SessionDetailDisplay";
import SessionSourceDisplay from "./sessionreview/SessionSourceDisplay";
import { useSessionSummariesStore } from "./sessionreview/SessionSummaryStore";

const AdminSessionReview = () => {
	const { sessionid } = useParams();
	const { data } = useGetSessionDetailsbySessionid(sessionid);
	const setVidsrc = useSessionSummariesStore((s) => s.setVidsrc);
	const setSessionid = useSessionSummariesStore((s) => s.setSessionid);
	const setSessionSources = useSessionSummariesStore(
		(s) => s.setSessionSources
	);
	const sessionDetails = data?.data;
	// console.log(sessionDetails);
	useEffect(() => {
		setSessionid(sessionid);
	}, [sessionid]);
	useEffect(() => {
		setSessionSources(sessionDetails?.SessionSources);
		setVidsrc(sessionDetails?.SessionSources[0]?.vidsrc);
	}, [sessionDetails]);
	return (
		<div className='no-scrollbar fixed top-0 left-0 h-screen w-screen overflow-scroll'>
			<Link to={-1}>
				<IoIosArrowBack className='absolute top-4 left-2 text-3xl text-zinc-300' />
			</Link>
			{sessionDetails && (
				<div className='mt-4 flex flex-col place-items-center text-zinc-300 md:mt-8'>
					<div>{sessionDetails?.name}</div>
					<div className='absolute left-2  top-[40vh] w-[135px] md:top-[20vh]'>
						<SessionDetailDisplay sessionDetails={sessionDetails} />

						{sessionDetails?.SessionSources?.map((source) => (
							<SessionSourceDisplay key={source.srcid} source={source} />
						))}
					</div>
				</div>
			)}
			<MakeNewTrickModal />
			<ActiveClipDisplay />
			<CommandBar />
		</div>
	);
};

export default AdminSessionReview;
