import React, { useState } from "react";
import AddListButton from "./components/AddListButton";
import ListViewbyID from "./components/ListViewbyID";
import MakeNewTrickList from "./components/MakeNewTrickList";
import TrickList from "./components/trickList"
import Data_Mock from "../../data/trickList_mock"

const TricklistPage = ({ displayOnly, profileuuid }) => {
	const [open, setOpen] = useState(false);
	const [openView, setOpenView] = useState(false);
	const [addItemopen, setAddItemopen] = useState(false);
	// @TODO: Uncomment for actual data
	//const { data: lists } = useGetTricklists(profileuuid);
	//const { uuid: userUUID } = useUserStore((s) => s.userInfo);
	//const userInfo = useUserStore((s) => s.userInfo);
	const [mockedData] = useState(Data_Mock)
	const [data, setData] = useState(mockedData)
	const _getDate = (e) => {
		let date = new Date(e?.createdAt)
		return (date.toDateString().slice(3, date.length))
	}

	return (
		<div className='h-[500px]'>
			<div className='h-5 flex flex-row justify-center items-end'>
				Trick List
			</div>

			<div
				className='bg-zinc-400 border-white h-full w-[90vw] p-1 rounded-md'>
				<div>
					{!openView && (
						<div className='h-[500px] w-full bg-zinc-900 gap-[1px] flex flex-col justify-start'>
							{
								Array.isArray(data) &&
									data.length > 0 &&
									data.map((list, i) => {
										return (
											<>
												{
													<TrickList
														key={list.id}
														data={list}
														date={_getDate(list)}
														fn={() => { console.log("List click from within _Container") }}
														drag_offset={60}
														swipe_left={() => console.log(list.name, "- Swipe Left: Replace with function")}
														swipe_right={() => console.log(list.name, "- Swipe Right: Replace with function")}
													/>
												}
											</>
										)
									}
									)
							}
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
