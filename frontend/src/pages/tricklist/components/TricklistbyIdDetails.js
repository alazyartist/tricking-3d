import React from "react";

const TricklistbyIdDetails = ({ data }) => {
	let updated = new Date(data?.updatedAt);
	updated = updated.toDateString();
	return (
		<>
			<div
				onChange={(e) => console.log(e)}
				contentEditable='true'
				className='font-inter text-2xl font-bold text-zinc-300'>
				{data?.name}
			</div>
			<div id={"data-container"} className='flex gap-8 text-zinc-300'>
				<div className=''>{data?.Owner?.username}</div>
				<div className=''>{updated}</div>
			</div>
		</>
	);
};

export default TricklistbyIdDetails;
