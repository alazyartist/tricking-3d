import React, { useState, useEffect } from "react"
import TrickList from "./components/trickList"
import Data_Mock from "../../data/trickList_mock"
import useGetTricklists from "../../api/useTricklists";

import AddListButton from "./components/AddListButton"
import AddComboItemToTricklist from "./components/AddComboItemToTricklist";

const TricklistPage = ({ displayOnly, profileuuid }) => {
	const [openNewList, setOpenNewList] = useState(false)
	const [openNewCombo, setOpenNewCombo] = useState(false)
	const [openTrickList, setTrickListOpen] = useState(true)
	const [openClaimed, setClaimedOpen] = useState(false)
	const { data: lists } = useGetTricklists(profileuuid);
	const [mockedData] = useState(Data_Mock)
	const [data, setData] = useState(mockedData)
	const [current, setCurrent] = useState("TrickList");

	useEffect(() => {
		//setData(lists)
	}, [lists])

	const _getDate = (e) => {
		let date = new Date(e?.createdAt)
		return (date.toDateString().slice(3, date.length))
	}

	const setCurrentLayer = (_data, type) => {
		setCurrent(_data)
	}

	return (
		<div className='fixed bottom-0 h-[50vh] max-h-[50vh] flex flex-col items-center'>
			<div className='w-[90vw] h-full p-2 bg-zinc-700 rounded-lg flex justify-center overflow-scroll no-scrollbar'>
				{openTrickList && (
					<div className='bg-zinc-400 rounded-lg w-full h-full overflow-scroll no-scrollbar'>
						{
							Array.isArray(data) &&
								data.length > 0 &&
								data.map((list, i) => {
									return (
										<>
											{
												<div className='p-1'>
													<TrickList
														key={list.tricklist_id}
														data={list}
														date={_getDate(list)}
														last={i == data.length-1}
														drag_offset={60}
														setCurrentLayer={setCurrentLayer}
														swipe_left={() => console.log(list.name, "- Swipe Left: Replace with function")}
														swipe_right={() => console.log(list.name, "- Swipe Right: Replace with function")}
													/>
												</div>
											}
										</>
									)
								}
								)
						}
					</div>
				)}
			</div>

			<div className='flex justify-center items-center w-full h-[20vh] bg-zinc-700 border-zinc-900 border-t-2 rounded-lg'>
				{
					typeof(current) == "object" &&
						current.type.includes("TrickList") &&
						<AddListButton setOpen={setOpenNewList} open={openNewList} /> 
				}{
					typeof(current) == "object" &&
						current.type === "Combo" &&
						<AddComboItemToTricklist setOpen={setOpenNewCombo} open={openNewCombo} />
				}{
					typeof(current) == "object" &&
						current.type === "Trick" &&
						<AddComboItemToTricklist setOpen={setOpenNewCombo} open={openNewCombo} />
				}
			</div>
		</div>
	);
};

export default TricklistPage;
