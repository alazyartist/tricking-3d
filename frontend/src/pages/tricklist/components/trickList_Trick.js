import React, { useState } from "react"
import TrickList_TrickComponent from "./trickList_TrickComponent"

const Tricklist_Trick = ({
	data,
	date,
	style,
	fn,
	drag_offset
}) => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<>
			{
				<TrickList_TrickComponent
					key={date.id}
					data={data}
					date={date}
					style={style}
					fn={() => { fn(); console.log("click from within") }}
					drag_offset={drag_offset}
					swipe_left={() => console.log(data.name, "- Swipe Left: Replace with function")}
					swipe_right={() => console.log(data.name, "- Swipe Right: Replace with function")}
				/>
			}
			{/*
				Array.isArray(data.trickArray) &&
					data.trickArray.length > 0 &&
					data.trickArray.map((trick, j) => {
						return (
							<>
								{
									<TrickList_Trick
										key={trick.id}
										data={trick}
										date={date}
										style={style}
										fn={() => { fn(); console.log("Trick click from within") }}
										drag_offset={60}
										swipe_left={() => console.log(trick.name, "- Swipe Left: Replace with function")}
										swipe_right={() => console.log(trick.name, "- Swipe Right: Replace with function")}
									/>
								}
							</>
						)
					})
					*/}
		</>
	)
};

export default Tricklist_Trick;
