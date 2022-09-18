import React, { useState, useEffect } from "react";
import TrickList from "./components/trickList";
import Data_Mock from "../../data/trickList_mock";
import useGetTricklists from "../../api/useTricklists";

//TODO @TODO: Something with displayOnly
const TricklistPage = ({ displayOnly, profileuuid }) => {
	const [mockedData] = useState(Data_Mock);
	const { data: lists } = useGetTricklists(profileuuid);
	const [data, setData] = useState(lists);

	useEffect(() => {
		setData(lists);
	}, [lists]);

	const _getDate = (e) => {
		let date = new Date(e?.createdAt);
		return date.toDateString().slice(3, date.length);
	};

	return (
		<div className='no-scrollbar neumorphic flex h-[38vh] max-h-[38vh] w-[90%] flex-col items-center justify-center overflow-scroll rounded-lg bg-zinc-800 p-2'>
			<div className='no-scrollbar  h-full w-full overflow-scroll rounded-lg'>
				{Array.isArray(data) &&
					data.length > 0 &&
					data.map((list, i) => {
						return (
							<>
								{
									<div className='p-1'>
										<TrickList
											key={list.tricklist_id}
											data={list}
											date={_getDate(list)}
											last={i == data.length - 1}
											// @TODO: Drag shouldn't be hardcoded
											drag_offset={60}
										/>
									</div>
								}
							</>
						);
					})}
			</div>
		</div>
	);
};

export default TricklistPage;
