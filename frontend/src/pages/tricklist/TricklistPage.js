import React, { useState, useEffect } from "react"
import AddListButton from "./components/AddListButton"
import ListViewbyID from "./components/ListViewbyID"
import MakeNewTrickList from "./components/MakeNewTrickList"
import TrickList from "./components/trickList"
import Data_Mock from "../../data/trickList_mock"
import useGetTricklists from "../../api/useTricklists";

const TricklistPage = ({ displayOnly, profileuuid }) => {
	const [open, setOpen] = useState(false)
	const [openView, setOpenView] = useState(false)
	const [addItemopen, setAddItemopen] = useState(false)
	// @TODO: Uncomment for actual data
	//const { uuid: userUUID } = useUserStore((s) => s.userInfo)
	//const userInfo = useUserStore((s) => s.userInfo)
	//const [tricklist_id, setTricklist_id] = useState("")
	const { data: lists } = useGetTricklists(profileuuid);
	useEffect(() => {
		console.log(profileuuid)
		console.log("list:")
		console.log(lists)
	}, [lists])
	const [mockedData] = useState(Data_Mock)
	const [data, setData] = useState(mockedData)
	const _getDate = (e) => {
		let date = new Date(e?.createdAt)
		return (date.toDateString().slice(3, date.length))
	}

	return (
		<div className='flex flex-col items-center'>
			<button 
				className='w-[20vw] h-[4vh] rounded-t-lg bg-zinc-400 text-zinc-800 flex flex-row justify-center'
				onClick={() => {setOpenView(!openView)}}
			>
				Trick List
			</button>

			<div className='w-[90vw] h-[45vh] border-8 border-zinc-400 bg-zinc-400 rounded-md overflow-scroll no-scrollbar'>
				{openView && (
					<div className='bg-zinc-400 flex flex-col justify-start'>
						{
							Array.isArray(data) &&
								data.length > 0 &&
								data.map((list, i) => {
									return (
										<>
											{
												<div className='p-1'>
													<TrickList
														key={list.id}
														data={list}
														date={_getDate(list)}
														fn={() => { console.log("List click from within _Container") }}
														drag_offset={60}
														swipe_left={() => console.log(list.name, "- Swipe Left: Replace with function")}
														swipe_right={() => console.log(list.name, "- Swipe Right: Replace with function")}
													/>
													{/* ADD TRICKLIST BUTTON / POPUP */}
													{!displayOnly && !open && (
														<></>
													)}
													{open && !displayOnly && <MakeNewTrickList setOpen={setOpen} />}
												</div>
											}
										</>
									)
								}
								)
						}
						<div className='absolute bottom-4 right-4'>
							<AddListButton setOpen={setOpen} open={open} />
						</div>
					</div>
				)}

				{/* CONTENT CONTAINER 
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
				*/}
			</div>
		</div>
	);
};

export default TricklistPage;
