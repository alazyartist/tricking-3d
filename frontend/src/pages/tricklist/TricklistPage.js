import React, { useState, useEffect } from "react";
import AddListButton from "./components/AddListButton";
import ListViewbyID from "./components/ListViewbyID";
import MakeNewTrickList from "./components/MakeNewTrickList";
import TricklistDisplay from "./components/TricklistDisplay";
import TricklistDisplay_Content from "./components/TricklistDisplay_Content";

const TricklistPage = ({ displayOnly, profileuuid }) => {
	const [open, setOpen] = useState(false);
	const [openView, setOpenView] = useState(false);
	const [addItemopen, setAddItemopen] = useState(false);

	const [tricklist_id, setTricklist_id] = useState("");
	useEffect(() => {
		console.log(tricklist_id);
	}, [tricklist_id]);

	//TODO add animations between Tricklist Views
	return (
		<div
			id={"tricklistPage-Container"}
			className='
					bg-blue-800 border-white 
					w-[85vw] p-3
					rounded-md
					flex flex-col gap-[2px]
					place-content-center
			'>
			<div className='h-full w-full'>
				{!openView && (
					<div className='place-items-center flex h-full w-full flex-row gap-2'>
						<TricklistDisplay_Content
							addItemopen={addItemopen}
							profileuuid={profileuuid}
							setTricklist_id={setTricklist_id}
							displayOnly={displayOnly}
							setOpenView={setOpenView}
							openView={openView}
							open={open}
						/>
					</div>
				)}

				{/* ADD TRICKLIST BUTTON */}
				{!displayOnly && !open && (
					<AddListButton setOpen={setOpen} open={open} />
				)}
				{/* ADD TRICKLIST POPUP */}
				<div>
					{open && !displayOnly && <MakeNewTrickList setOpen={setOpen} />}
				</div>

				{/* CONTENT CONTAINER */}
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
