import React, { useState, useEffect } from "react";
import AddListButton from "./components/AddListButton";
import ListViewbyID from "./components/ListViewbyID";
import MakeNewTrickList from "./components/MakeNewTrickList";
import TricklistDisplay from "./components/TricklistDisplay";

const TricklistPage = ({ displayOnly, profileuuid }) => {
	const [open, setOpen] = useState(false);
	const [openView, setOpenView] = useState(false);
	const [addItemopen, setAddItemopen] = useState(false);

	const [tricklist_id, setTricklist_id] = useState("");

	//TODO add animations between Tricklist Views
	return (
		<div
			id={"tricklistPage-Container"}
			className='no-scrollbar flex h-fit max-h-[50vh] w-full flex-col place-content-start place-items-center gap-2 overflow-y-auto'>
			<div className='h-full w-full'>
				{!openView && (
					<div className='flex h-full w-full flex-row place-items-center gap-2'>
						<TricklistDisplay
							addItemopen={addItemopen}
							profileuuid={profileuuid}
							setTricklist_id={setTricklist_id}
							displayOnly={displayOnly}
							setOpenView={setOpenView}
							openView={openView}
							open={open}
						/>
						{!displayOnly && !open && (
							<AddListButton setOpen={setOpen} open={open} />
						)}
					</div>
				)}
				<div>
					{open && !displayOnly && <MakeNewTrickList setOpen={setOpen} />}
				</div>

				<div>
					{openView && (
						<ListViewbyID
							addItemopen={addItemopen}
							setAddItemopen={setAddItemopen}
							displayOnly={displayOnly}
							setOpenView={setOpenView}
							tricklist_id={tricklist_id}
							setTricklist_id={setTricklist_id}
							openView={openView}
							open={open}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default TricklistPage;
