import React, { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { useGetSessionDetailsbySessionid } from "../../api/useSessionSummaries";

const AdminSessionReview = () => {
	const { sessionid } = useParams();
	const { data } = useGetSessionDetailsbySessionid(sessionid);
	const sessionDetails = data?.data;
	console.log(sessionDetails);
	return (
		<div>
			<Link to={-1}>
				<IoIosArrowBack className='absolute top-4 left-2 text-3xl text-zinc-300' />
			</Link>
			{sessionDetails && (
				<div className='mt-8 flex flex-col place-items-center text-zinc-300'>
					<div>{sessionDetails?.name}</div>
					<div>
						{sessionDetails?.SessionSources?.map((source) => (
							<div className='w-[80vw]'>
								<div>
									{source?.vidsrc.replace(/^(\w+).*\.com\/watch\?v=/g, "")}
								</div>
								<ReactPlayer
									id={"video"}
									controls={false}
									muted
									width={"80vw"}
									height={"40vw"}
									loop
									playsInline
									className={`h-full w-full`}
									url={source?.vidsrc}
								/>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default AdminSessionReview;
