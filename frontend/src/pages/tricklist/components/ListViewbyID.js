import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";
import useApiCreds from "../../../hooks/useApiCreds";

const ListViewbyID = ({ tricklist_id, setOpenView }) => {
	const apiPrivate = useApiCreds();
	useEffect(() => {
		console.log("listView");
	}, []);
	const handleClick = (e) => {
		if (e.target.id === "background") {
			setOpenView(false);
		}
	};
	return (
		<div
			onClick={(e) => handleClick(e)}
			id={"background"}
			className='absolute top-0 z-[10] flex h-[100vh] w-full place-content-center place-items-center bg-zinc-800 bg-opacity-40 backdrop-blur-md'>
			<div className='bg-red-500'>
				<div>{tricklist_id}</div>
			</div>

			<div
				onClick={(e) => handleClick(e)}
				className='absolute top-[5rem] right-[4rem]'>
				<MdClose className='h-10 w-10 text-zinc-300' />
			</div>
		</div>
	);
};

export default ListViewbyID;
