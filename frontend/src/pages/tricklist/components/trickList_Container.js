import React, { useState } from "react"
import useGetTricklists from "../../../api/useTricklists"
import TrickList from "./trickList"
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
	const _getStyle = (list, last = false) => {
		let _style = "break-all w-full p-1 font-inter text-sm font-semibold text-zinc-200"
		switch(list.type) {
			default:
				_style = _style.concat(" bg-zinc-100")
				break
			case "TrickList":
				_style = _style.concat(" bg-zinc-800")
				break;
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
											style={_getStyle(list)}
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
		)
	);
};

export default Tricklist_Container;
