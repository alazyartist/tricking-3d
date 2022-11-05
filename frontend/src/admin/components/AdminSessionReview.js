import React from "react";
import { useParams } from "react-router-dom";
import { useGetSessionDetailsbySessionid } from "../../api/useSessionSummaries";

const AdminSessionReview = () => {
	const { sessionid } = useParams();
	const {
		data: { data: sessionDetails },
	} = useGetSessionDetailsbySessionid(sessionid);

	console.log(sessionDetails);
	return (
		<div className='flex flex-col place-items-center text-zinc-300'>
			<div>{sessionid}</div>
			<div>{sessionDetails?.name}</div>
			<div>{sessionDetails?.name}</div>
		</div>
	);
};

export default AdminSessionReview;
