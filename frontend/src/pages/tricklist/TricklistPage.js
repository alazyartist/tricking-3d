import React, { useState, useEffect } from "react";
import AddListButton from "./components/AddListButton";
import ListViewbyID from "./components/ListViewbyID";
import MakeNewTrickList from "./components/MakeNewTrickList";
import TrickList_Container from "./components/trickList_Container";

const TricklistPage = ({ displayOnly, profileuuid }) => {
	const [open, setOpen] = useState(false);
	const [openView, setOpenView] = useState(false);
	const [addItemopen, setAddItemopen] = useState(false);

	const [tricklist_id, setTricklist_id] = useState("");
	useEffect(() => {
	}, [tricklist_id]);

	//TODO add animations between Tricklist Views
	return (
		<div className='h-[500px]'>
			<div id="trickList_Header"
				className='h-5 flex flex-row justify-center items-end'>
				Trick List
			</div>

			<div
				id={"tricklistPage-Container"}
				className='
				bg-zinc-400 border-white 
				h-full w-[90vw] p-1
				rounded-md
				'>
				<div className='h-full w-full'>
					{!openView && (
						<div className='flex flex-row'>
								<TrickList_Container
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
		</div>
	);
};

export default TricklistPage;
