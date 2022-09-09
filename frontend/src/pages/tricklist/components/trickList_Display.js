import React, { useState, useEffect } from "react";
import useGetTricklists from "../../../api/useTricklists";
import TrickList_Component from "./trickList_Component";

const Tricklist_Display = ({ list, style }) => {

	const [isOpen, setIsOpen] = useState(true);

	const _getDate = (e) => {
		let date = new Date(e?.createdAt)
		return (date.toDateString().slice(3, date.length))
	}

	return (
		<>
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
									_style={style}
									fn={() => { console.log("click from within") }}
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
															_style={style}//, i===data.length-1)}
															fn={() => { console.log("Trick click from within") }}
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
};

export default Tricklist_Display;
