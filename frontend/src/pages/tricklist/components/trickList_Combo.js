import React, { useState } from "react"
import TrickList_ComboComponent from "./trickList_ComboComponent"
import TrickList_Trick from "./trickList_Trick"

const Tricklist_Combo = ({
	data,
	date,
	style,
	fn,
	drag_offset
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const _getStyle = (list, last = false) => {
		console.log(list.type);
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

	return (
		<>
			{
				<TrickList_ComboComponent
					key={date.id}
					data={data}
					date={date}
					style={_getStyle(data)}
					fn={() => { setIsOpen(!isOpen) }}
					drag_offset={drag_offset}
					swipe_left={() => console.log(data.name, "- Swipe Left: Replace with function")}
					swipe_right={() => console.log(data.name, "- Swipe Right: Replace with function")}
				/>
			}
			{
				isOpen &&
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
										drag_offset={60}
										swipe_left={() => console.log(trick.name, "- Swipe Left: Replace with function")}
										swipe_right={() => console.log(trick.name, "- Swipe Right: Replace with function")}
									/>
								}
							</>
						)
					})
			}
		</>
	)
};

export default Tricklist_Combo;
