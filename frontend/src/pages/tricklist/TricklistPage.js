import React, { useState, useEffect } from "react";
import TrickList from "./components/trickList";
import useGetTricklists from "../../api/useTricklists";
import AddListButton from "../tricklist/components/AddListButton";
import AddComboItemToTricklist from "../tricklist/components/AddComboItemToTricklist";
import { useStore } from "../../store/store";

//TODO @TODO: Something with displayOnly
const TricklistPage = ({ displayOnly, profileuuid }) => {
	const { data: lists } = useGetTricklists(profileuuid);
	const [data, setData] = useState(lists);
	const selected = useStore((s) => s.selected_TrickList);
	const [addItemopen, setAddItemopen] = useState(false);
	const [openNewList, setOpenNewList] = useState(false);
	useEffect(() => {
		setData(lists);
		console.log(selected);
	}, [lists, selected]);

	const _getDate = (e) => {
		let date = new Date(e?.createdAt);
		return date.toDateString().slice(3, date.length);
	};

	return (
		<>
			<div className='no-scrollbar neumorphic flex h-[38vh] max-h-[38vh] w-[90%] flex-col items-center justify-center overflow-scroll rounded-lg bg-zinc-800 p-2'>
				<div className='no-scrollbar  h-full w-full overflow-scroll rounded-lg'>
					{Array.isArray(data) &&
						data.length > 0 &&
						data.map((list, i) => {
							return (
								<>
									<div className='p-1'>
										<TrickList
											key={list.tricklist_id + Math.random().toString()}
											data={list}
											date={_getDate(list)}
											last={i == data.length - 1}
											// @TODO: Drag shouldn't be hardcoded
											drag_offset={60}
										/>
									</div>
								</>
							);
						})}
				</div>
			</div>
			<div className='flex max-h-[30vh] min-h-[10vh] w-[90vw] items-center justify-center rounded-lg'>
				{!selected && (
					<AddListButton setOpen={setOpenNewList} open={openNewList} />
				)}
				{selected && (
					<AddComboItemToTricklist
						selected={selected}
						tricklist_id={selected.tricklist_id}
						addItemopen={addItemopen}
						setAddItemopen={setAddItemopen}
					/>
				)}
			</div>
		</>
	);
};

export default TricklistPage;
