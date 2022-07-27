import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import useApiCreds from "../../../hooks/useApiCreds";
import { useUserStore } from "../../../store/userStore";
import TricklistbyIdDetails from "./TricklistbyIdDetails";
const ListViewbyID = ({ tricklist_id, setOpenView }) => {
	const userInfo = useUserStore((s) => s.userInfo);
	const apiPrivate = useApiCreds();

	const [data, setData] = useState("No Data");
	const [deleteCheck, setDeleteCheck] = useState(false);
	useEffect(() => {
		apiPrivate
			.post("/tricklist/user/id", {
				uuid: userInfo.uuid,
				tricklist_id: tricklist_id,
			})
			.then((response) => {
				console.log(response.data[0]);
				setData(response.data[0]);
			});
	}, []);
	const handleClick = (e) => {
		if (e.target.id === "background") {
			setOpenView(false);
		}
	};
	const handleDelete = () => {
		console.log("GONNA DELETE", tricklist_id, userInfo.uuid);
		apiPrivate.delete(`/tricklist/user/${tricklist_id}`).then((res) => {
			console.log(res.data);
			setOpenView(false);
		});
	};
	return (
		<div
			onClick={(e) => handleClick(e)}
			id={"background"}
			className='absolute top-0 z-[10] flex h-[100vh] w-full place-content-center bg-zinc-800 bg-opacity-40 pt-[8rem] backdrop-blur-xl'>
			<div className='h-fit text-xl'>
				<TricklistbyIdDetails data={data} />
				<div>
					{deleteCheck && (
						<div className='absolute top-0 left-0 flex h-full w-full flex-col place-content-center place-items-center gap-3 bg-zinc-800 font-inter'>
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
			</div>

			{!deleteCheck && (
				<div
					onClick={() => setDeleteCheck(true)}
					className='absolute top-[5rem] right-[4rem] flex place-content-center place-items-center'>
					<MdClose className='h-10 w-10 text-red-500' />
					<div>DELETE</div>
				</div>
			)}
		</div>
	);
};

export default ListViewbyID;
