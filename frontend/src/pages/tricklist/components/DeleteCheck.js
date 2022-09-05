import React from "react";
import { MdClose } from "react-icons/md";

const DeleteCheck = ({ deleteCheck, handleDelete, setDeleteCheck }) => {
	return (
		<>
			<div className={`?${deleteCheck && "absolute h-full w-full"}`}>
				{deleteCheck && (
					<div className='place-content-center place-items-center top-0 left-0 flex h-full w-full flex-col gap-3 bg-zinc-800 font-inter'>
						<div className=' text-xl font-bold'>
							Are you sure you want to DELETE?
						</div>
						<div className='flex w-[80vw] gap-2 font-semibold text-zinc-200'>
							<button
								onClick={() => handleDelete()}
								className='rounded-xl bg-red-500 p-2 text-center '>
								Yes I WANT TO DELETE IT
							</button>
							<button
								onClick={() => setDeleteCheck(false)}
								className='bg-zinc rounded-xl bg-zinc-600 p-2 text-center '>
								No I WAS KIDDING.
							</button>
						</div>
					</div>
				)}
			</div>
			{!deleteCheck && (
				<div
					onClick={() => setDeleteCheck(true)}
					className=' place-items-center bottom-[5rem] right-[2rem] flex place-content-end'>
					<MdClose className='h-10 w-10 text-red-500' />
					<div>DELETE</div>
				</div>
			)}
		</>
	);
};

export default DeleteCheck;
