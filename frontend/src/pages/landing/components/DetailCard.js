import React from "react";

const DetailCard = ({ title, description, children, left }) => {
	return (
		<div
			className={`relative ${
				left ? "ml-3 place-self-start" : "mr-3 place-self-end"
			}  w-[300px] flex-shrink-0 rounded-md`}>
			<div className='h-[200px] w-[300px] flex-shrink-0 rounded-md bg-zinc-900'>
				{children}
			</div>
			<h1 className='px-2 font-black text-zinc-800'>{title}</h1>
			<p className='px-2'>{description}</p>
		</div>
	);
};

export default DetailCard;
