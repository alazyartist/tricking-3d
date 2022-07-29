import React, { useState, useEffect } from "react";
import AddListButton from "./components/AddListButton";
import ListViewbyID from "./components/ListViewbyID";
import MakeNewTrickList from "./components/MakeNewTrickList";
import TricklistDisplay from "./components/TricklistDisplay";

const TricklistPage = () => {
	const [open, setOpen] = useState(false);
	const [openView, setOpenView] = useState(false);
	const [tricklist_id, setTricklist_id] = useState("");
	const [count, setCount] = useState(1);
	useEffect(() => {
		console.log(tricklist_id);
	}, [tricklist_id]);
	return (
		<div className='flex w-full flex-col place-content-center place-items-center gap-2'>
			<div>TricklistPage</div>
			<TricklistDisplay
				setTricklist_id={setTricklist_id}
				count={count}
				setOpenView={setOpenView}
			/>
			<AddListButton
				setOpen={setOpen}
				open={open}
				setCount={setCount}
				count={count}
			/>
			{open && <MakeNewTrickList setOpen={setOpen} />}
			{openView && (
				<ListViewbyID
					setOpenView={setOpenView}
					tricklist_id={tricklist_id}
					setTricklist_id={setTricklist_id}
				/>
			)}
		</div>
	);
};

export default TricklistPage;
