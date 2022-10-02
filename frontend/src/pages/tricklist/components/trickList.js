import React, { useState, useEffect } from "react";
import TrickList_Component from "./trickList_Component";
import TrickList_Next from "./trickList";
import AddListButton from "./AddListButton";
import AddComboItemToTricklist from "./AddComboItemToTricklist";
import { useStore } from "../../../store/store.js";

const Tricklist = ({ data, date, last, drag_offset, swipe_left }) => {
	const [isOpen, setIsOpen] = useState(false);
	const innerArray = data.TricklistCombos
		? data.TricklistCombos
		: data.comboArray;
	const [addItemopen, setAddItemopen] = useState(false);
	const [tricklist_id] = useState("");
	const [open, setOpen] = useState(false);
	const setSelected = useStore((s) => s.setSelected_TrickList);

	const _toggleOpen = () => {
		setSelected(isOpen ? undefined : data);
		setIsOpen(!isOpen);
	};

	return (
		<>
			{
				<TrickList_Component
					data={data}
					open={isOpen}
					date={date}
					last={last}
					fn={() => {
						_toggleOpen();
					}}
					drag_offset={drag_offset}
				/>
			}
			{isOpen &&
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
									last={j == innerArray.length - 1}
									drag_offset={drag_offset}
								/>
							}
						</>
					);
				})}
		</>
	);
};

export default Tricklist;
