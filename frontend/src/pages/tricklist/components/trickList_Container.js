import React, { useState, useEffect } from "react"
import useGetTricklists from "../../../api/useTricklists"
import TrickList_Component from "./trickList_Component"
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
	};

	const _listElementStyle = (type, last) => {
		console.log("Style-Type: ", type);
		let _selected;
		let _style = "break-all w-full p-1 font-inter text-sm font-semibold text-zinc-200"
		switch(type) {
			default:
				_style = _style.concat(" bg-zinc-100")
				break

			case "TrickList":
				_style = _style.concat(" bg-zinc-800")
				_selected = true;
				if (_selected) {
					_style = _style.concat(" rounded-t-lg h-[50px]")
				}
				break

			case "Combo":
				_style = _style.concat(" bg-zinc-700")
				_selected = false
				if (!_selected) {
					_style = _style.concat(" w-[95%]")
				}
				break

			case "Trick":
				_style = _style.concat(" bg-zinc-600")
				_selected = false
				if (!_selected) {
					_style = _style.concat(" w-[90%]")
				}
				if (last) {
					_style = _style.concat(" rounded-b-md")
				}
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
					/* TRICKLIST CLICKABLE */
					Array.isArray(data) &&
						data.length > 0 &&
						data.map((list, i) => {
							return (
								<>
									{
									<TrickList_Component
										key={list.id}
										data={list}
										date={_getDate(list)}
										_style={_listElementStyle(list.type)}//, i===data.length-1)}
										fn={() => { handleListClick(list) }}
										drag_offset={60}
										swipe_left={() => console.log(list.name, "- Swipe Left: Replace with function")}
										swipe_right={() => console.log(list.name, "- Swipe Right: Replace with function")}
									/>
									}
									{
										Array.isArray(list.comboArray) &&
											list.comboArray.length > 0 &&
											list.comboArray.map((combo, j) => {
												return (
													<>{
															<TrickList_Component
																key={combo.id}
																data={combo}
																date={_getDate(list)}
																_style={_listElementStyle(combo.type)}//, i===data.length-1)}
																fn={() => { handleListClick(combo.type) }}
																drag_offset={60}
																swipe_left={() => console.log(combo.name, "- Swipe Left: Replace with function")}
																swipe_right={() => console.log(combo.name, "- Swipe Right: Replace with function")}
															/>
														}
														{
															Array.isArray(combo.trickArray) &&
																combo.trickArray.length > 0 &&
																combo.trickArray.map((trick, j) => {
																	return (
																		<>
																			{
																				<TrickList_Component
																					key={trick.id}
																					data={trick}
																					date={_getDate(list)}
																					_style={_listElementStyle(trick.type)}//, i===data.length-1)}
																					fn={() => { handleListClick(trick.type) }}
																					drag_offset={60}
																					swipe_left={() => console.log(trick.name, "- Swipe Left: Replace with function")}
																					swipe_right={() => console.log(trick.name, "- Swipe Right: Replace with function")}
																				/>
																			}
																		</>
																	)
																}
															)
														}
													</>
												)
											}
										)
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
