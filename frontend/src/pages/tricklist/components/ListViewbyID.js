import React, { useEffect, useState } from "react";
import {
	useDeleteTricklist,
	useGetTricklistById,
} from "../../../api/useTricklists";
import { useUserStore } from "../../../store/userStore";
import AddComboItemToTricklist from "./AddComboItemToTricklist";
import DeleteCheck from "./DeleteCheck";
import TricklistbyIdDetails from "./TricklistbyIdDetails";
const ListViewbyID = ({ displayOnly, tricklist_id, setOpenView }) => {
	const userInfo = useUserStore((s) => s.userInfo);

	const [deleteCheck, setDeleteCheck] = useState(false);
	const { data: tricklists } = useGetTricklistById(tricklist_id, userInfo.uuid);
	const { mutate: deleteTricklist } = useDeleteTricklist(tricklist_id);
	useEffect(() => {
		console.log(tricklists);
	}, [tricklists]);
	const handleClick = (e) => {
		if (e.target.id === "background") {
			setOpenView(false);
		}
	};
	const handleDelete = () => {
		deleteTricklist();
		setOpenView(false);
	};
	return (
		<div
			onClick={(e) => handleClick(e)}
			id={"background"}
			className='place-content-center absolute top-0 z-[10] flex h-[100vh] w-full bg-zinc-800 bg-opacity-40 pt-[8rem] backdrop-blur-xl'>
			<div className='h-fit text-xl'>
				<TricklistbyIdDetails
					displayOnly={displayOnly}
					tricklist_id={tricklist_id}
					data={tricklists?.[0]}
				/>
				{!displayOnly && (
					<>
						<DeleteCheck
							deleteCheck={deleteCheck}
							handleDelete={handleDelete}
							setDeleteCheck={setDeleteCheck}
						/>
						<AddComboItemToTricklist tricklist_id={tricklist_id} />
					</>
				)}
			</div>
		</div>
	);
};

export default ListViewbyID;
