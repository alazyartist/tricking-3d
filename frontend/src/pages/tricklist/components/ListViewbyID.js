import React, { useEffect, useState } from "react";
import { useGetTricklistById } from "../../../api/useGetTricklists";
import useApiCreds from "../../../hooks/useApiCreds";
import { useUserStore } from "../../../store/userStore";
import AddComboItemToTricklist from "./AddComboItemToTricklist";
import DeleteCheck from "./DeleteCheck";
import TricklistbyIdDetails from "./TricklistbyIdDetails";
const ListViewbyID = ({ tricklist_id, setOpenView }) => {
	const userInfo = useUserStore((s) => s.userInfo);
	const apiPrivate = useApiCreds();

	const [deleteCheck, setDeleteCheck] = useState(false);

	const { data: tricklists } = useGetTricklistById(tricklist_id, userInfo.uuid);
	useEffect(() => {
		console.log(tricklists);
	}, [tricklists]);
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
				<TricklistbyIdDetails
					tricklist_id={tricklist_id}
					data={tricklists?.[0]}
				/>
				<DeleteCheck
					deleteCheck={deleteCheck}
					handleDelete={handleDelete}
					setDeleteCheck={setDeleteCheck}
				/>
				<AddComboItemToTricklist tricklist_id={tricklist_id} />
			</div>
		</div>
	);
};

export default ListViewbyID;
