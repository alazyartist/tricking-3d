import React, { useState } from "react";
import { MdInfo } from "react-icons/md";
const ComboStructure = () => {
	const [info, setInfo] = useState(false);

	return (
		<>
			<div
				onClick={() => setInfo(!info)}
				className='absolute top-[4rem] right-[8rem] z-20 h-10 w-10 text-2xl'>
				<MdInfo />
			</div>
			{info && (
				<div
					onClick={() => setInfo(!info)}
					className=' absolute top-0 left-0 z-30 flex h-full w-full place-content-center place-items-center bg-zinc-800 bg-opacity-40 backdrop-blur-md'>
					<div className='flex flex-col'>
						<div>ComboStructure</div>
						<div>double-Cork.hyper-hook&gt;w540round</div>
						<div className='flex place-content-center place-items-center gap-2'>
							<ul className='text-xl font-bold'>
								<li>-</li>
								<li>.</li>
								<li>{">"}</li>
							</ul>
							<ul>
								<li>Used to denote variation modifiers</li>
								<li>Used to denote stance modifiers</li>
								<li>Used to denote transition</li>
							</ul>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ComboStructure;
