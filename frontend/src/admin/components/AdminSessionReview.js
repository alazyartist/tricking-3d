import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { useGetSessionDetailsbySessionid } from "../../api/useSessionSummaries";

const AdminSessionReview = () => {
	const { sessionid } = useParams();
	const { data } = useGetSessionDetailsbySessionid(sessionid);
	const sessionDetails = data?.data;
	// console.log(sessionDetails);
	const [playerVisible, setPlayerVisible] = useState(false);
	return (
		<div>
			<Link to={-1}>
				<IoIosArrowBack className='absolute top-4 left-2 text-3xl text-zinc-300' />
			</Link>
			{sessionDetails && (
				<div className='mt-8 flex flex-col place-items-center text-zinc-300'>
					<div>{sessionDetails?.name}</div>
					<div className='absolute left-2 top-[20vh]'>
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
		</div>
	);
};

export default AdminSessionReview;

const SessionSourceDisplay = ({ source, playerVisible, setPlayerVisible }) => {
	const vidsrcRegex = /(^(\w+).*\.com\/watch\?v=)|(^(\w+.*)\/videos\/)/g;
	return (
		<div key={source.srcid + "1"} className=''>
			{playerVisible === source?.vidsrc ? (
				<div className='absolute top-[-12vh] left-[15vw] w-[80vw]'>
					<div onClick={() => setPlayerVisible(false)}>
						{source?.vidsrc.replace(vidsrcRegex, "")}
					</div>
					<ReactPlayer
						config={{ facebook: { appId: "508164441188790" } }}
						id={"video"}
						controls={false}
						muted
						width={"70vw"}
						height={"39.5vw"}
						loop
						playsInline
						className={`h-full w-full`}
						url={source?.vidsrc}
					/>
				</div>
			) : (
				<div
					key={source?.vidsrc.replace(vidsrcRegex, "")}
					className='flex flex-col gap-4 rounded-md p-2 pl-0'>
					<div
						className='rounded-md rounded-l-none bg-zinc-500 p-2'
						onClick={() => setPlayerVisible(source.vidsrc)}>
						{source?.vidsrc.replace(vidsrcRegex, "")}
					</div>
				</div>
			)}
		</div>
	);
};
