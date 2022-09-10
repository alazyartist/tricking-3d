import React, { useState } from "react"
import TrickList_ListComponent from "./trickList_Component"
import TrickList_Combo from "./trickList_Combo"

const Tricklist_List = ({
	data,
	date,
	style,
	fn,
	drag_offset
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{
				<TrickList_ListComponent
					key={data.id}
					data={data}
					date={date}
					style={style}
					fn={() => { fn(); console.log("click from within") }}
					drag_offset={drag_offset}
					swipe_left={() => console.log(data.name, "- Swipe Left: Replace with function")}
					swipe_right={() => console.log(data.name, "- Swipe Right: Replace with function")}
				/>
			}
			{
				Array.isArray(data.comboArray) &&
					data.comboArray.length > 0 &&
					data.comboArray.map((combo, j) => {
						return (
							<>
								{
									<TrickList_Combo 
										key={combo.id}
										data={combo}
										date={date}
										style={style}
										fn={() => { fn(); console.log("Combo click from within") }}
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

export default Tricklist_List;
