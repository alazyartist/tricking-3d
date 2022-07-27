import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";
import useApiCreds from "../../../hooks/useApiCreds";

const ListViewbyID = ({ tricklist_id, setOpenView }) => {
	const apiPrivate = useApiCreds();
	useEffect(() => {
		console.log("listView");
	}, []);
	return (
		<div className='absolute top-0 z-[10] flex h-[100vh] w-full place-content-center place-items-center bg-zinc-800'>
			<div>{tricklist_id}</div>

			<div
				onClick={() => setOpenView(false)}
				className='absolute top-[5rem] right-[4rem]'>
				<MdClose className='h-10 w-10 text-zinc-300' />
			</div>
		</div>
	);
};

export default ListViewbyID;
