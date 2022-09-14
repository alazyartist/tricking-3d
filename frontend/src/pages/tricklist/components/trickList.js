import React, { useState, useEffect } from "react"
import TrickList_Component from "./trickList_Component"
import TrickList_Next from "./trickList"
import AddListButton from "./AddListButton"
import AddComboItemToTricklist from "./AddComboItemToTricklist";

const Tricklist = ({
	data,
	date,
	last,
	fn,
	drag_offset,
	setCurrentLayer
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const innerArray = (data.comboArray) ? data.comboArray : data.trickArray
	const [addItemopen, setAddItemopen] = useState(false)
	const [tricklist_id] = useState("")
	const [open, setOpen] = useState(false)
	useEffect(() => { setCurrentLayer(data) }, [isOpen])

	return (
		<>
			{
				<TrickList_Component
					key={data.id}
					data={data}
					open={isOpen}
					date={date}
					last={last}
					fn={() => { setIsOpen(!isOpen) }}
					drag_offset={drag_offset}
					swipe_left={() => console.log(data.name, "- Swipe Left: Replace with function")}
					swipe_right={() => console.log(data.name, "- Swipe Right: Replace with function")}
				/>
			}
			{
				isOpen &&
					Array.isArray(innerArray) &&
					innerArray.length > 0 &&
					innerArray.map((combo, j) => {
						return (
							<>
								{
									<TrickList_Next
										key={combo.id}
										data={combo}
										date={date}
										last={j == innerArray.length-1}
										drag_offset={drag_offset}
										setCurrentLayer={setCurrentLayer}
										swipe_left={() => console.log(combo.name, "- Swipe Left: Replace with function")}
										swipe_right={() => console.log(combo.name, "- Swipe Right: Replace with function")}
									/>
								}
							</>
						)
					})
			}
		</>
	)
}

export default Tricklist;
