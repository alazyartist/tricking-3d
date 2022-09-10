import React, { useState, useEffect } from "react"
import useGetTricklists from "../../../api/useTricklists"
import TrickList_Component from "./trickList_Component"
import TrickList_Display from "./trickList_Display"
import TrickList_List from "./trickList_List"
import { useUserStore } from "../../../store/userStore"
import Data_Mock from "../../../data/trickList_mock"

const Tricklist_Container = ({
	displayOnly,
	profileuuid,
	setOpenView,
	setTricklist_id,
	open,
}) => {
	// @TODO: Uncomment for actual data
	//const { data: lists } = useGetTricklists(profileuuid);
	//const { uuid: userUUID } = useUserStore((s) => s.userInfo);
	//const userInfo = useUserStore((s) => s.userInfo);
	const [mockedData] = useState(Data_Mock)
	const [data, setData] = useState(mockedData)

	const handleListClick = (e) => {
		console.log("Selected: ",e)
	};

	const _listElementStyle = (list, last) => {
		let _style = "break-all w-full p-1 font-inter text-sm font-semibold text-zinc-200"
		switch(list.type) {
			default:
				_style = _style.concat(" bg-zinc-100")
				break

			case "TrickList":
				_style = _style.concat(" bg-zinc-800")
				if (list.isOpen) {_style = _style.concat(" rounded-t-lg h-[50px]")}
				break

			case "Combo":
				_style = _style.concat(" bg-zinc-700 w-[95%]")
				break

			case "Trick":
				_style = _style.concat(" bg-zinc-600 w-[90%]")
				if (last) {_style = _style.concat(" rounded-b-md")}
				break
		}
		return _style
	}

	const _getDate = (e) => {
		let date = new Date(e?.createdAt)
		return (date.toDateString().slice(3, date.length))
	}

	return (
		!open && (
			<div 
				id="trickList_Container"
				className='
				h-[500px] w-full bg-zinc-900
				flex flex-col gap-[1px]
				justify-start
				'
			>
				{
					// Loop through LISTS in DATA
								// Make <Component/> for List > Combo > Trick
								// Each knows its own open state and requires it's state for populating next teir. 
					Array.isArray(data) &&
						data.length > 0 &&
						data.map((list, i) => {
							return (
								<>
									{
										<TrickList_List
											key={list.id}
											data={list}
											date={_getDate(list)}
											style={_listElementStyle(list)}//, i===data.length-1)}
											fn={() => { handleListClick(list) }}
											drag_offset={60}
											swipe_left={() => console.log(list.name, "- Swipe Left: Replace with function")}
											swipe_right={() => console.log(list.name, "- Swipe Right: Replace with function")}
										/>
									}
									{/*
									{
										// Draw List
										<TrickList_Component
											key={list.id}
											data={list}
											date={_getDate(list)}
											_style={_listElementStyle(list)}//, i===data.length-1)}
											fn={() => { handleListClick(list) }}
											drag_offset={60}
											swipe_left={() => console.log(list.name, "- Swipe Left: Replace with function")}
											swipe_right={() => console.log(list.name, "- Swipe Right: Replace with function")}
										/>
									}
									{
										// Loop through Combos in List if isOpen
										<TrickList_Display 
											list={list} 
											style={_listElementStyle(list)}//, i===data.length-1)}
										/>
									}
									*/}
								</>
							)
						}
					)
				}
			</div>
		)
	);
};

export default Tricklist_Container;
