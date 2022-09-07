import React, { useEffect, useState } from "react";
import {
	useDeleteTricklist,
	useGetTricklistById,
} from "../../../api/useTricklists";
import { useUserStore } from "../../../store/userStore";
import AddComboItemToTricklist from "./AddComboItemToTricklist";
import DeleteCheck from "./DeleteCheck";
import TricklistbyIdDetails from "./TricklistbyIdDetails";
const ListViewbyID = ({
	openView,
	displayOnly,
	tricklist_id,
	setOpenView,
	addItemopen,
	setAddItemopen,
	open,
}) => {
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
		// @TODO: Update to trickListDisplay layout
		<div
			onClick={(e) => handleClick(e)}
			id={"background"}
			className=' z-[10] flex h-full w-full flex-col place-content-start rounded-xl bg-red-400 bg-opacity-40 '>
			<div className='h-full w-full p-3 text-xl'>
				<div>
					{!deleteCheck && (
						<TricklistbyIdDetails
							displayOnly={displayOnly}
							tricklist_id={tricklist_id}
							data={tricklists?.[0]}
							openView={openView}
							setOpenView={setOpenView}
							addItemopen={addItemopen}
							open={open}
						/>
					)}
				</div>
			</div>
			<div className='mt-4 h-fit w-full'>
				{!displayOnly && (
					<div className=' flex w-full justify-between'>
						{!deleteCheck && (
							<AddComboItemToTricklist
								addItemopen={addItemopen}
								setAddItemopen={setAddItemopen}
								tricklist_id={tricklist_id}
							/>
						)}
						{!addItemopen && (
							<DeleteCheck
								deleteCheck={deleteCheck}
								handleDelete={handleDelete}
								setDeleteCheck={setDeleteCheck}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default ListViewbyID;
