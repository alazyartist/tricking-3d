import React, { useState } from "react";

const CompareTricks = ({ newCombo }) => {
	const [comboCompare, setComboCompare] = useState([]);
	return (
		<div className='no-scrollbar relative h-[60vw] min-h-[80px] w-[85vw] overflow-y-scroll rounded-md bg-zinc-300 bg-opacity-20 p-2'>
			<div
				className='absolute top-[3vh]  right-2 h-fit font-titan text-4xl'
				onClick={() => setComboCompare((s) => s.slice(0, s.length - 1))}>
				-
			</div>
			<div
				className='absolute top-[-1vh] right-2 h-fit font-titan text-4xl'
				onClick={() => setComboCompare((s) => [...s, [...newCombo]])}>
				+
			</div>
			<div>
				{comboCompare?.map((combo) => (
					<div className='flex gap-2 overflow-hidden overflow-x-scroll'>
						<div>{combo.reduce((sum, b) => sum + b.pointValue, 0)}</div>
						{combo?.map((ci, i) => (
							<div className='flex-shrink-0'>{ci.name}</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default CompareTricks;
