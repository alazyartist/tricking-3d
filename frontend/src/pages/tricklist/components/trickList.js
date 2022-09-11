import React, { useState } from "react"
import TrickList_Component from "./trickList_Component"
import TrickList_Next from "./trickList"

const Tricklist = ({
	data,
	date,
	fn,
	drag_offset
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const innerArray = (data.comboArray) ? data.comboArray : data.trickArray

	return (
		<>
			{
				<TrickList_Component
					key={data.id}
					data={data}
					open={isOpen}
					date={date}
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
										drag_offset={drag_offset}
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
