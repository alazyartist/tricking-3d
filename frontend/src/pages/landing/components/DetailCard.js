import React from "react";

const DetailCard = ({ title, description, children, left }) => {
	return (
		<div
			className={` ${
				left ? "ml-3 place-self-start md:ml-10" : "mr-3 place-self-end md:mr-10"
			}   w-[50%] rounded-md`}>
			<div className='h-[200px] w-[300px] rounded-md bg-zinc-900  md:h-[400px] md:w-[600px] '>
				{children}
			</div>
			<h1 className='px-2 font-black text-zinc-800'>{title}</h1>
			<p className='px-2'>{description}</p>
		</div>
	);
};

export default DetailCard;
