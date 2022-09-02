import React, { useState, useEffect } from "react";
import AddListButton from "./components/AddListButton";
import ListViewbyID from "./components/ListViewbyID";
import MakeNewTrickList from "./components/MakeNewTrickList";
import TricklistDisplay from "./components/TricklistDisplay";

const TricklistPage = ({ displayOnly, profileuuid }) => {
	const [open, setOpen] = useState(false);
	const [openView, setOpenView] = useState(false);
	const [tricklist_id, setTricklist_id] = useState("");
	useEffect(() => {
		console.log(tricklist_id);
	}, [tricklist_id]);
	return (
		<div className='place-content-center place-items-center flex w-full flex-col gap-2'>
			<TricklistDisplay
				profileuuid={profileuuid}
				setTricklist_id={setTricklist_id}
				setOpenView={setOpenView}
			/>
			{!displayOnly && <AddListButton setOpen={setOpen} open={open} />}
			{open && !displayOnly && <MakeNewTrickList setOpen={setOpen} />}

			{openView && (
				<ListViewbyID
					displayOnly={displayOnly}
					setOpenView={setOpenView}
					tricklist_id={tricklist_id}
					setTricklist_id={setTricklist_id}
				/>
			)}
		</div>
	);
};

export default TricklistPage;
